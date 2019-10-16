import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

interface SEOPagePropTypes {
  title?: string;
}

interface SEOPostPropTypes {
  title: string;
  excerpt: string;
  publishedDate: string;
}

export enum SEOTypes {
  page = 'page',
  post = 'post'
}

export interface SEOPropTypes {
  path: string;
  type: SEOTypes;
  content: SEOPagePropTypes | SEOPostPropTypes;
}

const getPageUrl = ({ siteUrl, path }) => {
  return path ? `${siteUrl}${path}/` : siteUrl;
};

const getPageTitle = ({ post, page, siteTitle, shortTitle }) => {
  if (page && page.title) return `${page.title} - ${shortTitle}`;
  if (post && post.title) return `${post.title} - ${shortTitle}`;
  return siteTitle;
};

const getPageDescription = ({ page, post, siteDescription }) => {
  if (page && page.description) return page.description;
  if (post && post.excerpt) return post.excerpt;
  return siteDescription;
};

const getPageImage = ({
  siteUrl,
  shareImage,
  shareImageWidth,
  shareImageHeight
}) => {
  const image = `${siteUrl}/${shareImage}`;
  const imgWidth = shareImageWidth;
  const imgHeight = shareImageHeight;

  // Use Hero Image for OpenGraph
  // if (post.heroImage) {
  //   image = 'https:' + post.heroImage.ogimg.src;
  //   imgWidth = post.heroImage.ogimg.width;
  //   imgHeight = post.heroImage.ogimg.height;
  // }

  return { image, imgWidth, imgHeight };
};

const getStructuredDataSchema = ({
  page,
  post,
  title,
  image,
  imgWidth,
  imgHeight,
  pageUrl,
  siteUrl,
  siteTitle,
  siteTitleAlt,
  author,
  authorUrl,
  publisher
}) => {
  const schema: object[] = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: siteUrl,
      name: siteTitle,
      alternateName: siteTitleAlt
    }
  ];

  if (page) {
    schema.push({
      '@context': 'http://schema.org',
      '@type': 'WebPage',
      url: pageUrl,
      name: title
    });
  }

  // Blog Post Schema
  if (post) {
    schema.push(
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

  return schema;
};

const SEO: React.FC<SEOPropTypes> = ({ type, content, path }) => {
  const page = type === SEOTypes.page ? content : null;
  const post = type === SEOTypes.post ? content : null;

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
          siteMetadata,
          siteMetadata: {
            siteUrl,
            siteTitle,
            siteDescription,
            shareImage,
            shareImageWidth,
            shareImageHeight,
            shortTitle,
            userTwitter
          }
        }
      }) => {
        const pageUrl = getPageUrl({ path, siteUrl });
        const title = getPageTitle({ page, post, siteTitle, shortTitle });
        const description = getPageDescription({ page, post, siteDescription });
        const { image, imgWidth, imgHeight } = getPageImage({
          siteUrl,
          shareImage,
          shareImageWidth,
          shareImageHeight
        });
        const schemaOrgJSONLD = getStructuredDataSchema({
          page,
          post,
          pageUrl,
          title,
          image,
          imgWidth,
          imgHeight,
          ...siteMetadata
        });
        const ogType = post ? 'article' : 'website';

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
            <meta property="og:type" content={ogType} />

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

export default SEO;
