import { useState } from 'react';
import { motion } from 'framer-motion';
import { FilterMenu } from './asdefaultmenus/FilterMenu';
import { LipMenu } from './asdefaultmenus/LipMenu';
import { EyesMenu } from './asdefaultmenus/EyesMenu';
import { CheeksMenu } from './asdefaultmenus/CheeksMenu';
import { FaceMenu } from './asdefaultmenus/FaceMenu';
import { RelaxationMenu } from './asdefaultmenus/RelaxationMenu';
import { GenerationMenu } from './asdefaultmenus/GenerationMenu';

type MenuView = 'main' | 'lip' | 'eyes' | 'cheeks' | 'face' | 'relaxation' | 'generation';


export default function Menu() {
  const [currentView, setCurrentView] = useState<MenuView>('main');

  const handleBack = () => {
    if (currentView !== 'main') {
      setCurrentView('main');
    } 
  };

  const navigationProps = {
    onBack: handleBack,
    onEyesClick: () => setCurrentView('eyes'),
    onLipClick: () => setCurrentView('lip'),
    onCheeksClick: () => setCurrentView('cheeks'),
    onFaceClick: () => setCurrentView('face'),
    onRelaxationClick: () => setCurrentView('relaxation'),
    onGenerationClick: () => setCurrentView('generation'),
  };

  const menus = {
    main: FilterMenu,
    lip: LipMenu,
    eyes: EyesMenu,
    cheeks: CheeksMenu,
    face: FaceMenu,
    relaxation: RelaxationMenu,
    generation: GenerationMenu
  };

  const MenuComponent = menus[currentView];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-none"
    >
      <div className="pointer-events-auto">
        <MenuComponent {...navigationProps} />
      </div>
    </motion.div>
  );
}