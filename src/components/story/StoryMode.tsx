import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useStoryStore } from '../../stores/storyStore';
import {
  storyData,
  storyCharacters,
  STORY_CHAPTERS,
  type StoryChapterId,
  type StoryDialog,
} from '../../content/story-data';
import BlobButton from '../ui/BlobButton';
import FloatingCard from '../ui/FloatingCard';
import ProgressBar from '../ui/ProgressBar';
import LockBadge from '../ui/LockBadge';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  RotateCcw,
  Trophy,
  BookOpen,
} from 'lucide-react';

const emotionMap: Record<string, { emoji: string; label: string }> = {
  happy: { emoji: '😊', label: 'senang' },
  surprised: { emoji: '😲', label: 'terkejut' },
  thinking: { emoji: '🤔', label: 'berpikir' },
  excited: { emoji: '🎉', label: 'antusias' },
  worried: { emoji: '😰', label: 'khawatir' },
  proud: { emoji: '💪', label: 'bangga' },
};

const chapterAccents: Record<
  StoryChapterId,
  { bg: string; border: string; text: string; badge: string }
> = {
  'ch1-first-website': {
    bg: 'bg-pastel-blue',
    border: 'border-accent-blue/20',
    text: 'text-accent-blue',
    badge: 'bg-accent-blue/10',
  },
  'ch2-hosting-world': {
    bg: 'bg-pastel-sage',
    border: 'border-accent-sage/20',
    text: 'text-accent-sage',
    badge: 'bg-accent-sage/10',
  },
  'ch3-dns-dungeon': {
    bg: 'bg-pastel-lavender',
    border: 'border-purple-300',
    text: 'text-purple-600',
    badge: 'bg-purple-100',
  },
  'ch4-security-shield': {
    bg: 'bg-pastel-coral',
    border: 'border-accent-coral/20',
    text: 'text-accent-coral',
    badge: 'bg-accent-coral/10',
  },
  'ch5-performance-tower': {
    bg: 'bg-pastel-mint',
    border: 'border-teal-300',
    text: 'text-teal-600',
    badge: 'bg-teal-100',
  },
};

function getCharacter(id: string) {
  return storyCharacters.find((c) => c.id === id);
}

function getChapterCharacters(chapterId: StoryChapterId) {
  const chapter = storyData[chapterId];
  const charIds = new Set<string>();
  chapter.scenes.forEach((scene) => {
    scene.dialogs.forEach((d: StoryDialog) => charIds.add(d.characterId));
  });
  return storyCharacters.filter((c) => charIds.has(c.id));
}

