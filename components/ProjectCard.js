// components/ProjectCard.js
// Individual project card component for the projects showcase

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  TbBrandGithub,
  TbExternalLink,
  TbCode,
  TbWorld,
  TbCalendar,
  TbClock,
  TbChevronDown,
  TbChevronUp,
} from 'react-icons/tb'

export default function ProjectCard({ project }) {
  const [showAllTech, setShowAllTech] = useState(false)
  
  const {
    id,
    title,
    description,
    image,
    technologies,
    category,
    status,
    lastUpdated,
    liveUrl,
    githubUrl,
    featured,
  } = project

  const techLimit = 6
  const displayedTech = showAllTech ? technologies : technologies.slice(0, techLimit)
  const hasMoreTech = technologies.length > techLimit

  const statusColors = {
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Archived': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="group bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg border border-light-border dark:border-dark-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-light-accent dark:hover:border-dark-accent">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-light-bg dark:bg-dark-bg">
        {image ? (
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-light-accent/20 to-light-accent/5 dark:from-dark-accent/20 dark:to-dark-accent/5">
            <TbCode className="w-12 h-12 text-light-accent dark:text-dark-accent" />
          </div>
        )}
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-light-accent text-white dark:bg-dark-accent">
              Featured
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || statusColors['Archived']}`}>
            {status}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-light-text-dark dark:text-dark-text mb-2 group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-light-text dark:text-dark-text mb-2">
            {description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {displayedTech.map((tech) => (
              <span
                key={tech}
                className="inline-block px-2 py-1 text-xs font-medium rounded bg-light-accent/10 text-light-accent dark:bg-dark-accent/10 dark:text-dark-accent"
              >
                {tech}
              </span>
            ))}
            {hasMoreTech && (
              <button
                onClick={() => setShowAllTech(!showAllTech)}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded bg-light-accent/10 text-light-accent dark:bg-dark-accent/10 dark:text-dark-accent hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 transition-colors cursor-pointer"
              >
                {showAllTech ? (
                  <>
                    <TbChevronUp className="w-3 h-3" />
                    Show less
                  </>
                ) : (
                  <>
                    <TbChevronDown className="w-3 h-3" />
                    +{technologies.length - techLimit} more
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary mb-4">
          <span className="flex items-center gap-1">
            <TbCalendar className="w-3 h-3" />
            Updated {formatDate(lastUpdated)}
          </span>
          <span className="px-2 py-1 bg-light-bg dark:bg-dark-bg rounded">
            {category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg hover:border-light-accent dark:hover:border-dark-accent hover:text-light-accent dark:hover:text-dark-accent transition-colors"
            >
              <TbBrandGithub className="w-4 h-4" />
              Code
            </Link>
          )}
          
          {liveUrl ? (
            <Link
              href={liveUrl}
              target={liveUrl.startsWith('http') ? '_blank' : '_self'}
              rel={liveUrl.startsWith('http') ? 'noopener noreferrer' : ''}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-light-accent dark:border-dark-accent text-light-text-dark dark:text-dark-text bg-light-accent dark:bg-dark-accent hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover transition-colors"
            >
              <TbExternalLink className="w-4 h-4" />
              {liveUrl.startsWith('http') ? 'Live Demo' : 'Link to Article'}
            </Link>
          ) : (
            <div className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary bg-light-bg dark:bg-dark-bg cursor-not-allowed opacity-50">
              <TbWorld className="w-4 h-4" />
              Demo Unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
