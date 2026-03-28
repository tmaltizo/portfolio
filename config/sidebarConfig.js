/**
 * Sidebar configuration for different pages and routes.
 * This centralizes all sidebar navigation configurations to make the system scalable.
 */

import {
  TbBrandReact,
  TbCoins,
  TbInfoCircle,
  TbStar,
  TbBuildingBank,
  TbChartBar,
  TbAlertTriangle,
  TbThumbUp,
  TbTable,
  TbHelpCircle,
  TbVideo,
  TbSettings,
  TbBulb,
  TbBug,
  TbTrophy,
  TbBrain,
} from 'react-icons/tb'
import {
  AiOutlineMail,
} from 'react-icons/ai'

export const SIDEBAR_CONFIGS = {
  // Home page configuration
  '/': {
    sections: ['home'],
    scrollSpy: true,
  },

  // About page configuration
  '/about': {
    sections: [
      { to: 'toolkit', icon: <TbBrandReact />, title: 'Toolkit' },
      { to: 'connect', icon: <AiOutlineMail />, title: 'Connect' },
    ],
    scrollSpy: true,
  },

  // Robinhood Gold Card article configuration
  '/writing/robinhood-gold-card': {
    sections: [
      { to: 'the-margin-hack-how-i-delete-most-of-the-50-fee', icon: <TbCoins />, title: 'Margin Hack' },
      { to: 'but-first-why-the-robinhood-gold-card', icon: <TbInfoCircle />, title: 'Why Robinhood?' },
      { to: 'the-rewards-are-genuinely-good', icon: <TbStar />, title: 'Rewards' },
      { to: 'ira-transfers--roth-stacking', icon: <TbBuildingBank />, title: 'IRA Match' },
      { to: 'quantifying-the-advantage-against-2-cards', icon: <TbChartBar />, title: 'vs 2% Cards' },
      { to: 'things-to-watch-out-for', icon: <TbAlertTriangle />, title: 'Watch Outs' },
      { to: 'my-verdict', icon: <TbThumbUp />, title: 'Verdict' },
      { to: 'competitive-scoreboard', icon: <TbTable />, title: 'Scoreboard' },
      { to: 'is-the-robinhood-gold-card-a-trap-frequently-asked-questions', icon: <TbHelpCircle />, title: 'FAQ' },
    ],
    scrollSpy: true,
  },

  // Making AI Youtube Short article configuration
  '/writing/robinhood-gold-ai-analysis': {
    sections: [
      { to: 'the-ai-stack', icon: <TbBrain />, title: 'AI Stack' },
      { to: 'the-process', icon: <TbSettings />, title: 'Process' },
      { to: 'technical-challenges', icon: <TbBug />, title: 'Challenges' },
      { to: 'the-results', icon: <TbTrophy />, title: 'Results' },
      { to: 'the-bigger-picture', icon: <TbVideo />, title: 'Bigger Picture' },
    ],
    scrollSpy: true,
  },

  // Chase Sapphire Preferred article configuration
  '/writing/chase-sapphire-preferred': {
    sections: [
      { to: 'the-real-value-ultimate-rewards-transfer-partners', icon: <TbCoins />, title: 'Transfer Value' },
      { to: 'but-first-why-the-chase-sapphire-preferred', icon: <TbInfoCircle />, title: 'Why CSP?' },
      { to: 'the-rewards-structure-is-actually-brilliant', icon: <TbStar />, title: 'Rewards' },
      { to: 'the-60000-point-welcome-bonus', icon: <TbBuildingBank />, title: 'Welcome Bonus' },
      { to: 'quantifying-the-advantage-against-competitors', icon: <TbChartBar />, title: 'vs Competitors' },
      { to: 'things-to-watch-out-for', icon: <TbAlertTriangle />, title: 'Watch Outs' },
      { to: 'my-verdict', icon: <TbThumbUp />, title: 'Verdict' },
      { to: 'competitive-scoreboard', icon: <TbTable />, title: 'Scoreboard' },
      { to: 'is-the-chase-sapphire-preferred-a-trap-frequently-asked-questions', icon: <TbHelpCircle />, title: 'FAQ' },
    ],
    scrollSpy: true,
  },

  // Default configuration for other pages
  default: {
    sections: [],
    scrollSpy: false,
  },
}

/**
 * Get sidebar configuration for a given path
 * @param {string} path - The current route path
 * @returns {Object} The sidebar configuration
 */
export function getSidebarConfig(path) {
  return SIDEBAR_CONFIGS[path] || SIDEBAR_CONFIGS.default
}

/**
 * Get section IDs for scroll spy from configuration
 * @param {Object} config - Sidebar configuration
 * @returns {Array} Array of section IDs
 */
export function getSectionIds(config) {
  if (!config.sections || !Array.isArray(config.sections)) return []
  
  return config.sections.map(section => {
    if (typeof section === 'string') return section
    return section.to
  })
}
