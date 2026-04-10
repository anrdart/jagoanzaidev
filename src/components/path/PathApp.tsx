import { usePathStore } from '../../stores/pathStore';
import LevelSelector from './LevelSelector';
import CardDeck from './CardDeck';
import { AnimatePresence } from 'framer-motion';

export default function PathApp() {
  const { showCourse, currentLevel } = usePathStore();

  return (
    <AnimatePresence>
      {showCourse && !currentLevel && <LevelSelector />}
      {showCourse && currentLevel && <CardDeck />}
    </AnimatePresence>
  );
}
