type Landmark = {
    x: number;
    y: number;
    z: number;
  };
  
  export const drawWrinkles = (
    canvasCtx: CanvasRenderingContext2D,
    landmarks: Landmark[],
    upperLipLandmarks: number[],
    lowerLipLandmarks: number[]
  ) => {
    const topWrinkleRatios = [5.49, 6, 6.48, 8.5, 9.76];
    const bottomWrinkleRatios = [
      3.15, 3.72, 4.17, 4.63, 5.3, 5.9, 6.48, 7, 8.15, 8.8, 9.19, 9.81, 10.6, 11,
      11.9, 12.8,
    ];
    const bottomLipRatios = [
      2.2, 2.75, 4.21, 5.3, 6.3, 7.35, 8, 8.7, 9.75, 12, 13.7,
    ];
    const lipWidth = 15.13; // Normalizing factor for lip width
  
    const getPointFromRatio = (
      ratio: number,
      startLandmark: number,
      endLandmark: number
    ) => {
      const start = landmarks[startLandmark];
      const end = landmarks[endLandmark];
      const x = start.x + ratio * (end.x - start.x);
      const y = start.y + ratio * (end.y - start.y);
      return { x: x * canvasCtx.canvas.width, y: y * canvasCtx.canvas.height };
    };
  
    // Draw top wrinkles
    topWrinkleRatios.forEach((ratio) => {
      const start = getPointFromRatio(
        ratio / lipWidth,
        upperLipLandmarks[0],
        upperLipLandmarks[upperLipLandmarks.length - 1]
      );
      const end = getPointFromRatio(
        ratio / lipWidth,
        upperLipLandmarks[0],
        lowerLipLandmarks[0]
      );
      canvasCtx.beginPath();
      canvasCtx.moveTo(start.x, start.y);
      canvasCtx.lineTo(end.x, end.y);
      canvasCtx.strokeStyle = "#000";
      canvasCtx.stroke();
    });
  
    // Draw bottom wrinkles
    bottomWrinkleRatios.forEach((ratio) => {
      const start = getPointFromRatio(
        ratio / lipWidth,
        lowerLipLandmarks[0],
        lowerLipLandmarks[lowerLipLandmarks.length - 1]
      );
      const end = getPointFromRatio(
        ratio / lipWidth,
        lowerLipLandmarks[0],
        upperLipLandmarks[0]
      );
      canvasCtx.beginPath();
      canvasCtx.moveTo(start.x, start.y);
      canvasCtx.lineTo(end.x, end.y);
      canvasCtx.strokeStyle = "#000";
      canvasCtx.stroke();
    });
  
    // Additional bottom lip wrinkles (across lower lip)
    bottomLipRatios.forEach((ratio) => {
      const start = getPointFromRatio(
        ratio / lipWidth,
        lowerLipLandmarks[0],
        lowerLipLandmarks[lowerLipLandmarks.length - 1]
      );
      const end = getPointFromRatio(
        ratio / lipWidth,
        upperLipLandmarks[0],
        lowerLipLandmarks[0]
      );
      canvasCtx.beginPath();
      canvasCtx.moveTo(start.x, start.y);
      canvasCtx.lineTo(end.x, end.y);
      canvasCtx.strokeStyle = "#000";
      canvasCtx.stroke();
    });
  };
  