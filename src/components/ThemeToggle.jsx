import { Moon, Sun } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useStore()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </motion.button>
  )
}
