import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface CalendarEvent {
  summary: string;
  date: Date;
}

export function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        // Simulated calendar data since we can't make external API calls
        const sampleEvents = [
          {
            summary: "New Year's Day",
            date: new Date(2024, 0, 1)
          },
          {
            summary: "Martin Luther King Jr. Day",
            date: new Date(2024, 0, 15)
          },
          {
            summary: "Valentine's Day",
            date: new Date(2024, 1, 14)
          },
          {
            summary: "Presidents' Day",
            date: new Date(2024, 1, 19)
          },
          {
            summary: "St. Patrick's Day",
            date: new Date(2024, 2, 17)
          },
          {
            summary: "Easter Sunday",
            date: new Date(2024, 2, 31)
          },
          {
            summary: "Memorial Day",
            date: new Date(2024, 4, 27)
          },
          {
            summary: "Independence Day",
            date: new Date(2024, 6, 4)
          },
          {
            summary: "Labor Day",
            date: new Date(2024, 8, 2)
          },
          {
            summary: "Halloween",
            date: new Date(2024, 9, 31)
          }
        ];

        // Filter future events and sort by date
        const now = new Date();
        const futureEvents = sampleEvents
          .filter(event => event.date >= now)
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(0, 10);

        setEvents(futureEvents);
      } catch (error) {
        console.error('Error fetching calendar:', error);
      }
    };

    fetchCalendar();
    // Update calendar daily
    const interval = setInterval(fetchCalendar, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-[#100F0F] rounded-lg p-6 mt-8"
    >
      <div className="text-xs font-medium uppercase mb-4 text-gray-400/90">US HOLIDAYS</div>
      <div className="space-y-[10px]">
        {events.map((event, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between text-[13px] group"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400/80">✓</span>
              <span className="text-gray-300/90 font-light">
                {event.summary}
              </span>
            </div>
            <div className="text-gray-500/80 font-light text-[12px]">
              {format(event.date, 'MMM do')}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}