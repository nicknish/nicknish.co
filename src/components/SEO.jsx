import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const PAGES = {
  WORK: '/work',
  PROJECTS: '/projects',
  BLOG: '/blog'
};

const PAGE_PATH_TITLES_MAP = {
  [PAGES.WORK]: `Work`,
  [PAGES.PROJECTS]: `Projects`,
  [PAGES.BLOG]: `Blog`
};

const SEO = ({ location, isPage, post }) => {
  return (
    <StaticQuery
      query={graphql`
        query SEO {
          site {
            siteMetadata {
              siteUrl
              siteTitle
              siteDescription
              shareImage
              shareImageWidth
              shareImageHeight
              siteTitleAlt
              shortTitle
              author
              authorUrl
              publisher
              userTwitter
            }
          }
        }
      `}
      render={({
        site: {
          siteMetadata: {
            siteUrl,
            siteTitle,
            siteDescription,
            shareImage,
            shareImageWidth,
            shareImageHeight,
            siteTitleAlt,
            shortTitle,
            author,
            authorUrl,
            publisher,
            userTwitter
          }
        }
      }) => {
        const rootLevelPage = PAGE_PATH_TITLES_MAP[location.pathname];
        const pageUrl = location.href || siteUrl;

        let title = rootLevelPage || siteTitle;
        let description = siteDescription;
        let image = `${siteUrl}/${shareImage}`;
        let imgWidth = shareImageWidth;
        let imgHeight = shareImageHeight;

        // Default Website Schema
        const schemaOrgJSONLD = [
          {
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            url: siteUrl,
            name: siteTitle,
            alternateName: siteTitleAlt
          }
        ];

        if (isPage) {
          schemaOrgJSONLD.push({
            '@context': 'http://schema.org',
            '@type': 'WebPage',
            url: pageUrl,
            name: title
          });
        }

        // Blog Post Schema
        if (post) {
          console.log(post);

          // Use Hero Image for OpenGraph
          // if (post.heroImage) {
          //   image = 'https:' + post.heroImage.ogimg.src;
          //   imgWidth = post.heroImage.ogimg.width;
          //   imgHeight = post.heroImage.ogimg.height;
          // }

          title = post.title ? `${post.title} - ${shortTitle}` : title;
          description = post.excerpt || description;

          schemaOrgJSONLD.push(
            {
              '@context': 'http://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@id': siteUrl,
                    name: siteTitle
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@id': pageUrl,
                    name: title
                  }
                }
              ]
            },
            {
              '@context': 'http://schema.org',
              '@type': 'BlogPosting',
              url: pageUrl,
              name: title,
              alternateName: siteTitleAlt,
              headline: title,
              image: {
                '@type': 'ImageObject',
                url: image,
                width: imgWidth,
                height: imgHeight
              },
              author: {
                '@type': 'Person',
                name: author,
                url: authorUrl
              },
              publisher: {
                '@type': 'Organization',
                name: publisher,
                url: siteUrl
              },
              datePublished: post.publishedDate,
              mainEntityOfPage: pageUrl
            }
          );
        }

        return (
          <Helmet>
            {/* General tags */}
            <title>{title}</title>
            <link rel="canonical" href={siteUrl} />
            <meta name="image" content={image} />
            <meta name="description" content={description} />

            {/* Schema.org tags */}
            <script type="application/ld+json">
              {JSON.stringify(schemaOrgJSONLD)}
            </script>

            {/* OpenGraph tags */}
            <meta property="og:title" content={title} />
            {post && <meta property="og:type" content="article" />}

            <meta property="og:url" content={pageUrl} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content={imgWidth} />
            <meta property="og:image:height" content={imgHeight} />
            <meta property="og:description" content={description} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={userTwitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:description" content={description} />
          </Helmet>
        );
      }}
    />
  );
};

export const SEOPropTypes = {
  location: PropTypes.object.isRequired,
  isPage: PropTypes.bool,
  post: PropTypes.shape({
    title: PropTypes.string,
    excerpt: PropTypes.string,
    publishedDate: PropTypes.string
  })
};

SEO.propTypes = SEOPropTypes;

export default SEO;
