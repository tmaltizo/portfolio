/**
 * About page – accessible at /about.
 *
 * Migrated from the homepage About Me section.
 *
 * @returns {JSX.Element} The About page layout.
 */
import Image from 'next/image'
import realportrait from 'public/realportrait.jpg'

export default function AboutPage() {
  return (
    <main className="bg-light-bg dark:bg-dark-bg min-h-screen px-10 py-12 text-light-text dark:text-dark-text text-center">
      <h1 className="text-3xl sm:text-4xl font-medium text-light-text-dark dark:text-dark-text my-10">
        About <span className="text-light-accent dark:text-dark-accent">Me</span> 😎
      </h1>
      <div className="mx-auto bg-gradient-to-b from-light-accent rounded-full w-48 h-48 sm:w-60 sm:h-60 relative overflow-hidden mb-5">
        <Image src={realportrait} alt="Picture of the author" />
      </div>
      <p className="text-lg sm:text-2xl py-1 text-light-text dark:text-dark-text md:text-2xl max-w-3xl mx-auto">
        I graduated from{' '}
        <span className="text-light-text-dark dark:text-dark-text">
          The University of Illinois at Chicago
        </span>{' '}
        with a Bachelor of Science in Computer Science. I created this site to
        serve as my digital garden: here you&apos;ll find a running journal of
        what I&apos;m learning and building next.
      </p>
    </main>
  )
}
