import { usePathStore } from '../../stores/pathStore';
import LevelSelector from './LevelSelector';
import CardDeck from './CardDeck';
import ModeNav from '../layout/ModeNav';
import { AnimatePresence } from 'framer-motion';

export default function PathApp() {
  const { currentLevel } = usePathStore();

  return (
    <>
      <ModeNav currentMode="path" />
      <AnimatePresence>
        {!currentLevel && <LevelSelector />}
        {currentLevel && <CardDeck />}
      </AnimatePresence>
    </>
  );
}
