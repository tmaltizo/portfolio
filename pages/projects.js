// pages/projects.js
// Projects showcase page with SEO optimization and project cards

import Head from 'next/head'
import Link from 'next/link'
import { getAllProjects, getFeaturedProjects, getCategories, getTechnologies } from '../lib/projects'
import ProjectCard from '../components/ProjectCard'
import {
  TbFilter,
  TbGridDots,
  TbList,
  TbSearch,
  TbCode,
  TbRocket,
} from 'react-icons/tb'

export default function ProjectsPage({ projects, featuredProjects, categories, technologies }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tmaltizo.github.io/portfolio'
  const cleanSiteUrl = siteUrl.replace(/\/$/, '')
  const pageUrl = `${cleanSiteUrl}/projects`
  
  // SEO keywords based on technologies and categories
  const keywords = [
    'Tristan Maltizo projects',
    'software development portfolio',
    'web development projects',
    'full stack projects',
    ...technologies.map(tech => `${tech} projects`),
    ...categories.map(cat => `${cat.toLowerCase()} projects`),
    'React projects',
    'Next.js projects',
    'Python projects',
    'API development',
    'portfolio showcase',
  ].join(', ')

  return (
    <>
      <Head>
        <title>Projects | Tristan Maltizo&apos;s Portfolio</title>
        <meta name="description" content="Explore Tristan Maltizo&apos;s software development projects including web applications, APIs, CLI tools, and more. Built with modern technologies like React, Next.js, Python, and more." />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Projects | Tristan Maltizo&apos;s Portfolio" />
        <meta property="og:description" content="Explore my software development projects including web applications, APIs, CLI tools, and more." />
        <meta property="og:image" content={`${cleanSiteUrl}/images/projects-showcase.png`} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Tristan Maltizo&apos;s Portfolio" />
        <meta name="twitter:description" content="Explore my software development projects including web applications, APIs, CLI tools, and more." />
        <meta name="twitter:image" content={`${cleanSiteUrl}/images/projects-showcase.png`} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Projects | Tristan Maltizo's Portfolio",
              "description": "Explore Tristan Maltizo's software development projects including web applications, APIs, CLI tools, and more.",
              "url": pageUrl,
              "image": `${cleanSiteUrl}/images/projects-showcase.png`,
              "author": {
                "@type": "Person",
                "name": "Tristan Maltizo",
                "url": cleanSiteUrl
              },
              "publisher": {
                "@type": "Person",
                "name": "Tristan Maltizo"
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": projects.map((project, index) => ({
                  "@type": "SoftwareApplication",
                  "position": index + 1,
                  "name": project.title,
                  "description": project.description,
                  "applicationCategory": project.category,
                  "operatingSystem": "Web",
                  "offers": project.liveUrl ? {
                    "@type": "Offer",
                    "url": project.liveUrl
                  } : undefined,
                  "downloadUrl": project.githubUrl,
                  "dateModified": project.lastUpdated,
                  "keywords": project.technologies.join(', ')
                }))
              },
              "keywords": keywords
            })
          }}
        />
      </Head>

      <main className="bg-light-bg dark:bg-dark-bg min-h-screen mr-10 sm:mr-8 px-0 sm:px-4 md:px-8 py-4 sm:py-12 text-light-text dark:text-dark-text overflow-x-hidden">
        <div className="max-w-7xl mx-auto pl-8 sm:pl-8">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TbCode className="w-8 h-8 text-light-accent dark:text-dark-accent mr-3" />
              <h1 className="text-3xl md:text-4xl font-medium text-light-text-dark dark:text-dark-text">
                <span className="text-light-accent dark:text-dark-accent">Projects</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-light-text dark:text-dark-text max-w-3xl mx-auto leading-relaxed">
              Explore my software development projects, from web applications to CLI tools. 
              Each project showcases different technologies and approaches to solving real-world problems.
            </p>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-4 text-center border border-light-border dark:border-dark-border">
              <div className="text-2xl font-bold text-light-accent dark:text-dark-accent">{projects.length}</div>
              <div className="text-sm text-light-text dark:text-dark-text">Total Projects</div>
            </div>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-4 text-center border border-light-border dark:border-dark-border">
              <div className="text-2xl font-bold text-light-accent dark:text-dark-accent">{featuredProjects.length}</div>
              <div className="text-sm text-light-text dark:text-dark-text">Featured</div>
            </div>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-4 text-center border border-light-border dark:border-dark-border">
              <div className="text-2xl font-bold text-light-accent dark:text-dark-accent">{technologies.length}</div>
              <div className="text-sm text-light-text dark:text-dark-text">Technologies</div>
            </div>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-4 text-center border border-light-border dark:border-dark-border">
              <div className="text-2xl font-bold text-light-accent dark:text-dark-accent">{categories.length}</div>
              <div className="text-sm text-light-text dark:text-dark-text">Categories</div>
            </div>
          </div>

          {/* Featured Projects Section */}
          {featuredProjects.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <TbRocket className="w-5 h-5 text-light-accent dark:text-dark-accent mr-2" />
                <h2 className="text-2xl font-semibold text-light-text-dark dark:text-dark-text">
                  Featured Projects
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* All Projects Section */}
          <section>
            <div className="flex items-center mb-6">
              <TbGridDots className="w-5 h-5 text-light-accent dark:text-dark-accent mr-2" />
              <h2 className="text-2xl font-semibold text-light-text-dark dark:text-dark-text">
                All Projects
              </h2>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Empty State */}
            {projects.length === 0 && (
              <div className="text-center py-12">
                <TbCode className="w-12 h-12 text-light-accent dark:text-dark-accent mx-auto mb-4" />
                <h3 className="text-xl font-medium text-light-text-dark dark:text-dark-text mb-2">
                  No projects yet
                </h3>
                <p className="text-light-text dark:text-dark-text">
                  Check back soon for new projects and updates!
                </p>
              </div>
            )}
          </section>

          {/* Call to Action */}
          <section className="mt-16 text-center">
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-8 border border-light-border dark:border-dark-border">
              <h3 className="text-xl font-semibold text-light-text-dark dark:text-dark-text mb-3">
                Interested in collaborating?
              </h3>
              <p className="text-light-text dark:text-dark-text mb-6 max-w-2xl mx-auto">
                I&apos;m always open to discussing new opportunities, creative ideas, or potential partnerships. 
                Feel free to reach out if you&apos;d like to collaborate on a project or just chat about technology.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover transition-colors"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text rounded-lg hover:border-light-accent dark:hover:border-dark-accent hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                >
                  Learn More About Me
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

// Static data fetching
export async function getStaticProps() {
  const projects = getAllProjects()
  const featuredProjects = getFeaturedProjects()
  const categories = getCategories()
  const technologies = getTechnologies()

  return {
    props: {
      projects,
      featuredProjects,
      categories,
      technologies,
    },
  }
}
