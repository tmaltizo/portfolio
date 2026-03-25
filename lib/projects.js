// lib/projects.js
// Project data management

export const projects = [
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js, featuring a blog, project showcase, and contact form.',
    longDescription: 'This portfolio website serves as my digital garden, showcasing my projects, writing, and professional journey. Built with performance and accessibility in mind.',
    image: '/images/web-homepage.png',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Firebase', 'Vercel', 'Github Pages', 'Squarespace Domains', 'MDX'],
    category: 'Web Application',
    status: 'Completed',
    startDate: '2024-01-15',
    lastUpdated: '2026-03-25',
    liveUrl: null,
    githubUrl: 'https://github.com/tmaltizo/portfolio',
    featured: true,
    tags: ['frontend', 'web development', 'portfolio', 'blog']
  },
  {
    id: 'ai-video-generator',
    title: 'AI Video Generator with Google Flow & Whisk',
    description: 'AI-powered video creation tool using Google Flow, Whisk, and ChatGPT Object talk MCP for automated video generation.',
    longDescription: 'An innovative AI video generation project that combines multiple AI technologies including Google Flow for workflow automation, Whisk for image processing, and ChatGPT Object talk MCP for intelligent object manipulation and narration.',
    image: '/images/Whisk_6972fefc3dde358b4174ce4e3d9ba563eg.png',
    technologies: ['Google Flow', 'Whisk', 'ChatGPT', 'MCP', 'AI/ML'],
    category: 'AI Application',
    status: 'Completed',
    startDate: '2024-03-18',
    lastUpdated: '2024-03-25',
    liveUrl: '/writing/robinhood-gold-ai-analysis',
    githubUrl: null,
    featured: true,
    tags: ['ai', 'video generation', 'automation', 'mcp', 'ai/ml']
  }
]

// Get all projects
export function getAllProjects() {
  return projects.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
}

// Get featured projects
export function getFeaturedProjects() {
  return projects.filter(project => project.featured)
}

// Get project by ID
export function getProjectById(id) {
  return projects.find(project => project.id === id) || null
}

// Get projects by category
export function getProjectsByCategory(category) {
  return projects.filter(project => project.category === category)
}

// Get projects by technology
export function getProjectsByTechnology(technology) {
  if (!technology || typeof technology !== 'string') return []
  return projects.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  )
}

// Get all unique categories
export function getCategories() {
  return [...new Set(projects.map(project => project.category))]
}

// Get all unique technologies
export function getTechnologies() {
  return [...new Set(projects.flatMap(project => project.technologies))]
}
