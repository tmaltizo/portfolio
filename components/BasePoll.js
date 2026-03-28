'use client'

import { useState, useEffect } from 'react'

/**
 * BasePoll — Reusable Firebase-powered poll component.
 *
 * @param {Object} props
 * @param {string} props.pollId - Unique identifier for this poll
 * @param {string} props.question - Poll question text
 * @param {Array} props.options - Array of {id, label} objects
 */

function getSessionVote(pollId) {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(`${pollId}-user-vote`)
  } catch {
    return null
  }
}

function setSessionVote(pollId, optionId) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(`${pollId}-user-vote`, optionId)
  } catch {
    // Ignore localStorage errors
  }
}

export default function BasePoll({ pollId, question, options }) {
  const [votes, setVotes] = useState({})
  const [userVote, setUserVote] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  // Initialize votes object with all options set to 0
  const initialVotes = {}
  options.forEach(opt => {
    initialVotes[opt.id] = 0
  })

  // Fetch poll results from Firebase on mount
  useEffect(() => {
    const storedVote = getSessionVote(pollId)
    if (storedVote) {
      setUserVote(storedVote)
    }
    
    async function fetchPollResults() {
      try {
        const response = await fetch(`/api/poll-results?pollId=${pollId}`)
        if (response.ok) {
          const data = await response.json()
          const voteCounts = {}
          Object.keys(data.options).forEach(key => {
            voteCounts[key] = data.options[key].votes || 0
          })
          setVotes(voteCounts)
        }
      } catch (error) {
        console.error('Failed to fetch poll results:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPollResults()
    setMounted(true)
  }, [pollId])

  const total = Object.values(votes).reduce((a, b) => a + b, 0)

  async function fetchAndShowResults(votedOptionId) {
    try {
      const response = await fetch(`/api/poll-results?pollId=${pollId}`)
      if (response.ok) {
        const data = await response.json()
        const voteCounts = {}
        Object.keys(data.options).forEach(key => {
          voteCounts[key] = data.options[key].votes || 0
        })
        setVotes(voteCounts)
      }
    } catch (error) {
      console.error('Failed to fetch poll results:', error)
    }
    setUserVote(votedOptionId)
    setSessionVote(pollId, votedOptionId)
  }

  async function handleVote(optionId) {
    if (userVote) return // already voted

    setLoading(true)
    try {
      const response = await fetch('/api/poll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pollId, optionId, question, options }),
      })

      if (response.ok) {
        const data = await response.json()
        const voteCounts = {}
        Object.keys(data.data.options).forEach(key => {
          voteCounts[key] = data.data.options[key].votes || 0
        })
        setVotes(voteCounts)
        setUserVote(optionId)
        setSessionVote(pollId, optionId)
      } else if (response.status === 409 || response.status === 429) {
        // Already voted or rate limited — fetch current results and show them
        await fetchAndShowResults(optionId)
      }
    } catch (error) {
      console.error('Failed to submit vote:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted || loading) {
    // SSR / loading placeholder
    return (
      <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg p-6 my-6 text-light-text dark:text-dark-text">
        <p className="font-semibold mb-3">{question}</p>
        <div className="space-y-2">
          {options.map((opt) => (
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
        Quick poll
      </p>
      <p className="text-sm mb-4">{question}</p>

      <div className="space-y-2">
        {options.map((opt) => {
          const count = votes[opt.id] || 0
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
