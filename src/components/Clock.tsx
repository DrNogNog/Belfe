import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pl-8 pt-4"
    >
      {/* Date */}
      <div className="text-lg font-light mb-1">
        {format(time, 'EEEE, MMMM do, yyyy')}
      </div>

      {/* Time */}
      <div className="flex items-baseline">
        <span className="text-7xl font-light">
          {format(time, 'h:mm')}
        </span>
        <span className="text-3xl font-light ml-2">
          {format(time, 'a')}
        </span>
      </div>
    </motion.div>
  );
}