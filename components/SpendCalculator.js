'use client'

import { useMemo, useState, useEffect } from 'react'

export default function SpendCalculator({ initialMonthly = 2000 }) {
  // coerce to number and allow prop changes (MDX may re-render)
  const [monthlySpend, setMonthlySpend] = useState(() => Number(initialMonthly) || 0)

  useState(() => {});
  // keep state in sync if parent passes a new value later
  useEffect(() => {
    const num = Number(initialMonthly) || 0
    setMonthlySpend(num)
  }, [initialMonthly])

  const values = useMemo(() => {
    const annual = monthlySpend * 12
    const gold = annual * 0.03
    const two = annual * 0.02
    const onePointFive = annual * 0.015
    const netVsTwo = gold - two
    const netVsFifteen = gold - onePointFive
    const breakEvenPoint = Math.ceil(50 / 0.03)
    return {
      annual,
      gold,
      two,
      onePointFive,
      netVsTwo,
      netVsFifteen,
      breakEvenPoint,
    }
  }, [monthlySpend])

  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg p-6 shadow-sm text-light-text dark:text-dark-text">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <p className="text-sm text-light-text dark:text-dark-text">Monthly spend</p>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={monthlySpend}
            onChange={(event) => setMonthlySpend(Number(event.target.value))}
            className="w-full accent-light-accent dark:accent-dark-accent"
          />
        </div>
        <p className="text-lg font-semibold text-light-accent dark:text-dark-accent">${monthlySpend.toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg bg-light-accent/10 dark:bg-dark-accent/10 p-3">
          <p className="text-xs uppercase tracking-wide text-light-text dark:text-dark-text">Annual spend</p>
          <p className="text-lg font-semibold text-light-accent dark:text-dark-accent">${values.annual.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-light-accent/10 dark:bg-dark-accent/10 p-3">
          <p className="text-xs uppercase tracking-wide text-light-text dark:text-dark-text">Gold rewards</p>
          <p className="text-lg font-semibold text-light-accent dark:text-dark-accent">${values.gold.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-light-accent/10 dark:bg-dark-accent/10 p-3">
          <p className="text-xs uppercase tracking-wide text-light-text dark:text-dark-text">Vs. 2% card</p>
          <p className="text-lg font-semibold text-light-accent dark:text-dark-accent">+${values.netVsTwo.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="rounded-lg bg-light-accent/10 dark:bg-dark-accent/10 p-3">
          <p className="text-xs uppercase tracking-wide text-light-text dark:text-dark-text">Vs. 1.5% card</p>
          <p className="text-lg font-semibold text-light-accent dark:text-dark-accent">+${values.netVsFifteen.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-light-text dark:text-dark-text mt-4">
        You only need ${values.breakEvenPoint.toLocaleString()} in annual spend if you are using it to cover the $50 Gold fee at 3%. Every dollar above that is pure reward money.
      </p>
    </div>
  )
}
