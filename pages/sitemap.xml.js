import { getAllPosts } from '../lib/posts'

function generateSiteMap(posts) {
  const siteUrl = 'https://tmaltizo.github.io/portfolio'
  
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${siteUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${siteUrl}/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${siteUrl}/writing</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
      ${posts
        .map(
          (post) => `
        <url>
          <loc>${siteUrl}/writing/${post.slug}</loc>
          <lastmod>${new Date(post.date).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>`
        )
        .join('')}
    </urlset>`
}

export async function getServerSideProps({ res }) {
  const posts = getAllPosts()
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default function Sitemap() {
  // This component is never actually rendered
  return null
}
