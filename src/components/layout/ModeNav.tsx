import { motion } from 'framer-motion';
import { Home, BookOpen, Compass, BookMarked } from 'lucide-react';
import type { LearningMode } from '../../content/course-data';

interface ModeNavProps {
  currentMode?: LearningMode;
}

const modes: { mode: LearningMode; label: string; icon: typeof Home; path: string }[] = [
  { mode: 'path', label: 'Learning Path', icon: Compass, path: '/path' },
  { mode: 'curated', label: 'Curated', icon: BookOpen, path: '/curated' },
  { mode: 'story', label: 'Story', icon: BookMarked, path: '/story' },
];

export default function ModeNav({ currentMode }: ModeNavProps) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-pastel-slate"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium text-sm hidden sm:inline">Beranda</span>
        </a>

        <div className="flex items-center gap-1 bg-pastel-slate/50 rounded-2xl p-1">
          {modes.map(({ mode, label, icon: Icon, path }) => {
            const isActive = mode === currentMode;
            return (
              <a
                key={mode}
                href={path}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-white text-accent-blue shadow-soft'
                    : 'text-text-muted hover:text-text-secondary'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            );
          })}
        </div>

        <div className="w-16" />
      </div>
    </motion.nav>
  );
}
