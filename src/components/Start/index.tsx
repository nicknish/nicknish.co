import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import get from 'lodash/get';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import NewsletterSignupForm from '../NewsletterSignup/Form';
import {
  createPath,
  BLOG_URL,
  NEWSLETTER_URL,
  NEWSLETTER_ARCHIVE_URL,
} from '../../constants/urls';

import * as styles from './StartHere.module.css';

const StartPopularArticle = ({
  idx,
  length,
  slug,
  title,
  description,
  date,
}) => {
  return (
    <li>
      <Link className={styles.link} to={createPath(BLOG_URL, slug)}>
        {title}
      </Link>
    </li>
  );
};

const StartHereSection = () => (
  <div className={styles.header}>
    <div className={styles.headerLeft}>
      <StaticImage className={styles.headerImg} src="./profile.png" alt="" />
    </div>

    <div className={styles.headerRight}>
      <section>
        <h1 className={styles.headerTitle}>Hi there, I'm Nick!</h1>
        <p>
          Welcome to my corner of the internet where I share ideas and help you
          solve real problems.
        </p>
        <p>
          I fundamentally believe the internet and technology has created
          limitless opportunity.{' '}
          <b>
            I aim to help you leverage those opportunities by providing you a
            toolkit
          </b>{' '}
          to create products and navigate the technology world.
        </p>
        {/* <p>
          I'm fascinated by the indie maker movement and how software engineers
          and non-engineers are utilizing new tools to create products that
          provide them financial independence.
        </p> */}
        <p>
          On this blog you can expect ideas, tutorials, and resources ranging
          topics like startups, making products, and software engineering.
        </p>
      </section>
    </div>
  </div>
);

const StartHereBio = () => (
  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Quick Bio</h2>

    <div className="mw6 center">
      <p>
        I'm a product-oriented engineer that loves startups. I currently work at
        Credit Karma.
      </p>
      <p>
        I publish Makers, a newsletter for creatives, technologists, and makers.{' '}
        <Link to={NEWSLETTER_URL}>Subscribe here</Link> or{' '}
        <OutboundLink href={NEWSLETTER_ARCHIVE_URL}>
          read the archive.
        </OutboundLink>
      </p>
      <p>Born and raised in Los Angeles.</p>
      <p>Living in San Francisco, CA.</p>
      <p>
        Favorite book:{' '}
        <OutboundLink href="https://amzn.to/2XeHjMj">
          4-Hour Workweek
        </OutboundLink>
        .
      </p>
    </div>
  </section>
);

const StartHerePopularPosts = ({ productPosts, technicalPosts }) => (
  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Popular Posts</h2>

    <section className={styles.subsection}>
      <h3 className={styles.sectionSubtitle}>Product</h3>

      <ul className={styles.posts}>
        {productPosts.map((p, idx) => (
          <StartPopularArticle
            idx={idx}
            length={productPosts.length}
            slug={p.slug}
            title={p.title}
            description={get(
              p,
              'description.childMarkdownRemark.excerpt',
              p.body.childMarkdownRemark.excerpt
            )}
            date={p.date}
          />
        ))}
      </ul>
    </section>

    <section className={styles.subsection}>
      <h3 className={styles.sectionSubtitle}>Software Engineering</h3>

      <ul className={styles.posts}>
        {technicalPosts.map((p, idx) => (
          <StartPopularArticle
            idx={idx}
            length={technicalPosts.length}
            slug={p.slug}
            title={p.title}
            description={get(
              p,
              'description.childMarkdownRemark.excerpt',
              p.body.childMarkdownRemark.excerpt
            )}
            date={p.date}
          />
        ))}
      </ul>
    </section>
  </section>
);

const StartNewsletter = () => (
  <div className={styles.section}>
    <h2>Subscribe</h2>
    <div className="mw6 center">
      <p>
        I publish Makers, an occasional newsletter for makers and creatives.
      </p>
      <p>
        It's the best way to keep up with everything here, so drop your email
        below or{' '}
        <OutboundLink href={NEWSLETTER_ARCHIVE_URL}>
          read the archive
        </OutboundLink>
        . I promise to never do anything shady or send you spam.
      </p>
      <NewsletterSignupForm />
    </div>
  </div>
);

const Start: React.FC<any> = ({ productPosts, technicalPosts }) => {
  return (
    <div className="mwlg center ph3">
      <StartHereSection />
      <hr />
      <div className="tc">
        <StartHereBio />
        <hr />
        <StartHerePopularPosts
          productPosts={productPosts}
          technicalPosts={technicalPosts}
        />
        <hr />
        <StartNewsletter />
      </div>
    </div>
  );
};

export default Start;
