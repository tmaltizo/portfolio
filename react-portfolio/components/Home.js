import Image from 'next/image'
import Head from 'next/head'
import {
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import {
  FaJava,
  FaPython,
  FaReact,
  FaRobot,
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
  TbBrandGithub,
  TbBrandTailwind,
} from "react-icons/tb";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-scroll";
import portrait from "public/portrait.jpg";
import realportrait from "public/realportrait.jpg";
import Contact from 'components/Contact.js'

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Portfolio</title>
        <meta name="Portfolio" content="trizothethird&apos;s personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white px-10 dark:bg-gray-900">
        <div className="min-h-screen 2xl:mx-60">

          {/* navbar implement scroll */}
          <nav id="home" className="pt-10 pr-10 pl-10 flex justify-between dark:text-white">
            <h1 className="text-xl font-mono">trizothethird</h1>
            <ul className="lg:flex items-center invisible lg:visible">
              <li>
                <a href="https://blp25.290028062.repl.co/" className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400">
                  Return
                </a>
              </li>
              <li>
                <Link activeClass="active" smooth spy to="home" className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400">
                  Home
                </Link>
              </li>
              <li>
                <Link activeClass="active" smooth spy to="toolkit" className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400">
                  Toolkit
                </Link>
              </li>
              <li>
                <Link activeClass="active" smooth spy to="about" className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400">
                  About
                </Link>
              </li>
              <li>
                <Link activeClass="active" smooth spy to="connect" className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400">
                  Connect
                </Link>
              </li>
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl hover:text-gray-400"
                />
              </li>
            </ul>
          </nav>

          {/* home */}
          <section className="text-center pb-10 pr-10 pl-10 mt-35 mb-60">
            <div className="animate-bounce mx-auto bg-gradient-to-b from-purple-500 rounded-full w-60 h-60 relative overflow-hidden mt-40 mb-5">
              <Image src={portrait} alt="Picture of the author" />
            </div>
            <h2 className="text-4xl py-2 text-purple-800 font-medium dark:text-purple-500 md:text-5xl">Hello! <span className="dark:text-purple-200 text-purple-400">I&apos;m Tristan.</span> 👋</h2>
            <h3 className="text-2xl py-2 text-purple-800 dark:text-purple-300 md:text-3xl">A multi-fauceted coding professional with a passion for creating cool web designs 🖥️ and cultivating innovation 💡</h3>
            <p className="text-2xl py-2 text-purple-800 dark:text-purple-200 md:text-2xl">I currently work with the Cybersecurity team at <span className="dark:text-yellow-100 text-yellow-500">Synchrony</span>!</p>
          </section>

          {/* toolkit */}
          <section id="toolkit" className="text-center pb-10 pr-10 pl-10 my-10">
            <h2 className="text-4xl py-2 text-purple-800 font-medium dark:text-purple-500 md:text-4xl my-10">My <span className="dark:text-purple-200 text-purple-400">Toolkit</span> 🛠️</h2>
            <div className="text-9xl flex justify-center gap-16 py-3 text-gray-600 dark:text-purple-300 m-30">
              <ul className="flex flex-wrap items-center">
                <li><FaReact /><div className="text-5xl my-3">React</div></li>
                <li><TbBrandHtml5 /><div className="text-5xl my-3">HTML</div></li>
                <li><TbBrandCss3 /><div className="text-5xl my-3">CSS</div></li>
                <li><IoLogoJavascript /><div className="text-5xl my-3">Javascript</div></li>
                <li><TbBrandCpp /><div className="text-5xl my-3">C/C++</div></li>
                <li><FaJava /><div className="text-5xl my-3">Java</div></li>
                <li><FaPython /><div className="text-5xl my-3">Python</div></li>
                <li><TbSql /><div className="text-5xl my-3">SQLite</div></li>
                <li><TbBrandFirebase /><div className="text-5xl my-3">Firebase</div></li>
                <li><TbBrandGithub /><div className="text-5xl my-3">Git</div></li>
                <li><TbBrandTailwind /><div className="text-5xl my-3">Tailwind</div></li>
                <li><FaRobot /><div className="text-5xl my-3">Automation</div></li>
              </ul>
            </div>
          </section>

          {/* about */}
          <section id="about" className="text-center pb-10 pr-10 pl-10 my-10">
            <h2 className="text-4xl py-2 text-purple-800 font-medium dark:text-purple-500 md:text-4xl my-10">About <span className="dark:text-purple-200 text-purple-400">Me</span> 😎</h2>
            <div className="mx-auto bg-gradient-to-b from-purple-500 rounded-full w-60 h-60 relative overflow-hidden mb-5">
              <Image src={realportrait} alt="Picture of the author" />
            </div>
            <p className="text-2xl py-1 text-purple-800 dark:text-purple-200 md:text-2xl">I graduated in May 2023 from <span className="dark:text-purple-500 text-purple-800">The University of Illinois at Chicago</span> with a Bachelor of Science in Computer Science. </p>
            <p className="text-2xl py-1 text-purple-800 dark:text-purple-200 md:text-2xl"><span className="dark:text-purple-500 text-purple-800">Values:</span> Leadership, Communication, Visibility.</p>
            <p className="text-2xl py-1 text-purple-800 dark:text-purple-200 md:text-2xl"><span className="dark:text-purple-500 text-purple-800">Hobbies:</span> Videogames 🎮, Skateboarding 🛹, Traveling ✈️</p>
            <p className="text-2xl py-1 text-purple-800 dark:text-purple-200 md:text-2xl"><span className="dark:text-purple-500 text-purple-800">Fun Facts:</span></p>
            <p className="text-2xl py-1 text-purple-800 dark:text-purple-200 md:text-2xl">1. I was a high school marching band section leader 🎷</p> 
            <p className="text-2xl py-1 text-purple-800 dark:text-purple-200 md:text-2xl">2. I taught cooking courses on zoom during quarantine 🍳</p> 
            <p className="text-2xl py-1 text-purple-800 dark:text-purple-200 md:text-2xl">3. I went to a Miss Universe beauty pageant 💃</p> 
          </section>

          {/* connect */}
          <section id="connect" className="text-center pb-10 pr-10 pl-10 mt-10">
            <h2 className="text-4xl py-2 text-purple-800 font-medium dark:text-purple-500 md:text-4xl my-10">Let&apos;s <span className="dark:text-purple-200 text-purple-400">Connect</span> 📞</h2>
            <p className="text-2xl py-2 text-purple-800 dark:text-purple-200 md:text-2xl">Thanks for visiting my website! If you would like to know more about me or my work, feel free to send me a message below. You can also explore my LinkedIn and Github. See you again!</p>
            <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-400">
              <a href="https://www.linkedin.com/in/tristan-maltizo/" target="_blank" className="hover:cursor-pointer hover:dark:text-gray-100 hover:text-black"><AiFillLinkedin /></a>
              <a href="https://github.com/maltizo2/portfolio" target="_blank" className="hover:cursor-pointer hover:dark:text-gray-100 hover:text-black"><AiFillGithub /></a>
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