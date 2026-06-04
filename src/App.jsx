import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useStore } from '@/store/useStore'
import { Navbar } from '@/components/Navbar'
import { CalculatorPage } from '@/pages/CalculatorPage'

import { CompareLoans } from '@/pages/CompareLoans'
import { SipCalculator } from '@/pages/SipCalculator'

import { Mail } from 'lucide-react'

function App() {
  const { theme } = useStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <CalculatorPage
              title="Calculate Your EMI Instantly"
              description="Know your monthly payments, interest costs, and repayment schedule before taking a loan."
              defaultPrincipal={1000000} defaultRate={8.5} defaultTenure={60}
            />
          } />
          <Route path="/home-loan-emi-calculator" element={
            <CalculatorPage
              title="Home Loan EMI Calculator"
              description="Plan your home loan repayment with our advanced home loan EMI calculator. Check your amortization schedule."
              defaultPrincipal={5000000} defaultRate={8.5} defaultTenure={240}
            />
          } />
          <Route path="/personal-loan-emi-calculator" element={
            <CalculatorPage
              title="Personal Loan EMI Calculator"
              description="Calculate your personal loan EMI instantly. Find out the total interest payable and outstanding balances."
              defaultPrincipal={500000} defaultRate={11} defaultTenure={48}
            />
          } />
          <Route path="/car-loan-emi-calculator" element={
            <CalculatorPage
              title="Car Loan EMI Calculator"
              description="Use our auto loan EMI calculator to know your monthly car installments."
              defaultPrincipal={800000} defaultRate={9} defaultTenure={60}
            />
          } />
          <Route path="/sip-calculator" element={<SipCalculator />} />
          <Route path="/compare-loans" element={<CompareLoans />} />
        </Routes>
      </main>

      <footer className="border-t border-border py-8 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground text-lg">FinCal</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/crelante.service/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              <span className="sr-only">Instagram</span>
            </a>
            <a href="mailto:crelanteservice@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={24} />
              <span className="sr-only">Email</span>
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <p>© {new Date().getFullYear()} FinCal. All rights reserved.</p>
            <p className="font-medium text-foreground">Created by crelante</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
