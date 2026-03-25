import { useState } from "react";

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isSent, setIsSent] = useState(false)
  
    const handleNameChange = (event) => {
      setName(event.target.value)
    }
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value)
    }
  
    const handleMessageChange = (event) => {
      setMessage(event.target.value)
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault()
      const data = { name: name, email: email, message: message }
      const response = await fetch('/api/sendgrid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        setIsSent(true)
        setName('')
        setEmail('')
        setMessage('')
      }
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="name" className="text-sm font-medium text-light-text dark:text-dark-text block mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          required
          className="border border-light-border dark:border-dark-border rounded-sm px-3 py-2 w-full text-sm text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent"
        />
        <label htmlFor="email" className="text-sm font-medium text-light-text dark:text-dark-text block mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
          className="border border-light-border dark:border-dark-border rounded-sm px-3 py-2 w-full text-sm text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent"
        />
        <label htmlFor="message" className="text-sm font-medium text-light-text dark:text-dark-text block mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message"
          required
          className="border border-light-border dark:border-dark-border rounded-sm px-3 py-2 w-full text-sm text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg focus:outline-none focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent resize-none"
          rows="4"
        />
        {isSent && (
          <p className="text-sm text-light-accent dark:text-dark-accent mt-2">Email sent successfully. I&apos;ll try to reply as soon as possible!</p>
        )}
        <button type="submit" className="bg-light-accent dark:bg-dark-accent text-white px-4 py-2 rounded-sm text-sm hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover transition-colors">
          Send
        </button>
      </form>
    )
}