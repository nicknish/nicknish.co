const siteUrl = 'https://nicknish.co';
const userTwitter = '@nickjnish';

module.exports = {
  siteUrl,
  siteTitle: `Nick Nish - Developer & Startup Boy`,
  siteTitleAlt: `Nick Nish's Portfolio and Blog`, // Alternative site title for SEO schema
  siteDescription: `Nick Nish's Portfolio and Blog. Learn about software development, React/JavaScript, product, and business.`,

  /* SEO */
  publisher: 'Nick Nish',
  shortTitle: 'Nick Nish', // App manifest, e.g. Mobile Home Screen
  shareImage: 'logos/share.png', // OpenGraph Default Share Image (recommended: 1200x1200)
  shareImageWidth: 900,
  shareImageHeight: 600,

  author: 'Nick Nish', // RSS author segment and SEO schema
  authorUrl: siteUrl, // Author and publisher schema, can be a social profile or other personal site
  userTwitter,

  // Offline Manifest
  siteLogo: 'logos/logo.png',
  backgroundColor: '#ff8061',
  themeColor: '#ff8061',

  /* Site Navigation */
  github_url: 'https://github.com/nicknish',
  linkedin_url: 'https://linkedin.com/in/nicknish',
  twitter_url: `https://twitter.com/${userTwitter}`,
  resume_url:
    'https://s3-us-west-1.amazonaws.com/nicknish-experiments/resume/nick_nish_resume.pdf'
};
