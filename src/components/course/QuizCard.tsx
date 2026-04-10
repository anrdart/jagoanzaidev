import { motion } from 'framer-motion';
import { useState } from 'react';
import type { QuizQuestion } from '../../content/course-data';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizCardProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  level: string;
}

export default function QuizCard({
  questions,
  onComplete,
  level,
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

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-lift p-8 md:p-12 max-w-2xl"
      initial={{ x: 300, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: -300, opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-text-muted mb-2">
          <span>Soal {currentQuestion + 1} dari {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-pastel-slate rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent-sage rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-2">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctIndex;
          const isWrong = isSelected && !isCorrect;

          return (
            <motion.button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`
                w-full p-4 rounded-2xl text-left font-medium transition-all
                ${
                  showResult
                    ? isCorrect
                      ? 'bg-pastel-sage border-2 border-accent-sage text-accent-sage'
                      : isWrong
                      ? 'bg-pastel-coral border-2 border-accent-coral text-accent-coral'
                      : 'bg-pastel-slate text-text-muted'
                    : isSelected
                    ? 'bg-pastel-blue border-2 border-accent-blue text-accent-blue'
                    : 'bg-pastel-slate text-text-secondary hover:bg-pastel-blue'
                }
                ${!showResult && 'hover:shadow-soft hover:-translate-y-1'}
                disabled:cursor-not-allowed
              `}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{option}</span>
                {showResult && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 ml-2 flex-shrink-0" />
                )}
                {showResult && isWrong && (
                  <XCircle className="w-6 h-6 ml-2 flex-shrink-0" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <motion.div
          className="mb-8 p-4 bg-pastel-blue rounded-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-text-secondary text-sm">{question.explanation}</p>
        </motion.div>
      )}

      {/* Next Button */}
      {showResult && (
        <motion.button
          onClick={handleNext}
          className="w-full py-4 bg-accent-sage text-white font-heading font-bold rounded-2xl hover:bg-accent-sage/90 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isLastQuestion ? 'Lihat Hasil' : 'Soal Berikutnya →'}
        </motion.button>
      )}
    </motion.div>
  );
}
