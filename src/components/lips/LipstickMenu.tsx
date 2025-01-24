import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Star, Palette, Building2, Heart, ShoppingBag, DollarSign, Users } from 'lucide-react';
import { RatingSystem } from '../RatingSystem';
import { ConcernsMenu } from '../ConcernsMenu';
import { ShoppingPreferencesMenu } from '../ShoppingPreferencesMenu';
import { PriceRangeMenu } from '../PriceRangeMenu';
import { AgeRangeMenu } from '../AgeRangeMenu';
import LipsColorPicker from './LipsColorPicker';
import { LIP_COLORS } from '../../constants/lipColors';
import { LipstickProductView } from '../lips/LipstickProductView';
import { LIPSTICK_PRODUCTS, Product } from '../../types/products';
import { useLipstickColor } from './LipstickColorContext';

interface LipstickMenuProps {
  titlebrand: string;
  onBack: () => void;
  //onColorSelect: (color: string) => void;
}


type View = 'main' | 'colorFamily' | 'products';

export function LipstickMenu({ titlebrand, onBack }: LipstickMenuProps) {
  const [currentView, setCurrentView] = useState<View>('main');
  const [showRating, setShowRating] = useState(false);
  const [showConcerns, setShowConcerns] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showAgeRange, setShowAgeRange] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { setLipstickColor } = useLipstickColor();

  const handleBack = () => {
    if (currentView !== 'main') {
      setCurrentView('main');
    } else {
      setLipstickColor("0");
      onBack();
    }
  };

  const handleRatingChange = (rating: number) => {
    console.log('Selected rating:', rating);
    setShowRating(false);
  };

  // Function to update selected products based on the selected color
  const handleSelectedProducts = (colorName: string) => {
    // Filter products based on the selected color (colorName)
    const filteredProducts = LIPSTICK_PRODUCTS.filter(
      (product) => product.colorname === colorName
    );
    // Update the selected products state
    setSelectedProducts(filteredProducts);
  };

  const handleColorSelectforProducts = (colorName: string) => {
    setSelectedColor(colorName);
    setLipstickColor("0");
    setLipstickColor(selectedColor); // Update context with selected color
  };

  const handleColorSelectforColorFamily = (colorName: string) => {
    handleSelectedProducts(colorName); // Filter and set products based on selected color
    setCurrentView('products');   // Switch to products view

  };

  const closeAllMenus = () => {
    setShowRating(false);
    setShowConcerns(false);
    setShowPreferences(false);
    setShowPriceRange(false);
    setShowAgeRange(false);
  };

  //Through loops and logic, this filters products and sends to 'products' view
  if (currentView === 'colorFamily') { // Sorts by COLOR FAMILY
    return (
      <LipsColorPicker 
        title={"Lipstick Colors"} // Title for circles
        colors={LIP_COLORS} //colors and count for grid
        onBackToMenu={handleBack}
        onColorSelect={handleColorSelectforColorFamily} //colorname; needs to be assigned a filter; on click on colorfamily wheel
        minId={1} // Pass minId for filtering the lipsticks
        maxId={15} // Pass maxId for filtering the lipsticks
      /> //colorname is used to display a list of color products
    );
  }

  if (currentView === 'products') { // Sorts by Products
    console.log(selectedProducts)
    return (
      <LipstickProductView 
        onBack={handleBack}
        products={selectedProducts ? selectedProducts : LIPSTICK_PRODUCTS}
        onColorSelect={handleColorSelectforProducts} //gets colorname on click on slider
        title={'Lipsticks'}
      />
    );
  }

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute bottom-0 left-0 w-64 bg-gradient-to-b from-gray-400/80 via-gray-500/80 to-black/80"
  >
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="flex items-center">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-2xl font-light ml-4">{titlebrand}</span>
      </div>

      <div className="space-y-4">


        <button
          onClick={() => {
            closeAllMenus();
            setCurrentView('colorFamily');
          }}
          className="w-full flex items-center justify-between text-lg"
        >
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5" />
            <span>Color Family</span>
          </div>
          <span className="text-xl opacity-60">›</span>
        </button>


        <button
            onClick={() => {
              closeAllMenus();
              setShowRating(!showRating);
            }}
            className="w-full flex items-center justify-between text-lg"
          >
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5" />
              <span>Rating</span>
            </div>
            <span className="text-xl opacity-60">›</span>
          </button>

          <AnimatePresence>
            {showRating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <RatingSystem onRatingChange={handleRatingChange} />
              </motion.div>
            )}
          </AnimatePresence>



        <button
            onClick={() => {
              closeAllMenus();
              setCurrentView('products');
            }}
            className="w-full flex items-center justify-between text-lg group"
          >
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5" />
            <span>Brand</span>
          </div>
          <span className="text-xl opacity-60">›</span>
        </button>


        <button
          onClick={() => {
            closeAllMenus();
            setShowConcerns(!showConcerns);
          }}
          className="w-full flex items-center justify-between text-lg"
        >
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5" />
            <span>Concerns</span>
          </div>
          <span className="text-xl opacity-60">›</span>
        </button>


        <button
          onClick={() => {
            closeAllMenus();
            setShowPreferences(!showPreferences);
          }}
          className="w-full flex items-center justify-between text-lg"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            <span>Shopping Preferences</span>
          </div>
          <span className="text-xl opacity-60">›</span>
        </button>


        <button
          onClick={() => {
            closeAllMenus();
            setShowPriceRange(!showPriceRange);
          }}
          className="w-full flex items-center justify-between text-lg"
        >
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5" />
            <span>Price Range</span>
          </div>
          <span className="text-xl opacity-60">›</span>
        </button>



        <button
          onClick={() => {
            closeAllMenus();
            setShowAgeRange(!showAgeRange);
          }}
          className="w-full flex items-center justify-between text-lg"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5" />
            <span>Age Range</span>
          </div>
          <span className="text-xl opacity-60">›</span>
        </button>
      </div>
    </div>

    <ConcernsMenu isOpen={showConcerns} onClose={() => setShowConcerns(false)} />
    <ShoppingPreferencesMenu isOpen={showPreferences} onClose={() => setShowPreferences(false)} />
    <PriceRangeMenu isOpen={showPriceRange} onClose={() => setShowPriceRange(false)} />
    <AgeRangeMenu isOpen={showAgeRange} onClose={() => setShowAgeRange(false)} />
  </motion.div>
  );
}