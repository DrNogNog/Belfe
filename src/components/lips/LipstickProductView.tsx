import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { lipstickProducts } from './products/lipstickProducts';

interface LipstickProductViewProps {
  onBackToMenu?: () => void; // Optional back-to-menu callback
  onColorSelect?: (color: string) => void; // Optional color select callback
}

export function LipstickProductView({
  onBackToMenu = () => {},
  onColorSelect = () => {},
  }: LipstickProductViewProps) {

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 mb-8">
      {/* Navigation Header */}
      <div className="flex justify-center mb-2">
        <div className="bg-black/90 py-2 px-4 w-[95%] max-w-3xl rounded-[35px]">
          <div className="flex items-center gap-8">
            <button onClick={onBackToMenu} className="p-1">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span>Color Family</span>
            <span>Brand</span>
            <span>Brand</span>
          </div>
        </div>
      </div>

      {/* Product Carousel */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-[900px]"
        >
          <div className="relative py-4">
            {/* Scroll Left Button */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Products */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto hide-scrollbar gap-4 px-6"
            >
              {lipstickProducts.map((product) => (
                <div key={product.id} className="flex-none w-[100px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-sm mb-1"
                  />
                  <div className="text-[10px] text-black">
                    <p className="font-medium line-clamp-2">{product.name}</p>
                    <div className="mt-0.5">
                      <span className="font-medium">{product.price}</span>
                      <span className="text-gray-500 ml-1">{product.retailer}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <div className="text-yellow-400">{'★'.repeat(Math.floor(product.rating))}</div>
                      <span className="text-gray-500">{product.reviews}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Right Button */}
            <button 
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}