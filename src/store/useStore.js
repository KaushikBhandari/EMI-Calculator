import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      currency: 'INR',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'emi-calculator-storage',
    }
  )
)
