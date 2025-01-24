import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ColorOption {
  id: string;
  color: string;
  name: string;
  count: number;
}

interface ColorPickerProps {
  colors: ColorOption[];
  onColorSelect: (color: string) => void;
  onBack: () => void;
  title?: string;
}

export function ColorPicker({ colors, onColorSelect, onBack, title = "Lipstick" }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorClick = (color: string) => {
    const newColor = selectedColor === color ? null : color;
    setSelectedColor(newColor);
    onColorSelect(newColor || '');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-0 left-0 w-64"
    >
      <div className="bg-white">
        <div className="bg-gray-300 py-2 px-4">
          <h2 className="text-black text-lg font-normal">{title}</h2>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-black font-medium">Filter & Sort</span>
            <button onClick={onBack} className="text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4">
            <button className="text-blue-600 text-sm">View A-Z</button>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorClick(color.color)}
                className="flex items-center gap-2"
              >
                <div 
                  className={`w-5 h-5 rounded-full flex-shrink-0 ${
                    color.name === 'Clear' ? 'border border-gray-300' : ''
                  } ${selectedColor === color.color ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ background: color.color }}
                />
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
      </div>
    </motion.div>
  );
}