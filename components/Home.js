import Image from 'next/image'
import Head from 'next/head'
import {
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineMail,
} from "react-icons/ai";
import {
  FaJava,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  IoLogoJavascript,
} from "react-icons/io";
import {
  TbBrandCpp,
  TbBrandHtml5,
  TbBrandCss3,
  TbSql,
  TbBrandFirebase,
  TbBrandTailwind,
  TbBrandAws,
  TbBrandGithub,
  TbBrandReact,
  TbSparkles,
  TbChevronRight,
} from "react-icons/tb";
import { SiTerraform } from "react-icons/si";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-scroll";
import { useDarkMode } from '@/contexts/DarkModeContext'
import portrait from "public/portrait.jpg";
import realportrait from "public/realportrait.jpg";
import Contact from 'components/Contact.js'

export default function Home() {
  const { isDark: darkMode, toggleDark } = useDarkMode()

  return (
    <div>
      <Head>
        <title>trizothethird&apos;s Portfolio</title>
        <meta name="description" content="Tristan Maltizo&apos;s personal portfolio and digital garden" />
        <meta name="Portfolio" content="trizothethird&apos;s personal website" />
        <link rel="icon" href="/portrait-transparent.png" />
        {/* optionally add other favicons/og tags */}
        <meta property="og:title" content="trizothethird&apos;s Portfolio" />
        <meta property="og:description" content="A multi-faceted software professional and digital garden" />
        <meta property="og:image" content="/portrait.jpg" />
      </Head>
      <main className="bg-light-bg dark:bg-dark-bg pt-8 px-10 pr-12 sm:pr-20 text-light-text dark:text-dark-text">
          {/* site header */}
          <header id="home" className="text-center sm:text-left mb-4 w-full">
            <h1 className="font-mono text-base md:text-lg lg:text-xl">
              trizothethird
            </h1>
          </header>
        <div className="min-h-screen 2xl:mx-60">

          {/* minimal icon sidebar */}
          <nav className="fixed top-0 right-0 h-screen w-10 sm:w-12 flex flex-col items-center p-2 bg-light-bg bg-opacity-40 dark:bg-dark-bg dark:bg-opacity-40 backdrop-blur z-50">
            {/* toggle at top */}
            <button
              aria-label="toggle dark mode"
              onClick={toggleDark}
              className="mt-2 text-lg sm:text-xl text-light-accent dark:text-dark-accent hover:scale-110 transition"
            >
              <BsFillMoonStarsFill />
            </button>

            {/* centred icon links */}
            <div className="mt-auto mb-auto flex flex-col items-center space-y-6">
              <Link to="home" smooth title="Welcome" className="text-lg sm:text-xl hover:scale-110 transition">
                <AiOutlineHome />
                <span className="sr-only">Welcome</span>
              </Link>
              <Link to="about" smooth title="About" className="text-lg sm:text-xl hover:scale-110 transition">
                <AiOutlineInfoCircle />
                <span className="sr-only">About</span>
              </Link>
              <Link to="toolkit" smooth title="Toolkit" className="text-lg sm:text-xl hover:scale-110 transition">
                <TbBrandReact />
                <span className="sr-only">Toolkit</span>
              </Link>
              <Link to="connect" smooth title="Connect" className="text-lg sm:text-xl hover:scale-110 transition">
                <AiOutlineMail />
                <span className="sr-only">Connect</span>
              </Link>
            </div>
          </nav>

          <section className="text-center px-10 mt-0 min-h-screen sm:min-h-0 sm:mb-60 flex flex-col justify-center sm:justify-start pb-20 sm:pb-10">
            <div className="animate-bounce mx-auto bg-gradient-to-b from-light-accent rounded-full w-40 h-40 sm:w-60 sm:h-60 relative overflow-hidden mt-6 sm:mt-40 mb-5">
              <Image src={portrait} alt="Picture of the author" />
            </div>
            <h2 className="text-2xl sm:text-4xl py-2 text-light-text-dark dark:text-dark-text font-medium md:text-5xl">Hello! <span className="text-light-accent dark:text-dark-accent">I&apos;m Tristan.</span> 👋</h2>
            <h3 className="text-lg sm:text-2xl py-2 text-light-text dark:text-dark-text md:text-3xl">A multi-faceted software professional currently working as a Solution Architect at <span className="text-light-accent dark:text-dark-accent">Synchrony</span>!</h3>
          </section>

          {/* about */}
          <section id="about" className="text-center pb-10 pr-10 pl-10 my-10">
            <h2 className="text-3xl sm:text-4xl py-2 text-light-text-dark dark:text-dark-text font-medium md:text-4xl my-10">About <span className="text-light-accent dark:text-dark-accent">Me</span> 😎</h2>
            <div className="mx-auto bg-gradient-to-b from-light-accent rounded-full w-48 h-48 sm:w-60 sm:h-60 relative overflow-hidden mb-5">
              <Image src={realportrait} alt="Picture of the author" />
            </div>
            <p className="text-lg sm:text-2xl py-1 text-light-text dark:text-dark-text md:text-2xl">I graduated from <span className="text-light-text-dark dark:text-dark-text">The University of Illinois at Chicago</span> with a Bachelor of Science in Computer Science. I created this site to serve as my digital garden: here you’ll find a running journal of what I’m learning and building next.</p>
          </section>

          {/* toolkit */}
          <section id="toolkit" className="text-center pb-10 pr-10 pl-10 my-10">
            <h2 className="text-3xl sm:text-4xl py-2 text-light-text-dark dark:text-dark-text font-medium md:text-4xl my-10">My <span className="text-light-accent dark:text-dark-accent">Toolkit</span> 🛠️</h2>
            <div className="text-4xl sm:text-6xl py-3 text-light-accent dark:text-dark-accent m-4 sm:m-10">
              <ul className="grid grid-cols-3 sm:flex flex-wrap items-center justify-around w-full gap-3 sm:gap-6">
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><FaReact /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">React</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><TbBrandHtml5 /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">HTML</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><TbBrandCss3 /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">CSS</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><IoLogoJavascript /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">Javascript</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><TbBrandCpp /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">C/C++</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><FaJava /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">Java</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><FaPython /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">Python</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><TbSql /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">SQLite</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><TbBrandFirebase /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">Firebase</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><TbBrandTailwind /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">Tailwind</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><TbBrandAws /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">AWS</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><SiTerraform /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">Terraform</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><TbChevronRight /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">Splunk</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><TbBrandGithub /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">CI/CD</div></li>
                <li className="flex flex-col items-center min-w-0"><span className="text-3xl sm:text-6xl"><TbSparkles /></span><div className="text-xs sm:text-3xl my-1 leading-tight text-center break-normal w-full">GenAI</div></li>
              </ul>
            </div>
          </section>

          {/* connect */}
          <section id="connect" className="text-center pb-10 pr-10 pl-10 mt-10">
            <h2 className="text-3xl sm:text-4xl py-2 text-light-text-dark dark:text-dark-text font-medium md:text-4xl my-10">Let&apos;s <span className="text-light-accent dark:text-dark-accent">Connect</span> 📞</h2>
            <p className="text-lg sm:text-2xl py-2 text-light-text dark:text-dark-text md:text-2xl">Thanks for visiting my website! If you would like to know more about me or my work, feel free to send me a message below. You can also explore my LinkedIn and Github. See you again!</p>
            <div className="text-4xl sm:text-5xl flex justify-center gap-16 py-3 text-light-accent dark:text-dark-accent">
              <a href="https://www.linkedin.com/in/tristan-maltizo/" target="_blank" className="hover:cursor-pointer hover:text-light-accent-hover dark:hover:text-dark-accent-hover"><AiFillLinkedin /></a>
              <a href="https://github.com/maltizo2/portfolio" target="_blank" className="hover:cursor-pointer hover:text-light-accent-hover dark:hover:text-dark-accent-hover"><AiFillGithub /></a>
            </div>
          </section>

          {/* contact */}
          <Contact />

          {/* handles */}
        </div>
      </main>
    </div>
  );
}
