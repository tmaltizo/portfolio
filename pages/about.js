/**
 * About page – accessible at /about.
 *
 * Migrated from the homepage About Me section.
 *
 * @returns {JSX.Element} The About page layout.
 */
import Image from 'next/image'
import realportrait from 'public/realportrait.jpg'
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
  TbSparkles,
  TbChevronRight,
} from "react-icons/tb";
import { SiTerraform } from "react-icons/si";
import {
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import Contact from '@/components/Contact'

export default function AboutPage() {
  return (
    <main className="bg-light-bg dark:bg-dark-bg min-h-screen px-10 py-12 text-light-text dark:text-dark-text text-center flex flex-col items-center space-y-8">
      <h1 className="text-3xl sm:text-4xl font-medium text-light-text-dark dark:text-dark-text">
        About <span className="text-light-accent dark:text-dark-accent">Me</span> 😎
      </h1>
      <div className="mx-auto bg-gradient-to-b from-light-accent rounded-full w-48 h-48 sm:w-60 sm:h-60 relative overflow-hidden">
        <Image src={realportrait} alt="Picture of the author" />
      </div>
      <p className="text-lg sm:text-2xl text-light-text dark:text-dark-text md:text-2xl max-w-3xl mx-auto">
        I graduated from{' '}
        <span className="text-light-text-dark dark:text-dark-text">
          The University of Illinois at Chicago
        </span>{' '}
        with a Bachelor of Science in Computer Science. I created this site to
        serve as my digital garden: here you&apos;ll find a running journal of
        what I&apos;m learning and building next.
      </p>

      {/* moved in from Home.js */}
      <section id="toolkit" className="text-center pr-10 pl-10">
        <h2 className="text-3xl sm:text-4xl py-2 text-light-text-dark dark:text-dark-text font-medium md:text-4xl my-6">My <span className="text-light-accent dark:text-dark-accent">Toolkit</span> 🛠️</h2>
        <div className="text-4xl sm:text-6xl py-3 text-light-accent dark:text-dark-accent m-4 sm:m-10">
          <ul className="grid grid-cols-3 sm:flex flex-wrap items-center justify-around w-full max-w-3xl mx-auto gap-3 sm:gap-6">
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

      <section id="connect" className="text-center pr-10 pl-10">
        <h2 className="text-3xl sm:text-4xl py-2 text-light-text-dark dark:text-dark-text font-medium md:text-4xl m-5">Let&apos;s <span className="text-light-accent dark:text-dark-accent">Connect</span> 📞</h2>
        <p className="text-lg sm:text-2xl mb-4 text-light-text dark:text-dark-text md:text-2xl">Thanks for visiting my website! If you would like to know more about me or my work, feel free to send me a message below. You can also explore my LinkedIn and Github. See you again!</p>
        <div className="text-4xl sm:text-5xl flex justify-center gap-16 py-3 text-light-accent dark:text-dark-accent">
          <a href="https://www.linkedin.com/in/tristan-maltizo/" target="_blank" className="hover:cursor-pointer hover:text-light-accent-hover dark:hover:text-dark-accent-hover"><AiFillLinkedin /></a>
          <a href="https://github.com/tmaltizo" target="_blank" className="hover:cursor-pointer hover:text-light-accent-hover dark:hover:text-dark-accent-hover"><AiFillGithub /></a>
        </div>
      </section>

      {/* contact form moved here and tightened up spacing */}
      <div className="max-w-xl mx-auto py-0 text-left">
        <Contact />
      </div>
    </main>
  )
}
