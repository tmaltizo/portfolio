'use client'

import { useState, useEffect } from 'react'

/**
 * ReaderPoll — lightweight, client-side-only poll stored in localStorage.
 *
 * No backend required. Results are per-browser (anonymous) and displayed
 * as live-updating bars so readers see what others think.
 *
 * Designed for embedding in MDX posts: <ReaderPoll />
 */

const POLL_KEY = 'rh-gold-poll-v1'
const QUESTION = 'Do you think the 3% flat rate is sustainable long-term?'

const OPTIONS = [
  { id: 'yes', label: 'Yes — Robinhood can afford it' },
  { id: 'maybe', label: 'Maybe — but expect tweaks within 2 years' },
  { id: 'no', label: 'No — it\'s a loss-leader that will get nerfed' },
  { id: 'unsure', label: 'Not sure yet' },
]

function getStoredPoll() {
  if (typeof window === 'undefined') return null
  try {
    return JSON.parse(localStorage.getItem(POLL_KEY))
  } catch {
    return null
  }
}

function setStoredPoll(data) {
  if (typeof window === 'undefined') return
  localStorage.setItem(POLL_KEY, JSON.stringify(data))
}

export default function ReaderPoll() {
  const [votes, setVotes] = useState(() => {
    const stored = getStoredPoll()
    return stored?.votes ?? { yes: 0, maybe: 0, no: 0, unsure: 0 }
  })
  const [userVote, setUserVote] = useState(null)
  const [mounted, setMounted] = useState(false)

  // hydrate from localStorage on mount
  useEffect(() => {
    const stored = getStoredPoll()
    if (stored) {
      setVotes(stored.votes)
      setUserVote(stored.userVote ?? null)
    }
    setMounted(true)
  }, [])

  const total = Object.values(votes).reduce((a, b) => a + b, 0)

  function handleVote(optionId) {
    if (userVote) return // already voted
    const next = { ...votes, [optionId]: votes[optionId] + 1 }
    setVotes(next)
    setUserVote(optionId)
    setStoredPoll({ votes: next, userVote: optionId })
  }

  if (!mounted) {
    // SSR / hydration placeholder
    return (
      <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg p-6 my-6 text-light-text dark:text-dark-text">
        <p className="font-semibold mb-3">{QUESTION}</p>
        <div className="space-y-2">
          {OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className="h-10 rounded-lg bg-light-accent/10 dark:bg-dark-accent/10 animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg p-6 my-6 text-light-text dark:text-dark-text">
      <p className="text-base font-semibold text-light-text-dark dark:text-dark-text mb-1">
        Quick poll TODO: Connect this to an API route or third-party service when ready.
      </p>
      <p className="text-sm mb-4">{QUESTION}</p>

      <div className="space-y-2">
        {OPTIONS.map((opt) => {
          const count = votes[opt.id]
          const pct = total > 0 ? (count / total) * 100 : 0
          const isSelected = userVote === opt.id

          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={!!userVote}
              className={`relative w-full text-left rounded-lg px-4 py-2.5 text-sm transition-all overflow-hidden
                ${userVote
                  ? 'cursor-default'
                  : 'cursor-pointer hover:border-light-accent dark:hover:border-dark-accent'
                }
                border ${isSelected
                  ? 'border-light-accent dark:border-dark-accent'
                  : 'border-light-border dark:border-dark-border'
                }
              `}
            >
              {/* progress fill */}
              {userVote && (
                <span
                  className="absolute inset-y-0 left-0 bg-light-accent/15 dark:bg-dark-accent/15 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              )}
              <span className="relative flex items-center justify-between gap-2">
                <span>{opt.label}</span>
                {userVote && (
                  <span className="text-xs font-medium text-light-accent dark:text-dark-accent whitespace-nowrap">
                    {pct.toFixed(0)}%
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>

      {userVote && (
        <p className="text-xs mt-3 text-light-text dark:text-dark-text">
          Thanks for voting! {total} {total === 1 ? 'response' : 'responses'} so far.
        </p>
      )}
    </div>
  )
}
