import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

const IndexPage = ({ data }) => (
  <div className="landing">
    <section className="container hero">
      <h1 className="landing-title">
        Hi, I
        {"'"}
        m Nick! I am a Frontend / Full Stack Developer living in Los Angeles,
        CA.
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
        I
        {"'"}
        m a passionate creative with a deep love for creating products and the
        craft of telling important stories. Because I love frontend engineering,
        I consider myself a frontend developer first, but I
        {"'"}
        m a full-stack developer with JavaScript, React/Redux, Ruby, and Rails
        experience.
      </p>
      <p>
        I get stoked over conversations of product, design, and brand building.
      </p>
      <p>
        I meditate, learn everyday without fail, and strive to carry joy in
        everything I do.
      </p>
      <p>
        I do some{' '}
        <a href="https://nicknish.blog" target="_blank">
          writing
        </a>
        . I
        {"'"}
        m trying to build side projects daily. First and foremost, I want to
        live a full life surrounded by people I care for.
      </p>
    </section>

    <section className="landing-section container">
      <h3>Experience</h3>
      <p>
        I
        {"'"}
        ve worked for Andreessen-Horowitz and YCombinator companies alike. The
        through-line is working with other talented, passionate, kind folk.
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
      </nav>
    </section>
  </div>
)

export default IndexPage

export const query = graphql`
  query LandingQuery {
    headerImg: imageSharp(id: { regex: "/landing_image/" }) {
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
  }
`
