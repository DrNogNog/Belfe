export interface Theme {
    id: string;
    title: string;
    description: string;
    image: string;
    audioUrl: string;
    videoUrl: string;
    color: string;
  }
  
  export const mindfulnessThemes: Theme[] = [
    {
      id: 'nature',
      title: 'Nature\'s Wisdom',
      description: 'Find peace in the gentle rhythms of nature',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
      audioUrl: '/audio/nature.mp3',
      videoUrl: '/video/nature.mp4',
      color: 'from-green-400 to-emerald-600'
    },
    {
      id: 'ocean',
      title: 'Ocean Calm',
      description: 'Let the waves wash away your stress',
      image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80',
      audioUrl: '/audio/ocean.mp3',
      videoUrl: '/video/ocean.mp4',
      color: 'from-blue-400 to-cyan-600'
    },
    {
      id: 'mountain',
      title: 'Mountain Strength',
      description: 'Find your inner strength and stability',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      audioUrl: '/audio/mountain.mp3',
      videoUrl: '/video/mountain.mp4',
      color: 'from-slate-400 to-gray-600'
    }
  ];