import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import axios from 'axios';  // Axios import for API requests

interface CalendarEvent {
  summary: string;
  date: Date;
}

export function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        // Fetch public holidays for 2025 in the US from Nager.Date API
        const response = await axios.get(
          'https://date.nager.at/api/v3/PublicHolidays/2025/US'
        );

        // Map the holiday response to match the CalendarEvent interface
        const sampleEvents = response.data.map((holiday: any) => ({
          summary: holiday.name,
          date: new Date(holiday.date),
        }));

        // Filter future events and sort by date
        const now = new Date();
        const futureEvents = sampleEvents
          .filter((event: CalendarEvent) => event.date >= now)
          .sort((a: CalendarEvent, b: CalendarEvent) => a.date.getTime() - b.date.getTime())
          .slice(0, 10);  // Get only the first 10 upcoming holidays

        setEvents(futureEvents); // Set the fetched holidays to the state
      } catch (error) {
        console.error('Error fetching calendar:', error);
      }
    };

    fetchCalendar();  // Fetch the holidays on initial load

    // Update the calendar daily by fetching holidays again
    const interval = setInterval(fetchCalendar, 24 * 60 * 60 * 1000); 
    return () => clearInterval(interval);  // Clear interval on unmount
  }, []);  // Empty dependency array ensures the effect runs only once

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
          <div key={index} className="flex justify-between items-center text-[13px] group">
            <div className="flex-1 text-gray-300/90 font-light">{event.summary}</div>
            <div className="text-gray-500/80 font-light text-[12px]">
              {format(event.date, 'MMM dd')} {/* Format date like "Jan 01" */}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
