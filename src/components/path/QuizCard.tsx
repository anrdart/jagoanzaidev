import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { QuizQuestion } from '../../content/course-data';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizCardProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function QuizCard({
  questions,
  onComplete,
}: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === question.correctIndex;
    if (isCorrect && !answeredQuestions.has(currentQuestion)) {
      setCorrectAnswers((prev) => prev + 1);
      setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final score
      const finalScore = Math.round(
        (correctAnswers / questions.length) * 100
      );
      onComplete(finalScore);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="text-sm text-text-muted">Soal</span>
            <span className="text-xl font-bold text-text-primary ml-2">
              {currentQuestion + 1}
            </span>
            <span className="text-text-muted text-lg"> / {questions.length}</span>
          </div>
          <div className="bg-pastel-sage px-4 py-1 rounded-full">
            <span className="font-bold text-accent-sage">{Math.round(progress)}%</span>
          </div>
        </div>
        <div className="h-3 bg-pastel-slate rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-sage to-accent-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-lift p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-accent-blue font-bold text-lg">Q</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-heading font-bold text-text-primary leading-relaxed">
              {question.question}
            </h3>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        <AnimatePresence mode="wait">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctIndex;
            const isWrong = isSelected && !isCorrect;

            return (
              <motion.button
                key={`${currentQuestion}-${index}`}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  w-full p-4 rounded-2xl text-left font-medium transition-all duration-200 border-2 relative overflow-hidden
                  ${
                    showResult
                      ? isCorrect
                        ? 'bg-accent-sage/10 border-accent-sage'
                        : isWrong
                        ? 'bg-accent-coral/10 border-accent-coral'
                        : 'bg-pastel-slate border-transparent'
                      : isSelected
                      ? 'bg-accent-blue/10 border-accent-blue'
                      : 'bg-white border-pastel-slate hover:border-accent-blue/30 hover:bg-pastel-blue/30 shadow-soft'
                  }
                  ${!showResult && 'hover:shadow-lift hover:-translate-y-0.5'}
                  disabled:cursor-not-allowed
                `}
                whileHover={!showResult ? { scale: 1.01 } : {}}
                whileTap={!showResult ? { scale: 0.99 } : {}}
              >
                <div className="flex items-center gap-4 relative z-10">
                  {/* Option Letter */}
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm
                    ${
                      showResult
                        ? isCorrect
                          ? 'bg-accent-sage text-white'
                          : isWrong
                          ? 'bg-accent-coral text-white'
                          : 'bg-pastel-slate text-text-muted'
                        : isSelected
                        ? 'bg-accent-blue text-white'
                        : 'bg-pastel-slate text-text-muted'
                    }
                  `}>
                    {String.fromCharCode(65 + index)}
                  </div>

                  {/* Option Text */}
                  <span className={`flex-1 ${
                    showResult
                      ? isCorrect || isWrong
                        ? 'text-text-primary font-semibold'
                        : 'text-text-muted'
                      : 'text-text-primary'
                  }`}>
                    {option}
                  </span>

                  {/* Result Icon */}
                  {showResult && (isCorrect || isWrong) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0"
                    >
                      {isCorrect ? (
                        <div className="w-8 h-8 bg-accent-sage rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-accent-coral rounded-full flex items-center justify-center">
                          <XCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-r from-accent-blue/10 to-accent-sage/10 rounded-2xl p-5 border-2 border-accent-blue/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div>
                  <p className="font-bold text-accent-blue mb-1">Penjelasan:</p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      <AnimatePresence>
        {showResult && (
          <motion.button
            onClick={handleNext}
            className="w-full py-4 bg-accent-sage text-white font-heading font-bold rounded-2xl shadow-soft hover:shadow-lift hover:-translate-y-1 hover:bg-accent-sage/90 transition-all duration-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {isLastQuestion ? 'Lihat Hasil 🎉' : 'Soal Berikutnya →'}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
