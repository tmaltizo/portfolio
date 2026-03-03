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
  TbBrandTailwind,
  TbBrandAws,
  TbBrandGithub,
  TbSparkles,
  TbChevronRight,
} from "react-icons/tb";
import { SiTerraform } from "react-icons/si";
import { Link } from "react-scroll";
import portrait from "public/portrait.jpg";

export default function Home() {
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
          <header id="home" className="text-center sm:text-left mb-0 sm:mb-4 w-full">
            <h1 className="font-mono text-base md:text-lg lg:text-xl">
              trizothethird
            </h1>
          </header>
        <div className="min-h-screen 2xl:mx-60">

          <section className="text-center px-10 mt-0 min-h-screen sm:min-h-0 sm:mb-60 flex flex-col justify-center sm:justify-start pb-20 sm:pb-10 -translate-y-8 sm:translate-y-0">
            <div className="animate-bounce mx-auto bg-gradient-to-b from-light-accent rounded-full w-48 h-48 sm:w-60 sm:h-60 relative overflow-hidden mt-0 sm:mt-20 mb-5">
              <Image src={portrait} alt="Picture of the author" />
            </div>
            <h2 className="text-2xl sm:text-4xl py-2 text-light-text-dark dark:text-dark-text font-medium md:text-5xl">Hello! <span className="text-light-accent dark:text-dark-accent">I&apos;m Tristan.</span> 👋</h2>
            <h3 className="text-lg sm:text-2xl py-2 text-light-text dark:text-dark-text md:text-3xl">A multi-faceted software professional currently working as a Solution Architect at <span className="text-light-accent dark:text-dark-accent">Synchrony</span>!</h3>
          </section>


          {/* the homepage now only welcomes visitors; toolkit and connect moved to About page */}

          {/* handles */}
        </div>
      </main>
    </div>
  );
}
