import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import { useLipstickColor } from '../lips/LipstickColorContext';
import { applyLipstickColor, getGradientCase } from './lipstickUtils';
import { LIP_COLORS } from '../../constants/lipColors';

const FaceMeshVideo: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const camera = useRef<cam.Camera | null>(null);
  const { lipstickColor } = useLipstickColor(); // Consume lipstick color from context
  const [faceMeshInstance, setFaceMeshInstance] = useState<FaceMesh | null>(null); // Store face mesh instance

  // UseEffect to initialize the face mesh
  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);
    setFaceMeshInstance(faceMesh); // Store the instance for cleanup

    return () => {
      // Cleanup on component unmount
      faceMesh.close();
    };
  }, [lipstickColor]);

  // Handle face mesh results
  const onResults = (results: any) => {
    if (!webcamRef.current || !canvasRef.current || !faceMeshInstance) return;

    const videoWidth = webcamRef.current.video!.videoWidth;
    const videoHeight = webcamRef.current.video!.videoHeight;

    // Set canvas size to match video
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d")!;

    // Clear the canvas before each frame
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Draw the webcam video on the canvas
    canvasCtx.drawImage(results.image as unknown as HTMLVideoElement, 0, 0, canvasElement.width, canvasElement.height);

    // Process face landmarks
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        if (lipstickColor) {
          const lipstickId = parseInt(lipstickColor, 10);
          if (lipstickId >= 1 && lipstickId <= 15) {
            drawLips(canvasCtx, landmarks, lipstickId);
          }
        }
      }
    }
  };

  // Draw lips with intensity normalization and AR color filtering
  const drawLips = (canvasCtx: CanvasRenderingContext2D, landmarks: any, lipstickId: number) => {
    canvasCtx.beginPath();
    
    // Upper Lip Landmarks
    const upperLipLandmarks = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
    for (let i = 0; i < upperLipLandmarks.length; i++) {
      const point = landmarks[upperLipLandmarks[i]];
      const x = point.x * canvasCtx.canvas.width;
      const y = point.y * canvasCtx.canvas.height;
      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }
    }

    // Lower Lip Landmarks
    const lowerLipLandmarks = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
    for (let i = 0; i < lowerLipLandmarks.length; i++) {
      const point = landmarks[lowerLipLandmarks[i]];
      const x = point.x * canvasCtx.canvas.width;
      const y = point.y * canvasCtx.canvas.height;
      canvasCtx.lineTo(x, y);
    }

    // Close path and apply lipstick color with gradient
    canvasCtx.closePath();
    const gradientCase = getGradientCase(lipstickId);
    applyLipstickColor(canvasCtx, gradientCase);
    canvasCtx.fill(); // Fill lips with selected gradient color

    // Apply intensity normalization (adjusting shadows, highlights, mid-tones)
    normalizeAndFilterLips(canvasCtx, landmarks);
  };

  // Intensity normalization and filtering function
  const normalizeAndFilterLips = (canvasCtx: CanvasRenderingContext2D, landmarks: any) => {
    // Normalization step (adjust shadows, mid-tones, and highlights)
    const imageData = canvasCtx.getImageData(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      // Normalize intensity (simple approach)
      const brightness = (r + g + b) / 3;
      if (brightness < 100) {
        // Apply shadow filter (darken)
        pixels[i] = r * 0.8;
        pixels[i + 1] = g * 0.8;
        pixels[i + 2] = b * 0.8;
      } else if (brightness > 200) {
        // Apply highlight filter (brighten)
        pixels[i] = r * 1.2;
        pixels[i + 1] = g * 1.2;
        pixels[i + 2] = b * 1.2;
      } else {
        // Keep mid-tones as they are
        pixels[i] = r;
        pixels[i + 1] = g;
        pixels[i + 2] = b;
      }
    }

    // Put modified pixels back onto the canvas
    canvasCtx.putImageData(imageData, 0, 0);
  };

  // Setup camera stream and start face mesh
  useEffect(() => {
    if (webcamRef.current?.video && faceMeshInstance) {
      camera.current = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (webcamRef.current?.video && faceMeshInstance) {
            await faceMeshInstance.send({ image: webcamRef.current.video });
          }
        },
        width: 640,
        height: 480,
      });
      camera.current.start();
    }

    return () => {
      if (camera.current) {
        camera.current.stop();
      }
    };
  }, [faceMeshInstance]);

  return (
    <div className="relative w-full h-full">
      <Webcam ref={webcamRef} className="absolute inset-0 w-full h-full object-cover mirror" />
      {lipstickColor !== null && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover mirror" />}
    </div>
  );
};

export default FaceMeshVideo;
