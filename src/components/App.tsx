import { useCourseStore } from '../store/useCourseStore';
import ModeSelection from './layout/ModeSelection';
import LoginChoiceDialog from './layout/LoginChoiceDialog';
import LevelSelector from './layout/LevelSelector';
import CardDeck from './CardDeck';

export default function App() {
  const { showModeSelection, showLoginChoice, showCourse } = useCourseStore();

  return (
    <>
      {showModeSelection && <ModeSelection />}
      {showLoginChoice && <LoginChoiceDialog />}
      {showCourse && <LevelSelector />}
      {showCourse && <CardDeck />}
    </>
  );
}
