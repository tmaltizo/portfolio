'use client'

import { useMemo, useState } from 'react'

/**
 * NetCostCalculator — Interactive "Real Annual Fee" calculator.
 *
 * Users slide their expected annual spend to see:
 *   • Total 3% cashback earned
 *   • Estimated margin dividend offset (~$37 from SGOV/USFR)
 *   • The **real** net cost of the Gold subscription after both offsets
 *
 * Designed to be embedded inside MDX blog posts via <NetCostCalculator />.
 */
export default function NetCostCalculator() {
  const GOLD_FEE = 50
  const MARGIN_DIVIDEND = 37 // ~$1,000 × 3.7% (SGOV/USFR average)
  const CASHBACK_RATE = 0.03

  const [annualSpend, setAnnualSpend] = useState(0)

  const values = useMemo(() => {
    const cashback = annualSpend * CASHBACK_RATE
    const netFee = GOLD_FEE - MARGIN_DIVIDEND
    const realCost = Math.max(netFee - cashback, 0)
    const netProfit = cashback - netFee
    const isProfitable = netProfit > 0
    const breakEvenSpend = Math.ceil(netFee / CASHBACK_RATE)

    return { cashback, netFee, realCost, netProfit, isProfitable, breakEvenSpend }
  }, [annualSpend])

  const pctOffset = Math.min(
    ((values.cashback + MARGIN_DIVIDEND) / GOLD_FEE) * 100,
    999
  )

  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg p-6 shadow-sm text-light-text dark:text-dark-text my-6">
      <h4 className="text-base font-semibold text-light-text-dark dark:text-dark-text mb-1">
        Net Cost Calculator
      </h4>
      <p className="text-xs text-light-text dark:text-dark-text mb-4">
        See how your spending + the margin hack change the real price of Robinhood Gold.
      </p>

      {/* Slider */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm text-light-text dark:text-dark-text">
            Annual spend
          </label>
          <span className="text-lg font-semibold text-light-accent dark:text-dark-accent">
            ${annualSpend.toLocaleString()}
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="10000"
            step="100" // slide moves by $100 increments
            value={annualSpend}
            onChange={(e) => setAnnualSpend(Number(e.target.value))}
            className="w-full accent-light-accent dark:accent-dark-accent"
            aria-label="Annual spend amount (in $100 increments)"
          />
          {/* vertical indicator line & dot */}
          {annualSpend < values.breakEvenSpend && values.breakEvenSpend <= 10000 && (
            <div
              className="absolute z-10 top-1/2 h-10 pointer-events-none flex flex-col items-center"
              style={{ left: `calc(${(values.breakEvenSpend / 10000) * 100}% + 4px)`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-px h-full bg-light-accent dark:bg-dark-accent" />
              <div
                className="w-2 h-2 bg-light-accent dark:bg-dark-accent rounded-full -mt-1 pointer-events-auto cursor-pointer"
                onClick={() => setAnnualSpend(values.breakEvenSpend)}
              />
            </div>
          )}
        </div>
        <div className="relative">
          <div className="flex justify-between text-[10px] text-light-text dark:text-dark-text mt-0.5">
            <span>$0</span>
            <span>$10,000</span>
          </div>
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="rounded-lg bg-light-accent/10 dark:bg-dark-accent/10 p-3">
          <p className="text-[10px] uppercase tracking-wide text-light-text dark:text-dark-text">
            3% cashback earned
          </p>
          <p className="text-lg font-semibold text-light-accent dark:text-dark-accent">
            ${values.cashback.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="rounded-lg bg-light-accent/10 dark:bg-dark-accent/10 p-3">
          <p className="text-[10px] uppercase tracking-wide text-light-text dark:text-dark-text">
            Margin dividend (~SGOV)
          </p>
          <p className="text-lg font-semibold text-light-accent dark:text-dark-accent">
            +${MARGIN_DIVIDEND}
          </p>
        </div>
        <div className="rounded-lg bg-light-accent/10 dark:bg-dark-accent/10 p-3">
          <p className="text-[10px] uppercase tracking-wide text-light-text dark:text-dark-text">
            Gold fee
          </p>
          <p className="text-lg font-semibold text-light-text dark:text-dark-text">
            −${GOLD_FEE}
          </p>
        </div>
        <div className={`rounded-lg p-3 ${
          values.isProfitable
            ? 'bg-green-100 dark:bg-green-900/30'
            : 'bg-red-100 dark:bg-red-900/30'
        }`}>
          <p className="text-[10px] uppercase tracking-wide text-light-text dark:text-dark-text">
            {values.isProfitable ? 'Net profit' : 'Real annual fee'}
          </p>
          <p className={`text-lg font-bold ${
            values.isProfitable
              ? 'text-green-700 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
            {values.isProfitable
              ? `+$${values.netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              : `$${values.realCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-[10px] mb-1 text-light-text dark:text-dark-text">
          <span>Fee offset</span>
          <span>{Math.min(pctOffset, 100).toFixed(0)}%{pctOffset > 100 ? ' (profit!)' : ''}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-light-border dark:bg-dark-border overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              values.isProfitable
                ? 'bg-green-500 dark:bg-green-400'
                : 'bg-light-accent dark:bg-dark-accent'
            }`}
            style={{ width: `${Math.min(pctOffset, 100)}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-light-text dark:text-dark-text">
        {values.isProfitable
          ? `At $${annualSpend.toLocaleString()}/yr, Gold pays for itself and then some. Share this with a friend who's still using a 2% card.`
          : `You'd need $${values.breakEvenSpend.toLocaleString()}/yr (about $${Math.ceil(values.breakEvenSpend / 12).toLocaleString()}/mo) in spending to fully offset the fee after the margin hack.`}
      </p>


    </div>
  )
}
