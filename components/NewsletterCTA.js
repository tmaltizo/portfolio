'use client'

import { useState } from 'react'

/**
 * NewsletterCTA — A "1-minute weekly tip" email capture.
 *
 * Stores sign-ups in Firebase Firestore with duplicate prevention.
 * Integrates with the newsletter API route for persistent storage.
 *
 * Embedded in MDX posts via <NewsletterCTA />.
 */
export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return

    setStatus('sending')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        // Handle specific error messages
        if (response.status === 409) {
          setStatus('error')
          // You could set a specific error message here if needed
        } else {
          setStatus('error')
        }
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus('error')
    }
  }

  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg p-6 my-8 text-light-text dark:text-dark-text">
      <h4 className="text-base font-semibold text-light-text-dark dark:text-dark-text mb-1">
        Like this kind of breakdown?
      </h4>
      <p className="text-sm mb-4">
        Sign up for updates — no spam, no affiliate fluff, just helpful notes like what you just read above.
      </p>

      {status === 'success' ? (
        <p className="text-sm font-medium text-green-700 dark:text-green-400">
          You&apos;re in! Check your inbox for a welcome note.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg px-4 py-2 text-sm text-light-text-dark dark:text-dark-text placeholder:text-light-text/50 dark:placeholder:text-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-lg bg-light-accent dark:bg-dark-accent px-5 py-2 text-sm font-medium text-white dark:text-dark-bg transition-colors hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover disabled:opacity-60"
          >
            {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-2">
          Something went wrong — try again in a moment.
        </p>
      )}
    </div>
  )
}
