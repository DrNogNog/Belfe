// Function to apply lipstick color based on color ID
export function applyLipstickColor(canvasCtx: CanvasRenderingContext2D, gradient: string): void {
  if (gradient) {
    // Check if it's a gradient
    if (gradient.startsWith('radial-gradient')) {
      applyRadialGradientColor(canvasCtx, gradient);
    } else if (gradient.startsWith('linear-gradient')) {
      applyGradientColor(canvasCtx, gradient);
    } else {
      canvasCtx.fillStyle = gradient; // Set the solid color as fill style
    }
  } else {
    canvasCtx.fillStyle = "transparent"; // Default fallback
  }
}

// Function to apply linear gradients
export const applyGradientColor = (canvasCtx: CanvasRenderingContext2D, color: string) => {
  // Match all rgba() values
  const gradientColors = color.match(/rgba?\(([^)]+)\)/g);
  if (gradientColors) {
    const gradient = canvasCtx.createLinearGradient(0, 0, 100, 100);
    gradientColors.forEach((gradientColor, index) => {
      const rgba = gradientColor.match(/(\d+),\s*(\d+),\s*(\d+),?\s*(\d+)?/);
      if (rgba) {
        const colorStop = index / (gradientColors.length - 1);
        gradient.addColorStop(colorStop, `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${rgba[4] || 1})`);
      }
    });
    canvasCtx.fillStyle = gradient; // Set the gradient as fill style
  }
};

// Function to apply radial gradients
export const applyRadialGradientColor = (canvasCtx: CanvasRenderingContext2D, color: string) => {
  const gradientColors = color.match(/rgba?\(([^)]+)\)/g);
  if (gradientColors) {
    const radialGradient = canvasCtx.createRadialGradient(
      canvasCtx.canvas.width / 2, 
      canvasCtx.canvas.height / 2, 0, 
      canvasCtx.canvas.width / 2, 
      canvasCtx.canvas.height / 2, canvasCtx.canvas.width * 0.25
    );
    
    gradientColors.forEach((gradientColor, index) => {
      const rgba = gradientColor.match(/(\d+),\s*(\d+),\s*(\d+),?\s*(\d+)?/);
      if (rgba) {
        const colorStop = index / (gradientColors.length - 1);
        radialGradient.addColorStop(colorStop, `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${rgba[4] || 1})`);
      }
    });
    canvasCtx.fillStyle = radialGradient; // Set the radial gradient as fill style
  }
};

// Add 15 cases for gradient handling here
const gradientCases = [
  "linear-gradient(to bottom, rgba(255,0,0,1), rgba(255,255,255,1))", // Example linear gradient
  "linear-gradient(to top, rgba(0,255,0,1), rgba(255,255,255,1))",
  "radial-gradient(circle, rgba(0,0,255,1), rgba(255,255,255,0))", // Example radial gradient
  "radial-gradient(circle, rgba(255,255,0,1), rgba(255,0,255,0))",
  "linear-gradient(to right, rgba(128,0,128,1), rgba(255,0,0,1))",
  "linear-gradient(to left, rgba(255,165,0,1), rgba(0,128,0,1))",
  "radial-gradient(circle, rgba(255,0,0,1), rgba(0,255,0,1))",
  "radial-gradient(circle, rgba(255,255,255,1), rgba(0,0,0,1))",
  "linear-gradient(to top right, rgba(255,255,0,1), rgba(255,0,255,1))",
  "linear-gradient(to bottom left, rgba(0,128,128,1), rgba(0,0,255,1))",
  "radial-gradient(circle, rgba(255,192,203,1), rgba(255,105,180,1))",
  "linear-gradient(to bottom, rgba(255,0,255,0.5), rgba(255,255,0,1))",
  "radial-gradient(circle, rgba(0,255,255,0.5), rgba(0,0,255,1))",
  "linear-gradient(to left, rgba(255,105,180,0.5), rgba(255,69,0,1))",
  "radial-gradient(circle, rgba(255,255,255,0.2), rgba(255,0,0,1))"
];

// Function to handle the gradient color case lookup
export const getGradientCase = (index: number): string => {
  return gradientCases[index - 1] || "transparent"; // Return "transparent" if index is out of range
};