export default function StoryMode() {
  const store = useStoryStore();

  const [quizCurrentQ, setQuizCurrentQ] = useState(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<number | null>(
    null
  );
  const [quizShowFeedback, setQuizShowFeedback] = useState(false);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<Set<number>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizFinalScore, setQuizFinalScore] = useState(0);
  const [badgeJustEarned, setBadgeJustEarned] = useState(false);

  const resetQuizState = useCallback(() => {
    setQuizCurrentQ(0);
    setQuizSelectedAnswer(null);
    setQuizShowFeedback(false);
    setQuizCorrectCount(0);
    setQuizAnswered(new Set());
    setQuizCompleted(false);
    setQuizFinalScore(0);
    setBadgeJustEarned(false);
  }, []);

  const handleBackToChapters = useCallback(() => {
    useStoryStore.setState({
      currentChapter: null,
      currentSceneIndex: 0,
      showStory: false,
      showQuiz: false,
    });
    resetQuizState();
  }, [resetQuizState]);

  const handleStartQuiz = useCallback(() => {
    store.setShowQuiz(true);
    resetQuizState();
  }, [store, resetQuizState]);

  const handleQuizAnswer = useCallback(
    (index: number) => {
      if (quizShowFeedback || !store.currentChapter) return;

      const chapter = storyData[store.currentChapter];
      const question = chapter.quiz[quizCurrentQ];

      setQuizSelectedAnswer(index);
      setQuizShowFeedback(true);

      if (
        index === question.correctIndex &&
        !quizAnswered.has(quizCurrentQ)
      ) {
        setQuizCorrectCount((prev) => prev + 1);
        setQuizAnswered((prev) => new Set(prev).add(quizCurrentQ));
      }
    },
    [quizShowFeedback, quizCurrentQ, quizAnswered, store.currentChapter]
  );

  const handleQuizNext = useCallback(() => {
    if (!store.currentChapter) return;

    const chapter = storyData[store.currentChapter];
    const isLast = quizCurrentQ === chapter.quiz.length - 1;

    if (isLast) {
      const score = Math.round(
        (quizCorrectCount / chapter.quiz.length) * 100
      );
      setQuizFinalScore(score);
      setQuizCompleted(true);

      store.saveQuizScore(store.currentChapter, score);
      store.completeChapter(store.currentChapter);
      store.incrementQuizAttempt(store.currentChapter);

      if (score >= chapter.unlockThreshold) {
        const currentIndex = STORY_CHAPTERS.indexOf(store.currentChapter);
        if (currentIndex < STORY_CHAPTERS.length - 1) {
          store.unlockChapter(STORY_CHAPTERS[currentIndex + 1]);
        }
        store.earnBadge(store.currentChapter);
        setBadgeJustEarned(true);
      }
    } else {
      setQuizCurrentQ((prev) => prev + 1);
      setQuizSelectedAnswer(null);
      setQuizShowFeedback(false);
    }
  }, [store, quizCurrentQ, quizCorrectCount]);

  const handleRetryQuiz = useCallback(() => {
    if (store.currentChapter) {
      store.incrementQuizAttempt(store.currentChapter);
    }
    store.setShowQuiz(false);
    store.setCurrentSceneIndex(0);
    resetQuizState();
  }, [store, resetQuizState]);

  const handleNextChapter = useCallback(() => {
    if (!store.currentChapter) return;
    const currentIndex = STORY_CHAPTERS.indexOf(store.currentChapter);
    if (currentIndex < STORY_CHAPTERS.length - 1) {
      const nextId = STORY_CHAPTERS[currentIndex + 1];
      useStoryStore.setState({
        currentChapter: null,
        currentSceneIndex: 0,
        showStory: false,
        showQuiz: false,
      });
      resetQuizState();
      store.setChapter(nextId);
    }
  }, [store, resetQuizState]);

  if (!store.currentChapter) {
    return <ChapterSelectionView />;
  }

  if (store.showQuiz && !quizCompleted) {
    return (
      <QuizView
        quizCurrentQ={quizCurrentQ}
        quizSelectedAnswer={quizSelectedAnswer}
        quizShowFeedback={quizShowFeedback}
        onAnswer={handleQuizAnswer}
        onNext={handleQuizNext}
        onBack={handleBackToChapters}
      />
    );
  }

  if (store.showQuiz && quizCompleted) {
    return (
      <QuizResultView
        score={quizFinalScore}
        badgeJustEarned={badgeJustEarned}
        onRetry={handleRetryQuiz}
        onNextChapter={handleNextChapter}
        onBackToChapters={handleBackToChapters}
      />
    );
  }

  return (
    <StoryReadingView
      onStartQuiz={handleStartQuiz}
    />
  );
}

