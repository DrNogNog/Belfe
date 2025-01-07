import React from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  imageUrl: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Rouge Dior',
    brand: 'Dior',
    price: 38.00,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=100'
  },
  {
    id: '2',
    name: 'Matte Revolution',
    brand: 'Charlotte Tilbury',
    price: 34.00,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=100'
  },
  // Add more sample products as needed
];

export function ProductCarousel() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl"
    >
      <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg">
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {SAMPLE_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="flex-none w-24 text-center"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
              <div className="text-xs">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-white/60 truncate">{product.brand}</p>
                <p className="mt-1">${product.price.toFixed(2)}</p>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}