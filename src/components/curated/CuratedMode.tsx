import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Clock,
  Star,
  CheckCircle2,
  X,
  BookOpen,
  XCircle,
} from 'lucide-react';
import { useCuratedStore } from '../../stores/curatedStore';
import {
  curatedTopics,
  categoryInfo,
  type TopicCategory,
  type Topic,
} from '../../content/curated-data';
import FloatingCard from '../ui/FloatingCard';
import BlobButton from '../ui/BlobButton';
import ProgressBar from '../ui/ProgressBar';

const CATEGORIES: (TopicCategory | 'all')[] = [
  'all',
  'domain',
  'hosting',
  'vps',
  'dns',
  'security',
  'linux',
  'backup',
  'performance',
];

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Pemula',
  intermediate: 'Menengah',
  advanced: 'Lanjutan',
};

function TopicCard({
  topic,
  index,
  isFavorite,
  isCompleted,
  onFavorite,
  onSelect,
}: {
  topic: Topic;
  index: number;
  isFavorite: boolean;
  isCompleted: boolean;
  onFavorite: () => void;
  onSelect: () => void;
}) {
  const cat = categoryInfo[topic.category as TopicCategory] ?? { name: topic.category, icon: '❓', color: 'bg-gray-100 text-gray-700' };

  return (
    <FloatingCard delay={index * 0.04} onClick={onSelect} className="relative">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cat.color}`}>
            <span>{cat.icon}</span>
            {cat.name}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${DIFFICULTY_STYLES[topic.difficulty]}`}>
            {DIFFICULTY_LABELS[topic.difficulty]}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
          className="p-1.5 rounded-full hover:bg-pastel-cream transition-colors shrink-0"
          aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-text-muted'
            }`}
          />
        </button>
      </div>

      <h3 className="text-lg font-heading font-bold text-text-primary mb-3 leading-snug">
        {topic.title}
      </h3>

      <div className="flex items-center gap-1.5 text-text-muted text-sm mb-3">
        <Clock className="w-4 h-4" />
        <span>{topic.duration} menit</span>
      </div>

      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-3">
        {topic.content[0] ?? ''}
      </p>

      {isCompleted && (
        <div className="flex items-center gap-1.5 text-accent-sage text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          Selesai
        </div>
      )}
    </FloatingCard>
  );
}

function TopicDetail({
  topic,
  isCompleted,
  isFavorite,
  onClose,
  onComplete,
  onFavorite,
}: {
  topic: Topic;
  isCompleted: boolean;
  isFavorite: boolean;
  onClose: () => void;
  onComplete: () => void;
  onFavorite: () => void;
}) {
  const cat = categoryInfo[topic.category as TopicCategory] ?? { name: topic.category, icon: '❓', color: 'bg-gray-100 text-gray-700' };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative w-full max-w-lg bg-white h-full overflow-y-auto shadow-lift"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <button
              onClick={onFavorite}
              className={`p-2 rounded-full transition-colors ${
                isFavorite ? 'bg-yellow-50' : 'hover:bg-pastel-cream'
              }`}
              aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-text-muted'
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-pastel-cream transition-colors"
              aria-label="Tutup"
            >
              <X className="w-6 h-6 text-text-secondary" />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${cat.color}`}>
              <span>{cat.icon}</span>
              {cat.name}
            </span>
            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${DIFFICULTY_STYLES[topic.difficulty]}`}>
              {DIFFICULTY_LABELS[topic.difficulty]}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-text-primary mb-4 leading-snug">
            {topic.title}
          </h2>

          <div className="flex items-center gap-2 text-text-muted mb-8">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">{topic.duration} menit</span>
            <span className="text-text-muted/40 mx-1">|</span>
            <span className="text-sm">{topic.content.length} poin materi</span>
          </div>

          <div className="space-y-3 mb-8">
            {topic.content.map((point, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-3 bg-pastel-cream rounded-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <span className="shrink-0 w-7 h-7 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-text-secondary text-sm leading-relaxed pt-0.5">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>

          {isCompleted ? (
            <div className="flex items-center justify-center gap-2 py-4 px-6 bg-accent-sage/10 rounded-3xl text-accent-sage font-heading font-bold">
              <CheckCircle2 className="w-5 h-5" />
              Topik sudah selesai
            </div>
          ) : (
            <BlobButton
              variant="sage"
              size="lg"
              onClick={onComplete}
              className="w-full"
            >
              <CheckCircle2 className="w-5 h-5" />
              Tandai Selesai
            </BlobButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CuratedMode() {
  const {
    selectedTopic,
    currentCategory,
    searchQuery,
    completedTopics,
    favoriteTopics,
    selectTopic,
    closeTopic,
    setCategory,
    setSearchQuery,
    markTopicComplete,
    toggleFavorite,
  } = useCuratedStore();

  const filteredTopics = useMemo(() => {
    let topics = curatedTopics;

    if (currentCategory !== 'all') {
      topics = topics.filter((t) => t.category === currentCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      topics = topics.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.content.some((c) => c.toLowerCase().includes(query))
      );
    }

    return topics;
  }, [currentCategory, searchQuery]);

  const completedCount = completedTopics.length;
  const totalCount = curatedTopics.length;

  const pillCategories = CATEGORIES as (TopicCategory | 'all')[];

  return (
    <div className="min-h-screen bg-pastel-cream">
      <div className="max-w-6xl mx-auto py-8 px-4 md:px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-text-primary mb-4">
            Curated Modules
          </h1>
          <p className="text-lg text-text-secondary mb-6">
            Belajar server dari nol dengan modul pilihan
          </p>
          <div className="max-w-md mx-auto">
            <ProgressBar
              current={completedCount}
              total={totalCount}
              color="blue"
              showLabel
            />
          </div>
        </motion.div>

        <motion.div
          className="relative mb-6 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Cari topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl shadow-soft border-2 border-transparent focus:border-accent-blue/30 focus:outline-none text-text-primary placeholder:text-text-muted font-sans transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              aria-label="Hapus pencarian"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {pillCategories.map((cat) => {
            const isActive = currentCategory === cat;
            const label = cat === 'all' ? 'Semua' : categoryInfo[cat].name;
            const icon = cat === 'all' ? null : categoryInfo[cat].icon;

            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`
                  inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
                  transition-all duration-200 font-heading
                  ${
                    isActive
                      ? 'bg-accent-blue text-white shadow-soft'
                      : 'bg-white text-text-secondary hover:bg-accent-blue/10 hover:text-accent-blue shadow-soft'
                  }
                `}
              >
                {icon && <span>{icon}</span>}
                {label}
              </button>
            );
          })}
        </motion.div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-text-muted text-sm font-medium">
            {filteredTopics.length} topik ditemukan
          </p>
        </div>

        <AnimatePresence mode="wait">
          {filteredTopics.length === 0 ? (
            <motion.div
              key="empty"
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto bg-pastel-slate rounded-3xl flex items-center justify-center mb-4">
                <BookOpen className="w-10 h-10 text-text-muted" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
                Topik tidak ditemukan
              </h3>
              <p className="text-text-secondary max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau pilih kategori lain
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`${currentCategory}-${searchQuery}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredTopics.map((topic, index) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  index={index}
                  isFavorite={favoriteTopics.includes(topic.id)}
                  isCompleted={completedTopics.includes(topic.id)}
                  onFavorite={() => toggleFavorite(topic.id)}
                  onSelect={() => selectTopic(topic)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedTopic && (
          <TopicDetail
            topic={selectedTopic}
            isCompleted={completedTopics.includes(selectedTopic.id)}
            isFavorite={favoriteTopics.includes(selectedTopic.id)}
            onClose={closeTopic}
            onComplete={() => markTopicComplete(selectedTopic.id)}
            onFavorite={() => toggleFavorite(selectedTopic.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
