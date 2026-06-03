import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      currency: 'INR',
      setCurrency: (currency) => set({ currency }),
      savedCalculations: [],
      addCalculation: (calc) => set((state) => ({ 
        savedCalculations: [{ ...calc, id: Date.now(), date: new Date().toISOString() }, ...state.savedCalculations] 
      })),
      removeCalculation: (id) => set((state) => ({
        savedCalculations: state.savedCalculations.filter(calc => calc.id !== id)
      })),
    }),
    {
      name: 'emi-calculator-storage',
    }
  )
)
