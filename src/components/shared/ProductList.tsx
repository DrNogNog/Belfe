import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  rating: number;
  reviews: string;
  retailer: string;
  image: string;
  shipping?: string;
}

interface ProductListProps {
  onBack: () => void;
  title: string;
  products: Product[];
}

export function ProductList({ onBack, title, products }: ProductListProps) {
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
        <div className="bg-black py-2 px-4 w-[95%] max-w-3xl rounded-[35px]">
          <div className="flex items-center gap-8">
            <button onClick={onBack} className="text-2xl">‹</button>
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
          className="relative bg-white rounded-[35px] shadow-lg w-[90%] max-w-[900px]"
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
              {products.map((product) => (
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
                    {product.shipping && (
                      <p className="text-gray-500 mt-0.5">{product.shipping}</p>
                    )}
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