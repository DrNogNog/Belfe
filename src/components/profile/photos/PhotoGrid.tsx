import React, { useRef, useEffect, useState } from 'react';
import { PhotoGridItem } from './PhotoGridItem';

const PHOTOS = [
  // Regular photos (first 15)
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
  // Add more regular photos...
  
  // Long format photos (groups of 3)
  [
    "https://images.unsplash.com/photo-1600026453346-a44501602a02?auto=format&fit=crop&w=300&h=600&q=80",
    "https://images.unsplash.com/photo-1595085610896-fb31cfd5d4b7?auto=format&fit=crop&w=300&h=600&q=80",
    "https://images.unsplash.com/photo-1600783486018-cf82ee6e9b76?auto=format&fit=crop&w=300&h=600&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&w=300&h=600&q=80",
    "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?auto=format&fit=crop&w=300&h=600&q=80",
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=300&h=600&q=80"
  ]
];

export function PhotoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const row = parseInt(entry.target.getAttribute('data-row') || '0');
          setVisibleRows(prev => 
            entry.isIntersecting 
              ? [...new Set([...prev, row])]
              : prev.filter(r => r !== row)
          );
        });
      },
      { threshold: 0.5 }
    );

    const grid = gridRef.current;
    if (grid) {
      const rows = grid.querySelectorAll('.photo-row');
      rows.forEach(row => observer.observe(row));
    }

    return () => observer.disconnect();
  }, []);

  const renderPhotoRow = (photos: string[], index: number, isLongFormat: boolean = false) => (
    <div 
      key={index}
      data-row={index}
      className="photo-row grid grid-cols-3 gap-2"
    >
      {photos.map((photo, photoIndex) => (
        <PhotoGridItem
          key={photoIndex}
          photo={photo}
          isLong={isLongFormat && visibleRows.includes(index)}
        />
      ))}
    </div>
  );

  return (
    <div 
      ref={gridRef}
      className="h-full overflow-y-auto pr-2 space-y-2"
    >
      {/* Regular photos */}
      {renderPhotoRow(PHOTOS.slice(0, 3), 0)}
      {renderPhotoRow(PHOTOS.slice(3, 6), 1)}
      {renderPhotoRow(PHOTOS.slice(6, 9), 2)}
      {renderPhotoRow(PHOTOS.slice(9, 12), 3)}

      {/* Long format photos */}
      {PHOTOS.slice(12).map((group: any, index) => 
        renderPhotoRow(group, index + 4, true)
      )}
    </div>
  );
}