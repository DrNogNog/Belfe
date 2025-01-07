import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  {
    id: '1',
    name: 'Audacious - Carmen',
    brand: 'NARS Cosmetics',
    price: '$45.00',
    rating: 4.5,
    reviews: '(9k+)',
    retailer: 'Sephora',
    image: 'https://example.com/lipstick1.jpg'
  },
  {
    id: '2',
    name: 'Rosso Valentino High Pigment',
    brand: 'Valentino',
    price: '$45.00',
    rating: 4.5,
    reviews: '(441)',
    retailer: 'Sephora',
    image: 'https://example.com/lipstick2.jpg'
  },
  {
    id: '3',
    name: 'Rouge Dior Forever Transfer-Proof',
    brand: 'Dior',
    price: '$47.00',
    rating: 4.5,
    reviews: '(9k+)',
    retailer: 'Sephora',
    image: 'https://example.com/lipstick3.jpg'
  },
  {
    id: '4',
    name: 'MAC - Retro Matte Lipstick - Ruby Woo',
    brand: 'MAC Cosmetics',
    price: '$23.00',
    rating: 4.5,
    reviews: '(9k+)',
    retailer: 'MAC Cosmetics',
    image: 'https://example.com/lipstick4.jpg'
  },
  {
    id: '5',
    name: 'Charlotte Tilbury K.I.S.S.I.N.G Satin',
    brand: 'Charlotte Tilbury',
    price: '$35.00',
    rating: 4.5,
    reviews: '(4k+)',
    retailer: 'Sephora',
    image: 'https://example.com/lipstick5.jpg'
  },
  {
    id: '6',
    name: 'Revlon Super Lustrous Lipstick',
    brand: 'Revlon',
    price: '$6.49',
    rating: 4.5,
    reviews: '(9k+)',
    retailer: 'Target',
    image: 'https://example.com/lipstick6.jpg'
  },
  {
    id: '7',
    name: 'NARS Lipstick, Jungle Red',
    brand: 'NARS Cosmetics',
    price: '$26.00',
    rating: 4.5,
    reviews: '(9k+)',
    retailer: 'NARS Cosmetics',
    image: 'https://example.com/lipstick7.jpg'
  },
  {
    id: '8',
    name: 'Matte Lipsticks - Loving Red',
    brand: 'Walmart',
    price: '$16.99',
    shipping: 'Free shipping',
    rating: 4.5,
    reviews: '(9k+)',
    retailer: 'Walmart',
    image: 'https://example.com/lipstick8.jpg'
  },
  {
    id: '9',
    name: 'Lipstick Red & Bl - Red With Blue',
    brand: 'Byredo',
    price: '$55.00',
    shipping: 'Free shipping',
    rating: 4.5,
    reviews: '(9k+)',
    retailer: 'Byredo.com',
    image: 'https://example.com/lipstick9.jpg'
  }
];

interface ProductListProps {
  onBack: () => void;
}

export function ProductList({ onBack }: ProductListProps) {
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
        <div className="bg-black/90 py-2 px-4 w-[95%] max-w-3xl">
          <div className="flex items-center gap-8">
            <button onClick={onBack} className="p-1">
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
              {PRODUCTS.map((product) => (
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