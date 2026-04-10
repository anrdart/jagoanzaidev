import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathStore } from '../../stores/pathStore';
import { courseData, COURSE_LEVELS, type CourseLevel } from '../../content/course-data';
import ContentCard from './ContentCard';
import QuizCard from './QuizCard';
import QuizResult from '../layout/QuizResult';
import ProgressBar from '../ui/ProgressBar';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

export default function CardDeck() {
  const {
    currentLevel,
    currentCardIndex,
    nextCard,
    previousCard,
    saveQuizScore,
    unlockLevel,
    quizScores,
    quizAttempts,
    incrementQuizAttempt,
    setShowCourse,
    markCardCompleted,
    setCurrentCardIndex,
    setLevel,
  } = usePathStore();

  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    if (currentLevel) {
      const module = courseData[currentLevel];
      const totalCards = module.cards.length;
      if (currentCardIndex >= totalCards && !showQuiz) {
        setShowQuiz(true);
      }
    }
  }, [currentCardIndex, currentLevel, showQuiz]);

  if (!currentLevel) return null;

  const module = courseData[currentLevel];
  const currentCard = module.cards[currentCardIndex];
  const totalCards = module.cards.length;
  const isLastCard = currentCardIndex === totalCards - 1;

  const handleNext = () => {
    if (currentCard) {
      markCardCompleted(currentCard.id);
    }
    // If on last card, show quiz instead of going to next card
    if (isLastCard) {
      setShowQuiz(true);
    } else {
      nextCard();
    }
  };

  const handlePrevious = () => {
    previousCard();
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    saveQuizScore(currentLevel, score);
    setShowResult(true);

    if (score >= module.unlockThreshold) {
      const currentIndex = COURSE_LEVELS.indexOf(currentLevel);
      if (currentIndex < COURSE_LEVELS.length - 1) {
        unlockLevel(COURSE_LEVELS[currentIndex + 1]);
      }
    }
  };

  const handleRetryQuiz = () => {
    setShowResult(false);
    setShowQuiz(false);
    setQuizScore(0);
    setCurrentCardIndex(0);
    incrementQuizAttempt(currentLevel);
  };

  const handleNextLevel = () => {
    const currentIndex = COURSE_LEVELS.indexOf(currentLevel);
    if (currentIndex < COURSE_LEVELS.length - 1) {
      const nextLevel = COURSE_LEVELS[currentIndex + 1];
      // Reset all states before moving to next level
      setShowResult(false);
      setShowQuiz(false);
      setQuizScore(0);
      setCurrentCardIndex(0);
      setLevel(nextLevel);
    }
  };

  const handleBackToLevels = () => {
    setShowResult(false);
    setShowQuiz(false);
    setShowCourse(false);
    setCurrentCardIndex(0);
  };

  const handleGoHome = () => {
    setShowCourse(false);
    setCurrentCardIndex(0);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-pastel-cream z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleGoHome}
              className="flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Beranda</span>
            </button>
            <span className="text-text-muted font-medium">
              {module.title}
            </span>
          </div>
          <ProgressBar
            current={currentCardIndex + 1}
            total={totalCards}
            color="sage"
          />
        </div>

        {/* Card Stack */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {!showQuiz && !showResult && (
              <ContentCard
                key={`card-${currentCardIndex}`}
                card={currentCard}
                currentIndex={currentCardIndex}
                totalCards={totalCards}
              />
            )}

            {showQuiz && !showResult && (
              <div className="flex justify-center">
                <QuizCard
                  key="quiz"
                  questions={module.quiz}
                  level={currentLevel}
                  onComplete={handleQuizComplete}
                />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {!showQuiz && !showResult && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all
                ${
                  currentCardIndex === 0
                    ? 'bg-pastel-slate text-text-muted cursor-not-allowed'
                    : 'bg-white text-accent-blue shadow-soft hover:shadow-lift hover:-translate-y-1'
                }
              `}
            >
              <ArrowLeft className="w-5 h-5" />
              Sebelumnya
            </button>

            <button
              onClick={handleNext}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all
                ${
                  isLastCard
                    ? 'bg-accent-sage text-white shadow-soft hover:shadow-lift hover:-translate-y-1'
                    : 'bg-accent-blue text-white shadow-soft hover:shadow-lift hover:-translate-y-1'
                }
              `}
            >
              {isLastCard ? 'Kerjakan Quiz →' : 'Lanjut →'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Quiz Result */}
        {showResult && (
          <QuizResult
            score={quizScore}
            passingScore={module.unlockThreshold}
            level={currentLevel}
            onRetry={handleRetryQuiz}
            onNextLevel={handleNextLevel}
            onBackToLevels={handleBackToLevels}
            attempts={quizAttempts[currentLevel] || 1}
            maxAttempts={3}
          />
        )}

        {/* Swipe Hint */}
        {!showQuiz && !showResult && (
          <motion.div
            className="text-center mt-4 text-text-muted text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2">
              ◀ Swipe untuk navigasi ▶
            </span>
          </motion.div>
        )}
      </div>
    </div>
    </motion.div>
  );
}
