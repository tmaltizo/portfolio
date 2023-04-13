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

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Portfolio</title>
        <meta name="Portfolio" content="trizothethird's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-slate-50 px-10 dark:bg-gray-900">
        <div className="min-h-screen 2xl:mx-60">

          {/* navbar implement scroll */}
          <nav className="pt-10 pr-10 pl-10 flex justify-between dark:text-white">
            <h1 className="text-xl font-mono">trizothethird</h1>
            <ul className="flex items-center">
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
              {/* <li>
                <a className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400" href="#">
                  Toolkit
                </a>
              </li>
              <li>
                <a className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="bg-purple-800 dark:bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-500 dark:hover:bg-purple-400" href="#">
                  Connect
                </a>
              </li> */}
              <li>
                <BsFillMoonStarsFill 
                  onClick={() => setDarkMode(!darkMode)} 
                  className="cursor-pointer text-2xl hover:text-gray-400"
                />
              </li>
            </ul>
          </nav>

          {/* home */}
          <section id="home" className="text-center pb-10 pr-10 pl-10 mt-35 mb-40">
            <div className="mx-auto bg-gradient-to-b from-purple-500 rounded-full w-80 h-80 relative overflow-hidden mt-20 mb-5 md:h-96 md:w-96">
                <Image src={portrait} alt="Picture of the author" />
            </div>
            <h2 className="text-4xl py-2 text-purple-800 font-medium dark:text-purple-500 md:text-5xl">Hello! <span className= "dark:text-purple-200 text-purple-400">I'm Tristan.</span> 👋</h2>
            <h3 className="text-2xl py-2 text-purple-800 dark:text-purple-300 md:text-3xl">A multi-fauceted coding professional with a passion for creating cool web designs 🖥️ and cultivating innovation 💡</h3>
            <p className="text-2xl py-2 text-purple-800 dark:text-purple-200 md:text-2xl">I currently work at <span className= "dark:text-yellow-100 text-yellow-500">Synchrony</span> as a Frontend Developer!</p>
          </section>

          {/* toolkit */}
          <section id="toolkit" className="text-center pb-10 pr-10 pl-10 my-10">
            <h2 className="text-4xl py-2 text-purple-800 font-medium dark:text-purple-500 md:text-4xl my-10">My <span className= "dark:text-purple-200 text-purple-400">Toolkit</span> 🛠️</h2>
            <div className="text-9xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-400 m-30">
                <ul className="flex flex-wrap items-center">
                    <li><FaPython /></li>
                    <li><FaReact /></li>
                    <li><IoLogoJavascript /></li>
                    <li><TbBrandCpp /></li>
                    <li><TbBrandHtml5 /></li>
                    <li><TbBrandCss3 /></li>
                    <li><TbSql /></li>
                    <li><TbBrandFirebase /></li>
                    <li><TbBrandGithub /></li>
                    <li><TbBrandTailwind /></li>   
                </ul>        
            </div>
          </section>

          {/* about */}
          <section id="about" className="text-center pb-10 pr-10 pl-10 my-10">
            <h2 className="text-4xl py-2 text-purple-800 font-medium dark:text-purple-500 md:text-4xl my-10">About <span className= "dark:text-purple-200 text-purple-400">Me</span> 😎</h2>
            <div className="mx-auto bg-gradient-to-b from-purple-500 rounded-full w-80 h-80 relative overflow-hidden mb-5 md:h-96 md:w-96">
                <Image src={realportrait} alt="Picture of the author" />
            </div>
            <p className="text-2xl py-2 text-purple-800 dark:text-purple-200 md:text-2xl">I am graduating from <span className= "dark:text-purple-500 text-purple-800">The University of Illinois at Chicago</span> with a Bachelor of Science in Computer Science. </p>
            <p className="text-2xl py-2 text-purple-800 dark:text-purple-200 md:text-2xl"> Ever since I was a little kid, I have been passionate about Computer Science and its quickly evolving industry. As a CS major, I am always motivated to working with others in fields related to Software Development, Data Science, Machine Learning, and/or Cybersecurity. </p>
          </section>

          {/* connect */}
          <section id="connect" className="text-center pb-10 pr-10 pl-10 my-10">
            <h2 className="text-4xl py-2 text-purple-800 font-medium dark:text-purple-500 md:text-4xl my-10">Let's <span className= "dark:text-purple-200 text-purple-400">Connect</span> 📞</h2>
            <p className="text-2xl py-2 text-purple-800 dark:text-purple-200 md:text-2xl">Thanks for visiting my website! Feel free to explore my handles below. See you again!</p>
          </section>

          {/* handles */}
          <section className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-400">
            <a href="https://www.linkedin.com/in/tristan-maltizo/" target="_blank" className="hover:cursor-pointer hover:text-gray-100"><AiFillLinkedin /></a>
            <a href="https://github.com/maltizo2" target="_blank" className="hover:cursor-pointer hover:text-gray-100"><AiFillGithub /></a> 
          </section>
        </div>
      </main>
    </div>
  );
}