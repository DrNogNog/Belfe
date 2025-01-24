import { motion } from 'framer-motion';
import { LipstickColor } from '../../types/makeup';

interface LipstickColorPickerProps {
  title: string;
  colors: LipstickColor[];
  onBackToMenu?: () => void;
  onColorSelect: (colorName: string) => void; // Callback to inform parent about color change
  minId: number;
  maxId: number;
}

function LipstickColorPicker({
  title,
  colors,
  onBackToMenu = () => {},
  onColorSelect,
  minId,
  maxId,
}: LipstickColorPickerProps) {

  // Handles color selection
  const handleColorSelect = (colorName: string) => {
    onColorSelect(colorName); // Pass both to the parent component
  };  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-0 left-0 w-64 bg-white"
    >
      {/* Header Section */}
      <div className="bg-gray-300 py-2 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-black text-lg font-normal">{title}</h2>
          <button onClick={onBackToMenu} className="text-gray-600">&times;</button>
        </div>
      </div>

      {/* Color Selection Section */}
      <div className="p-4">
        {/* View A-Z Button */}
        <div className="mb-4">
          <button className="text-blue-600 text-sm">View A-Z</button>
        </div>

        {/* Color Options Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {colors
            .filter(color => Number(color.id) >= minId && Number(color.id) <= maxId)
            .map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorSelect(color.name)} // Update the selected color
                className="flex items-center gap-2"
              >
                {/* Color Preview Circle */}
                <div
                  className={`w-5 h-5 rounded-full flex-shrink-0 ${
                    color.name === 'Clear' ? 'border border-gray-300' : ''
                  }`}
                  style={{ background: color.color }}
                />
                {/* Color Name and Count */}
                <div className="flex items-center justify-between flex-1 min-w-0">
                  <div className="truncate text-xs text-black">
                    {color.name}
                  </div>
                  <span className="text-[10px] text-gray-500 ml-1">({color.count})</span>
                </div>
              </button>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

export default LipstickColorPicker;
