interface MakeupButtonProps {
    onClicktw: () => void;
  }
  
  export function MakeupButtonProps({ onClicktw }: MakeupButtonProps) {
    <button 
            className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
          >
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className="mb-2"
            >
              <path d="M16 4c0 1.1-.9 2-2 2-1.1 0-2-.9-2-2s.9-2 2-2c1.1 0 2 .9 2 2z" />
              <path d="M12 7c-3 0-4 3-4 6v8c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-8c0-3-1-6-4-6z" />
            </svg>
            <span className="text-lg">Make Up</span>
          </button>
  }