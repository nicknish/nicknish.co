import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import Layout from '../components/layout';
import Button from '../components/button';

const WorkLink = ({ to, href, text }) => {
  const classNames = 'w-80 w-auto-ns mh3-ns mb3 mb0-ns';

  if (href) {
    return (
      <Button
        href={href}
        component={({ children, ...props }) => (
          <OutboundLink {...props}>{children}</OutboundLink>
        )}
        className={classNames}
        theme="primary"
        size="small"
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </Button>
    );
  }

  return (
    <Button
      to={to}
      component={Link}
      className={classNames}
      theme="primary"
      size="small"
    >
      {text}
    </Button>
  );
};

const IndexPage = ({ data }) => (
  <Layout page={{}}>
    <div className="landing">
      <section className="container hero">
        <h1 className="landing-title">
          Hi, I{"'"}m Nick! I am a Frontend / Full Stack Developer living in Los
          Angeles, CA.
        </h1>
      </section>

      <section className="ph3 mw-custom center mb5-ns">
        <Img sizes={data.headerImg.sizes} alt="Me and my girlfriend!" />
      </section>

      <section className="landing-section container">
        <h3>
          About{' '}
          <span role="img" aria-label="Wave">
            👋
          </span>
        </h3>
        <p>
          I{"'"}m a passionate creative with a deep love for creating great
          products. Because I love design and crafting great user experiences, I
          consider myself a frontend developer first, but I{"'"}m a full-stack
          developer with JavaScript, React, GraphQL, Node, and Ruby on Rails
          experience.
        </p>
        <p>
          I meditate, learn everyday without fail, and strive to carry joy in
          everything I do. First and foremost, I try to live a life of
          fulfillment and peace.
        </p>
        <p>
          I also <Link to="/blog">write</Link> occasionally and build{' '}
          <Link to="/projects">side projects</Link>.
        </p>
      </section>

      <section className="landing-section container">
        <h3>Experience</h3>
        <p>
          I{"'"}
          ve worked for{' '}
          <OutboundLink href="https://capitalg.com/">
            capitalG
          </OutboundLink>{' '}
          (formerly Google Capital),{' '}
          <OutboundLink href="https://a16z.com/">
            Andreessen-Horowitz
          </OutboundLink>{' '}
          and{' '}
          <OutboundLink href="https://www.ycombinator.com/">
            YCombinator
          </OutboundLink>{' '}
          companies. The through-line is working with talented, passionate, kind
          folk.
        </p>
      </section>

      <nav className="mw-custom center ph3 mt4 mt5-ns tc">
        <WorkLink to="/work" text="See Work" />
        <WorkLink to="/projects" text="See Projects" />
        <WorkLink href={data.site.siteMetadata.resume_url} text="See Resume" />
      </nav>
    </div>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query LandingQuery {
    headerImg: imageSharp(
      fluid: { originalName: { regex: "/landing_image/" } }
    ) {
      sizes {
        base64
        tracedSVG
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
        originalImg
        originalName
      }
    }

    site {
      siteMetadata {
        resume_url
      }
    }
  }
`;
