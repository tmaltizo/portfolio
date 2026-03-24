// pages/projects/[id].js
// Individual project detail page — accessible at /projects/[id].
// Structure: imports → helpers → component → export → getStaticPaths → getStaticProps

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectById, getAllProjects } from '../../lib/projects'
import {
  TbBrandGithub,
  TbExternalLink,
  TbCode,
  TbWorld,
  TbCalendar,
  TbClock,
  TbArrowLeft,
} from 'react-icons/tb'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Formats an ISO date string to a human-readable date (e.g. "March 2, 2026").
 * @param {string} isoDate
 * @returns {string}
 */
function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

// Extract YouTube video ID from URL
function getYouTubeVideoId(url) {
  if (!url) return null
  const regex = /(?:youtube\.com\/shorts\/(\w+)|youtu\.be\/(\w+))/
  const match = url.match(regex)
  return match ? (match[1] || match[2]) : null
}

const statusColors = {
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Archived': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ProjectPage — renders a single project with detailed information.
 *
 * @param {{ project: object }} props  Provided by getStaticProps.
 * @returns {JSX.Element}
 */
export default function ProjectPage({ project }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tmaltizo.github.io/portfolio'
  const cleanSiteUrl = siteUrl.replace(/\/$/, '')
  const pageUrl = `${cleanSiteUrl}/projects/${project.id}`
  const ogImage = project.image ? `${cleanSiteUrl}${project.image}` : `${cleanSiteUrl}/images/projects-showcase.png`
  const keywords = [
    ...project.technologies,
    ...project.tags,
    project.category,
    'Tristan Maltizo projects',
    'software development portfolio',
    'web development projects',
  ].filter(Boolean).join(', ')
  
  const shareText = encodeURIComponent(`${project.title} — ${project.description}`)
  const encodedPageUrl = encodeURIComponent(pageUrl)
  const twitterHref = `https://x.com/intent/tweet?text=${shareText}&url=${encodedPageUrl}&via=TristanMaltizo`
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedPageUrl}`

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <>
      <Head>
        <title>{`${project.title} | Projects`}</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": project.title,
              "description": project.description,
              "image": ogImage,
              "applicationCategory": project.category,
              "operatingSystem": "Web",
              "dateModified": project.lastUpdated,
              "author": {
                "@type": "Person",
                "name": "Tristan Maltizo"
              },
              "publisher": {
                "@type": "Person",
                "name": "Tristan Maltizo"
              },
              "url": pageUrl,
              "keywords": keywords,
              "offers": project.liveUrl ? {
                "@type": "Offer",
                "url": project.liveUrl
              } : undefined,
              "downloadUrl": project.githubUrl,
            })
          }}
        />
      </Head>
      
      <main className="bg-light-bg dark:bg-dark-bg min-h-screen mr-10 sm:mr-12 px-0 sm:px-4 md:px-8 py-4 sm:py-12 overflow-x-hidden">
        <div className="max-w-4xl mx-auto pl-8 sm:pl-8">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-light-accent dark:text-dark-accent
              hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-accent
              dark:focus-visible:ring-dark-accent mb-6"
          >
            <TbArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <header className="mb-8">
            {/* YouTube Short Embed */}
            {project.videoUrl && (
              <div className="mb-6">
                <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden border border-light-border dark:border-dark-border">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(project.videoUrl)}`}
                    title={`${project.title} - YouTube Short`}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Status Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status] || statusColors['Archived']}`}>
                {project.status}
              </span>
            </div>

            <p className="text-xs text-light-text dark:text-dark-text mb-2">
              {formatDate(project.lastUpdated)}
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold text-light-text-dark dark:text-dark-text leading-snug mb-4">
              {project.title}
            </h1>
            
            <p className="text-lg text-light-text dark:text-dark-text leading-relaxed mb-6">
              {project.description}
            </p>
            
            {project.longDescription && (
              <p className="text-base text-light-text dark:text-dark-text leading-relaxed mb-6">
                {project.longDescription}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
              <span className="flex items-center gap-1">
                <TbCalendar className="w-4 h-4" />
                Started {formatDate(project.startDate)}
              </span>
              <span className="px-3 py-1 bg-light-bg dark:bg-dark-bg rounded-full border border-light-border dark:border-dark-border">
                {project.category}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg hover:border-light-accent dark:hover:border-dark-accent hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                >
                  <TbBrandGithub className="w-4 h-4" />
                  View Code
                </Link>
              )}
              
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-light-accent dark:border-dark-accent text-light-text-dark dark:text-dark-text bg-light-accent dark:bg-dark-accent hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover transition-colors"
                >
                  <TbExternalLink className="w-4 h-4" />
                  Live Demo
                </Link>
              ) : (
                <div className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary bg-light-bg dark:bg-dark-bg cursor-not-allowed opacity-50">
                  <TbWorld className="w-4 h-4" />
                  Demo Unavailable
                </div>
              )}
            </div>

            {/* Share Buttons */}
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href={twitterHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-light-border dark:border-dark-border px-4 py-2 text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg transition-colors hover:border-light-accent dark:hover:border-dark-accent"
              >
                Share on X
              </a>
              <a
                href={linkedInHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-light-border dark:border-dark-border px-4 py-2 text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg transition-colors hover:border-light-accent dark:hover:border-dark-accent"
              >
                Share on LinkedIn
              </a>
            </div>
          </header>

          {/* Project Image */}
          {project.image && (
            <div className="mb-8">
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden border border-light-border dark:border-dark-border">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Technologies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-light-text-dark dark:text-dark-text mb-4">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-block px-3 py-1 text-sm font-medium rounded bg-light-accent/10 text-light-accent dark:bg-dark-accent/10 dark:text-dark-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-light-text-dark dark:text-dark-text mb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-sm font-medium rounded bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Featured Badge */}
          {project.featured && (
            <div className="mt-8 p-4 bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg border border-light-accent/20 dark:border-dark-accent/20">
              <p className="text-sm text-light-accent dark:text-dark-accent font-medium">
                ⭐ This is a featured project
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

// ─── Static paths ─────────────────────────────────────────────────────────────

export async function getStaticPaths() {
  const projects = getAllProjects()
  const paths = projects.map((project) => ({ params: { id: project.id } }))
  return { paths, fallback: false }
}

// ─── Data fetching ────────────────────────────────────────────────────────────

export async function getStaticProps({ params }) {
  const { id } = params
  const project = getProjectById(id)
  
  if (!project) {
    return { notFound: true }
  }

  return { props: { project } }
}
