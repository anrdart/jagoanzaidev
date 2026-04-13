import { motion } from 'framer-motion';
import { useCourseStore } from '../store/useCourseStore';
import { usePathStore } from '../stores/pathStore';
import { useCuratedStore } from '../stores/curatedStore';
import { useStoryStore } from '../stores/storyStore';
import { COURSE_LEVELS, courseData } from '../content/course-data';
import { curatedTopics } from '../content/curated-data';
import { storyData, STORY_CHAPTERS } from '../content/story-data';
import { authClient } from '../lib/auth-client';
import {
  Compass,
  BookOpen,
  BookMarked,
  Trophy,
  Target,
  ChevronRight,
  User,
  LogOut,
  Star,
  ArrowRight,
} from 'lucide-react';

export default function Dashboard() {
  const { userEmail, logout } = useCourseStore();
  const { quizScores: pathScores, completedCards } = usePathStore();
  const { completedTopics, favoriteTopics } = useCuratedStore();
  const { completedChapters, earnedBadges } = useStoryStore();

  const pathCompleted = COURSE_LEVELS.filter(
    (l) => (pathScores[l] ?? 0) >= courseData[l].unlockThreshold
  ).length;
  const curatedCompleted = completedTopics.length;
  const storyCompleted = completedChapters.length;

  const totalTopics = curatedTopics.length;
  const totalChapters = STORY_CHAPTERS.length;
  const totalLevels = COURSE_LEVELS.length;

  const overallProgress = Math.round(
    ((pathCompleted / totalLevels) * 30 +
      (curatedCompleted / totalTopics) * 30 +
      (storyCompleted / totalChapters) * 40)
  );

  const nextPathLevel = COURSE_LEVELS.find((l) => (pathScores[l] ?? 0) < courseData[l].unlockThreshold);
  const nextStoryChapter = STORY_CHAPTERS.find((ch) => !completedChapters.includes(ch));
  const favoriteTopicIds = favoriteTopics.slice(0, 3);
  const favoriteTopicItems = favoriteTopicIds
    .map((id) => curatedTopics.find((t) => t.id === id))
    .filter(Boolean);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch {}
    logout();
  };

  const lastQuizScore = COURSE_LEVELS.map((l) => pathScores[l]).filter((s) => s != null);
  const averageScore = lastQuizScore.length > 0
    ? Math.round(lastQuizScore.reduce((a, b) => a + b, 0) / lastQuizScore.length)
    : 0;

  return (
    <div className="min-h-screen bg-pastel-cream">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">

        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent-blue rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-text-primary">
                Halo, {userEmail?.split('@')[0] || 'User'}!
              </h1>
              <p className="text-sm text-text-muted">Lanjutkan belajarmu</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-muted hover:text-accent-coral hover:bg-pastel-coral/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl shadow-soft p-6 md:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-1">
                Progress Keseluruhan
              </h2>
              <p className="text-text-muted text-sm">Tetap semangat belajarnya!</p>
            </div>
            <div className="text-4xl font-heading font-extrabold text-accent-blue">
              {overallProgress}%
            </div>
          </div>
          <div className="h-3 bg-pastel-slate rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-blue to-accent-sage rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs text-text-muted">
            <span>{earnedBadges.length} badge diraih</span>
            <span>Rata-rata quiz: {averageScore}%</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.a
            href="/path"
            className="bg-white rounded-3xl shadow-soft p-6 hover:shadow-lift hover:-translate-y-1 transition-all group block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-2xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-accent-blue" />
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
              Learning Path
            </h3>
            <p className="text-sm text-text-muted mb-4">
              {pathCompleted} dari {totalLevels} level selesai
            </p>
            <div className="h-2 bg-pastel-slate rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-blue rounded-full transition-all"
                style={{ width: `${(pathCompleted / totalLevels) * 100}%` }}
              />
            </div>
            {nextPathLevel && (
              <p className="text-xs text-accent-blue mt-3 font-medium flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                Lanjut: {courseData[nextPathLevel].title}
              </p>
            )}
          </motion.a>
          {/* Curated */}
          <motion.a
            href="/curated"
            className="bg-white rounded-3xl shadow-soft p-6 hover:shadow-lift hover:-translate-y-1 transition-all group block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-sage/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-accent-sage" />
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-accent-sage group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
              Curated Modules
            </h3>
            <p className="text-sm text-text-muted mb-4">
              {curatedCompleted} dari {totalTopics} topik selesai
            </p>
            <div className="h-2 bg-pastel-slate rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-sage rounded-full transition-all"
                style={{ width: `${(curatedCompleted / totalTopics) * 100}%` }}
              />
            </div>
            {curatedCompleted < totalTopics && (
              <p className="text-xs text-accent-sage mt-3 font-medium flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                {totalTopics - curatedCompleted} topik lagi
              </p>
            )}
          </motion.a>
          {/* Story */}
          <motion.a
            href="/story"
            className="bg-white rounded-3xl shadow-soft p-6 hover:shadow-lift hover:-translate-y-1 transition-all group block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-coral/10 rounded-2xl flex items-center justify-center">
                <BookMarked className="w-6 h-6 text-accent-coral" />
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-accent-coral group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
              Story Mode
            </h3>
            <p className="text-sm text-text-muted mb-4">
              {storyCompleted} dari {totalChapters} chapter selesai
            </p>
            <div className="h-2 bg-pastel-slate rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-coral rounded-full transition-all"
                style={{ width: `${(storyCompleted / totalChapters) * 100}%` }}
              />
            </div>
            {nextStoryChapter && (
              <p className="text-xs text-accent-coral mt-3 font-medium flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                Lanjut: {storyData[nextStoryChapter].title}
              </p>
            )}
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-3xl shadow-soft p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-heading font-bold text-text-primary">
                Badge Kamu
              </h3>
            </div>
            {earnedBadges.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {earnedBadges.map((badgeId) => {
                  const chapter = storyData[badgeId as keyof typeof storyData];
                  if (!chapter) return null;
                  return (
                    <div
                      key={badgeId}
                      className="bg-pastel-cream rounded-2xl px-4 py-3 flex items-center gap-3"
                    >
                      <span className="text-2xl">{chapter.reward.badge}</span>
                      <div>
                        <p className="text-sm font-heading font-bold text-text-primary">
                          {chapter.reward.title}
                        </p>
                        <p className="text-xs text-text-muted">
                          {chapter.reward.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-text-muted text-sm">
                Belum ada badge. Selesaikan chapter story untuk meraih badge!
              </p>
            )}
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-soft p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-accent-blue" />
              <h3 className="text-lg font-heading font-bold text-text-primary">
                Statistik
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-pastel-slate">
                <span className="text-sm text-text-secondary">Kartu dibaca</span>
                <span className="font-heading font-bold text-text-primary">{completedCards.length}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-pastel-slate">
                <span className="text-sm text-text-secondary">Topik favorit</span>
                <span className="font-heading font-bold text-text-primary">{favoriteTopics.length}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-pastel-slate">
                <span className="text-sm text-text-secondary">Rata-rata quiz</span>
                <span className="font-heading font-bold text-text-primary">{averageScore}%</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">Total badge</span>
                <span className="font-heading font-bold text-text-primary">{earnedBadges.length}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {favoriteTopicItems.length > 0 && (
          <motion.div
            className="bg-white rounded-3xl shadow-soft p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-heading font-bold text-text-primary">
                Topik Favorit
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {favoriteTopicItems.map((topic) =>
                topic ? (
                  <a
                    key={topic.id}
                    href="/curated"
                    className="bg-pastel-cream rounded-2xl p-4 hover:shadow-soft transition-all"
                  >
                    <p className="text-sm font-heading font-bold text-text-primary">
                      {topic.title}
                    </p>
                    <p className="text-xs text-text-muted mt-1 capitalize">{topic.category} &middot; {topic.difficulty}</p>
                  </a>
                ) : null
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
