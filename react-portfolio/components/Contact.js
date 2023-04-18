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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-xl py-2 text-purple-900 dark:text-purple-200 md:text-2xl">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          required
          className="border rounded-md p-2 w-full text-purple-900"
        />
        <label htmlFor="email" className="text-xl py-2 text-purple-900 dark:text-purple-200 md:text-2xl">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
          className="border rounded-md p-2 w-full text-purple-900"
        />
        <label htmlFor="message" className="text-xl py-2 text-purple-900 dark:text-purple-200 md:text-2xl">Message</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message"
          required
          className="border rounded-md p-2 w-full text-purple-900"
          rows="5"
        />
        {isSent && (
          <p className="text-green-400 mt-2">Email sent successfully. I'll try to reply as soon as possible!</p>
        )}
        <button type="submit" className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 my-3 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400">
          Send
        </button>
      </form>
    )
}