function ChapterSelectionView() {
  const store = useStoryStore();
  const earnedBadges = store.earnedBadges;

  return (
    <div className="min-h-screen bg-pastel-cream py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-accent-blue" />
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-text-primary">
              Story Mode
            </h1>
          </div>
          <p className="text-xl text-text-secondary">
            Belajar sambil berpetualang
          </p>
        </motion.div>

        {earnedBadges.length > 0 && (
          <motion.div
            className="mb-10 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-sm text-text-muted font-medium mr-1">
              Badge Kamu:
            </span>
            {earnedBadges.map((badgeId: string) => {
              const chapter = storyData[badgeId as StoryChapterId];
              if (!chapter) return null;
              return (
                <motion.div
                  key={badgeId}
                  className="bg-white rounded-full px-4 py-2 shadow-soft flex items-center gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <span className="text-lg">{chapter.reward.badge}</span>
                  <span className="text-sm font-heading font-bold text-text-primary">
                    {chapter.reward.title}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORY_CHAPTERS.map((chapterId: StoryChapterId, index: number) => {
            const chapter = storyData[chapterId];
            const isUnlocked = store.unlockedChapters.includes(chapterId);
            const isCompleted = store.completedChapters.includes(chapterId);
            const score = store.quizScores[chapterId];
            const accent = chapterAccents[chapterId];
            const characters = getChapterCharacters(chapterId);

            return (
              <FloatingCard key={chapterId} delay={index * 0.08}>
                <div className="relative">
                  <AnimatePresence>
                    {!isUnlocked && (
                      <LockBadge
                        isLocked={true}
                        reason={`Selesaikan Chapter ${index} dulu`}
                      />
                    )}
                  </AnimatePresence>

                  <div
                    className={`w-14 h-14 ${accent.bg} rounded-2xl flex items-center justify-center mb-4`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className={`w-7 h-7 ${accent.text}`} />
                    ) : (
                      <span className="text-2xl font-heading font-extrabold text-text-primary">
                        {chapter.chapterNumber}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-xl font-heading font-bold mb-1 ${
                      isUnlocked ? 'text-text-primary' : 'text-text-muted'
                    }`}
                  >
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-text-muted font-medium mb-2">
                    {chapter.subtitle}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {chapter.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4 min-h-[32px]">
                    {characters.slice(0, 3).map((char) => (
                      <div
                        key={char.id}
                        className="w-8 h-8 rounded-full bg-pastel-slate flex items-center justify-center text-sm"
                        title={char.name}
                      >
                        {char.avatar}
                      </div>
                    ))}
                    {characters.length > 3 && (
                      <span className="text-xs text-text-muted">
                        +{characters.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    {isUnlocked ? (
                      isCompleted && score !== undefined ? (
                        <div className="flex items-center gap-2">
                          <span className="text-accent-sage font-semibold text-sm">
                            ✅ Selesai
                          </span>
                          <span className="text-text-muted text-sm">
                            ({score}%)
                          </span>
                        </div>
                      ) : (
                        <BlobButton
                          variant="primary"
                          size="sm"
                          onClick={() => store.setChapter(chapterId)}
                        >
                          Mulai →
                        </BlobButton>
                      )
                    ) : (
                      <span className="text-text-muted text-sm font-medium">
                        🔒 Terkunci
                      </span>
                    )}
                  </div>

                  {isCompleted && (
                    <div className="mt-3 pt-3 border-t border-pastel-slate">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {chapter.reward.badge}
                        </span>
                        <span className="text-xs text-text-muted">
                          {chapter.reward.title}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </FloatingCard>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="/"
            className="text-text-muted hover:text-accent-blue font-medium transition-colors"
          >
            ← Kembali ke Beranda
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function StoryReadingView(props: {
  onStartQuiz: () => void;
}) {
  const { onStartQuiz } = props;
  const store = useStoryStore();
  const chapter = storyData[store.currentChapter!];
  const scene = chapter.scenes[store.currentSceneIndex];
  const totalScenes = chapter.scenes.length;
  const isLastScene = store.currentSceneIndex === totalScenes - 1;
  const isFirstScene = store.currentSceneIndex === 0;

  return (
    <div className="min-h-screen bg-pastel-cream py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-muted font-medium">
              {chapter.title}
            </span>
            <span className="text-sm text-text-muted">
              {store.currentSceneIndex + 1}/{totalScenes}
            </span>
          </div>
          <ProgressBar
            current={store.currentSceneIndex + 1}
            total={totalScenes}
            color="blue"
            showLabel={false}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-primary">
                {scene.title}
              </h2>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl shadow-soft p-8 md:p-10 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <p className="text-lg text-text-secondary leading-loose">
                {scene.narrative}
              </p>
            </motion.div>

            {scene.dialogs.length > 0 && (
              <div className="space-y-4 mb-8">
                {scene.dialogs.map((dialog: StoryDialog, dIdx: number) => {
                  const character = getCharacter(dialog.characterId);
                  if (!character) return null;
                  const emotion = dialog.emotion
                    ? emotionMap[dialog.emotion]
                    : null;

                  return (
                    <motion.div
                      key={`${scene.id}-dialog-${dIdx}`}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + dIdx * 0.1 }}
                    >
                      <div className="flex flex-col items-center gap-1 flex-shrink-0 w-16">
                        <div
                          className={`w-12 h-12 rounded-2xl ${character.color} flex items-center justify-center text-xl`}
                        >
                          {character.avatar}
                        </div>
                        <span className="text-xs font-heading font-bold text-text-primary text-center leading-tight">
                          {character.name}
                        </span>
                        {emotion && (
                          <span className="text-xs text-text-muted">
                            {emotion.emoji} {emotion.label}
                          </span>
                        )}
                      </div>
                      <div
                        className={`flex-1 ${character.color} rounded-2xl rounded-tl-sm p-4 md:p-5`}
                      >
                        <p className="text-text-primary leading-relaxed">
                          {dialog.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {scene.learningPoints.length > 0 && (
              <motion.div
                className="bg-pastel-lemon rounded-3xl p-6 md:p-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + scene.dialogs.length * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <h4 className="font-heading font-bold text-amber-800">
                    Poin Pembelajaran
                  </h4>
                </div>
                <ul className="space-y-2">
                  {scene.learningPoints.map((point: string, pIdx: number) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-3 text-text-secondary"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-amber-700">
                          {pIdx + 1}
                        </span>
                      </span>
                      <span className="text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => store.previousScene()}
            disabled={isFirstScene}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all
              ${
                isFirstScene
                  ? 'bg-pastel-slate text-text-muted cursor-not-allowed'
                  : 'bg-white text-accent-blue shadow-soft hover:shadow-lift hover:-translate-y-1'
              }
            `}
          >
            <ArrowLeft className="w-5 h-5" />
            Sebelumnya
          </button>

          {isLastScene ? (
            <BlobButton variant="sage" size="md" onClick={onStartQuiz}>
              Kerjakan Quiz →
            </BlobButton>
          ) : (
            <button
              onClick={() => store.nextScene()}
              className="flex items-center gap-2 px-6 py-3 bg-accent-blue text-white rounded-2xl font-medium shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all"
            >
              Lanjut
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function QuizView({
  quizCurrentQ,
  quizSelectedAnswer,
  quizShowFeedback,
  onAnswer,
  onNext,
  onBack,
}: {
  quizCurrentQ: number;
  quizSelectedAnswer: number | null;
  quizShowFeedback: boolean;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const store = useStoryStore();
  const chapter = storyData[store.currentChapter!];
  const question = chapter.quiz[quizCurrentQ];
  const isLastQuestion = quizCurrentQ === chapter.quiz.length - 1;
  const progress = ((quizCurrentQ + 1) / chapter.quiz.length) * 100;

  return (
    <div className="min-h-screen bg-pastel-cream py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={onBack}
            className="text-text-muted hover:text-accent-blue transition-colors font-medium text-sm"
          >
            ← Chapters
          </button>
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <div>
                <span className="text-sm text-text-muted">Soal</span>
                <span className="text-xl font-bold text-text-primary ml-2">
                  {quizCurrentQ + 1}
                </span>
                <span className="text-text-muted text-lg">
                  {' '}
                  / {chapter.quiz.length}
                </span>
              </div>
              <div className="bg-pastel-sage px-4 py-1 rounded-full">
                <span className="font-bold text-accent-sage">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            <div className="h-3 bg-pastel-slate rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-sage rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

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

          <div className="space-y-3 mb-6">
            <AnimatePresence mode="wait">
              {question.options.map((option: string, index: number) => {
                const isSelected = quizSelectedAnswer === index;
                const isCorrect = index === question.correctIndex;
                const isWrong = isSelected && !isCorrect;

                return (
                  <motion.button
                    key={`${quizCurrentQ}-${index}`}
                    onClick={() => onAnswer(index)}
                    disabled={quizShowFeedback}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      w-full p-4 rounded-2xl text-left font-medium transition-all duration-200 border-2 relative overflow-hidden
                      ${
                        quizShowFeedback
                          ? isCorrect
                            ? 'bg-accent-sage/10 border-accent-sage'
                            : isWrong
                            ? 'bg-accent-coral/10 border-accent-coral'
                            : 'bg-pastel-slate border-transparent'
                          : isSelected
                          ? 'bg-accent-blue/10 border-accent-blue'
                          : 'bg-white border-pastel-slate hover:border-accent-blue/30 hover:bg-pastel-blue/30 shadow-soft'
                      }
                      ${!quizShowFeedback && 'hover:shadow-lift hover:-translate-y-0.5'}
                      disabled:cursor-not-allowed
                    `}
                    whileHover={!quizShowFeedback ? { scale: 1.01 } : {}}
                    whileTap={!quizShowFeedback ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div
                        className={`
                        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm
                        ${
                          quizShowFeedback
                            ? isCorrect
                              ? 'bg-accent-sage text-white'
                              : isWrong
                              ? 'bg-accent-coral text-white'
                              : 'bg-pastel-slate text-text-muted'
                            : isSelected
                            ? 'bg-accent-blue text-white'
                            : 'bg-pastel-slate text-text-muted'
                        }
                      `}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>

                      <span
                        className={`flex-1 ${
                          quizShowFeedback
                            ? isCorrect || isWrong
                              ? 'text-text-primary font-semibold'
                              : 'text-text-muted'
                            : 'text-text-primary'
                        }`}
                      >
                        {option}
                      </span>

                      {quizShowFeedback && (isCorrect || isWrong) && (
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

          <AnimatePresence>
            {quizShowFeedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="bg-pastel-lavender rounded-2xl p-5 border-2 border-accent-blue/20">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">💡</span>
                    <div>
                      <p className="font-bold text-accent-blue mb-1">
                        Penjelasan:
                      </p>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {quizShowFeedback && (
              <motion.button
                onClick={onNext}
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
      </div>
    </div>
  );
}

function QuizResultView({
  score,
  badgeJustEarned,
  onRetry,
  onNextChapter,
  onBackToChapters,
}: {
  score: number;
  badgeJustEarned: boolean;
  onRetry: () => void;
  onNextChapter: () => void;
  onBackToChapters: () => void;
}) {
  const store = useStoryStore();
  const chapter = storyData[store.currentChapter!];
  const passed = score >= chapter.unlockThreshold;
  const currentIdx = STORY_CHAPTERS.indexOf(store.currentChapter!);
  const hasNextChapter = currentIdx < STORY_CHAPTERS.length - 1;

  return (
    <div className="min-h-screen bg-pastel-cream flex items-center justify-center py-8 px-4 md:px-6">
      <motion.div
        className="bg-white rounded-3xl shadow-lift max-w-md w-full p-8 md:p-12 text-center"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <motion.div
          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
        >
          {passed ? (
            <div className="w-full h-full bg-pastel-sage rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-accent-sage" />
            </div>
          ) : (
            <div className="w-full h-full bg-pastel-coral rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-accent-coral" />
            </div>
          )}
        </motion.div>

        <motion.h2
          className="text-3xl font-heading font-extrabold text-text-primary mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {passed ? 'Selamat!' : 'Belum Lulus'}
        </motion.h2>

        <motion.p
          className="text-text-secondary mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {passed
            ? `Kamu lulus Chapter ${chapter.chapterNumber}!`
            : `Butuh ${chapter.unlockThreshold}% untuk lulus`}
        </motion.p>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="text-5xl font-heading font-extrabold text-accent-blue mb-2">
            {score}%
          </div>
        </motion.div>

        <AnimatePresence>
          {badgeJustEarned && (
            <motion.div
              className="mb-6 bg-pastel-lavender rounded-2xl p-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3,
                type: 'spring',
                stiffness: 300,
                damping: 15,
              }}
            >
              <motion.div
                className="text-4xl mb-2"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {chapter.reward.badge}
              </motion.div>
              <p className="font-heading font-bold text-text-primary">
                {chapter.reward.title}
              </p>
              <p className="text-sm text-text-secondary">
                {chapter.reward.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {passed ? (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {hasNextChapter && (
              <BlobButton
                variant="sage"
                size="lg"
                onClick={onNextChapter}
                className="w-full"
              >
                Chapter Selanjutnya →
              </BlobButton>
            )}
            <button
              onClick={onBackToChapters}
              className="w-full text-text-muted hover:text-accent-blue font-medium transition-colors"
            >
              Kembali ke Chapters
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <BlobButton
              variant="accent"
              size="lg"
              onClick={onRetry}
              className="w-full"
            >
              <RotateCcw className="w-5 h-5" />
              Coba Lagi
            </BlobButton>
            <button
              onClick={onBackToChapters}
              className="w-full text-text-muted hover:text-accent-blue font-medium transition-colors"
            >
              Kembali ke Chapters
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
