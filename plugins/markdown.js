module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 728,
              showCaptions: ['alt', 'title'],
              markdownCaptions: true,
              linkImagesToOriginal: false
            }
          },
          `gatsby-remark-embedder`,
          `gatsby-remark-copy-linked-files`,
          'gatsby-remark-responsive-iframe',
          `gatsby-remark-prismjs`
        ]
      }
    },
    {
      resolve: `gatsby-remark-prismjs`,
      options: {
        // Class prefix for <pre> tags containing syntax highlighting;
        // defaults to 'language-' (eg <pre class="language-js">).
        classPrefix: 'language-',
        // This is used to allow setting a language for inline code
        // (i.e. single backticks) by creating a separator.
        inlineCodeMarker: null,
        aliases: {},
        showLineNumbers: false,
        noInlineHighlight: false,
        languageExtensions: [],
        prompt: {
          user: 'root',
          host: 'localhost',
          global: false
        }
      }
    }
  ]
};
