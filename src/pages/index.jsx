import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';

const IndexPage = ({ data, location }) => (
  <Layout location={location}>
    <div className="landing">
      <section className="container hero">
        <h1 className="landing-title">
          Hi, I{"'"}m Nick! I am a Frontend / Full Stack Developer living in Los
          Angeles, CA.
        </h1>
      </section>

      <section className="container--lg">
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
          ve worked for <a href="https://capitalg.com/">capitalG</a> (formerly
          Google Capital), <a href="https://a16z.com/">Andreessen-Horowitz</a>{' '}
          and <a href="https://www.ycombinator.com/">YCombinator</a> companies.
          The through-line is working with talented, passionate, kind folk.
        </p>
        <nav className="landing-experienceLinks">
          <Link
            to="/work"
            className="landing-experienceLink btn btn-primary btn-sm"
          >
            See Work
          </Link>
          <Link
            to="/projects"
            className="landing-experienceLink btn btn-primary btn-sm"
          >
            See Projects
          </Link>
          <a
            href={data.site.siteMetadata.resume_url}
            className="landing-experienceLink btn btn-primary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            See Resume
          </a>
        </nav>
      </section>
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
