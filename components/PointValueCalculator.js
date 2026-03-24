import React, { useState } from 'react'

export default function PointValueCalculator() {
  const [annualSpend, setAnnualSpend] = useState(15000)
  const [pointValue, setPointValue] = useState(2.0)
  
  const annualFee = 95
  const pointsPerYear = annualSpend * 1 // Base 1x points
  const totalValue = (pointsPerYear * pointValue) / 100
  const netValue = totalValue - annualFee
  const breakEvenSpend = annualFee / (pointValue / 100)
  
  return (
    <div className="rounded-xl border border-light-border dark:border-dark-border p-6 mb-6 bg-light-bg dark:bg-dark-bg">
      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
        Chase Sapphire Points Value Calculator
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
            Annual Credit Card Spend: ${annualSpend.toLocaleString()}
          </label>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={annualSpend}
            onChange={(e) => setAnnualSpend(Number(e.target.value))}
            className="w-full h-2 bg-light-accent/20 dark:bg-dark-accent/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-light-text/60 dark:text-dark-text/60 mt-1">
            <span>$1,000</span>
            <span>$100,000</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
            Point Value: {pointValue.toFixed(1)}¢ per point
          </label>
          <input
            type="range"
            min="1"
            max="4"
            step="0.1"
            value={pointValue}
            onChange={(e) => setPointValue(Number(e.target.value))}
            className="w-full h-2 bg-light-accent/20 dark:bg-dark-accent/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-light-text/60 dark:text-dark-text/60 mt-1">
            <span>1¢ (Cash)</span>
            <span>4¢ (Premium)</span>
          </div>
        </div>
        
        <div className="border-t border-light-border dark:border-dark-border pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-light-text/60 dark:text-dark-text/60">Points earned per year:</span>
              <div className="font-semibold text-light-text dark:text-dark-text">
                {pointsPerYear.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-light-text/60 dark:text-dark-text/60">Total value:</span>
              <div className="font-semibold text-light-text dark:text-dark-text">
                ${totalValue.toFixed(2)}
              </div>
            </div>
            <div>
              <span className="text-light-text/60 dark:text-dark-text/60">Annual fee:</span>
              <div className="font-semibold text-red-500">
                -${annualFee}
              </div>
            </div>
            <div>
              <span className="text-light-text/60 dark:text-dark-text/60">Net value:</span>
              <div className={`font-semibold ${netValue >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {netValue >= 0 ? '+' : ''}${netValue.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg p-3 text-sm">
          <div className="text-light-text dark:text-dark-text">
            <strong>Break-even analysis:</strong> You need to spend at least 
            <span className="font-semibold"> ${breakEvenSpend.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span> 
            annually at {pointValue.toFixed(1)}¢ per point to cover the ${annualFee} annual fee.
          </div>
        </div>
      </div>
    </div>
  )
}
