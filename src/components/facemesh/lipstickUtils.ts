// Function to apply lipstick color based on color ID
export function applyLipstickColor(canvasCtx: CanvasRenderingContext2D, gradient: string, lipBounds: any): void {
  if (gradient) {
    // Check if it's a gradient
    if (gradient.startsWith('radial-gradient')) {
      applyRadialGradientColor(canvasCtx, gradient);
    } else if (gradient.startsWith('linear-gradient')) {
      applyGradientColor(canvasCtx, gradient,lipBounds);
    } else {
      canvasCtx.fillStyle = gradient; // Set the solid color as fill style
    }
  } else {
    canvasCtx.fillStyle = "transparent"; // Default fallback
  }
}

// Function to apply linear gradients
export const applyGradientColor = (canvasCtx: CanvasRenderingContext2D, color: string, lipBounds: {x: number, y: number, width: number, height: number}) => {
  // Match all rgba() values
  const gradientColors = color.match(/rgba?\(([^)]+)\)/g);
  if (gradientColors) {
    // Create gradient within the bounding box of the lips
    const gradient = canvasCtx.createLinearGradient(lipBounds.x, lipBounds.y, lipBounds.x + lipBounds.width, lipBounds.y + lipBounds.height);

    // Add gradient colors
    gradientColors.forEach((gradientColor, index) => {
      const rgba = gradientColor.match(/(\d+),\s*(\d+),\s*(\d+),?\s*(\d+)?/);
      if (rgba) {
        const colorStop = index / (gradientColors.length - 1); // Set color stops based on index
        gradient.addColorStop(colorStop, `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${rgba[4] || 1})`);
      }
    });

    // Set the gradient as the fill style and fill the path
    canvasCtx.fillStyle = gradient;
    canvasCtx.fill();
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
  "linear-gradient(to bottom, rgba(255,105,180,1), rgba(255,20,147,1))", // pink (darker)
  "linear-gradient(to bottom, rgba(255,228,196,1), rgba(255,222,173,1))", // nude
  "linear-gradient(to bottom, rgba(255,0,0,1), rgba(139,0,0,1))", // red
  "linear-gradient(to bottom, rgba(128,0,32,1), rgba(255,0,255,1))", // berry
  "linear-gradient(to bottom, rgba(255,127,80,1), rgba(255,69,0,1))", // coral
  "linear-gradient(to right, rgba(0,255,0,1), rgba(128,0,128,1))", // green to purple fade

  "linear-gradient(to right, rgba(139,69,19,1), rgba(160,82,45,1))", // brown
  "linear-gradient(to right, rgba(255,165,0,1), rgba(255,69,0,1))", // orange
  "linear-gradient(to bottom, rgba(210,180,140,1), rgba(255,239,184,1))", // tan
  "linear-gradient(to right, rgba(128,0,128,1), rgba(75,0,130,1))", // purple
  "linear-gradient(to right, rgba(0,0,0,0), rgba(255,255,255,1))", // clear
  "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,1))", // white
  "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1))", // black
  "linear-gradient(to bottom, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 50%, rgba(0,0,255,1) 100%)", // red to green to blue fade

  "linear-gradient(to right, rgba(255,223,0,1), rgba(255,215,0,1))" // gold
];

// Function to handle the gradient color case lookup
export const getGradientCase = (index: number): string => {
  if (index >= 1 && index <= 15){
    return gradientCases[index - 1] || "transparent";
  } else {
    return "radial-gradient(circle, rgba(0,0,255,1), rgba(255,255,255,0))";
  }
};
