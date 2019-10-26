import React from 'react';
import { graphql } from 'gatsby';
import cx from 'classnames';
import Link from 'gatsby-link';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import FaExternalLink from 'react-icons/lib/fa/external-link';

import { SEOTypes } from '../components/SEO';
import Layout from '../components/Layout/Layout';
import { WORK_URL, HOME_URL } from '../constants/urls';
import { getDate } from '../utils/helpers';

import HAPPY_IMG from '../images/happy.svg';
import styles from '../css/Work.module.css';
import Button, { ButtonThemes } from '../components/Button';

const WorkItem = ({ to, title, description, footerSubtitle }) => (
  <Link to={to} className={styles.gridItem} data-testid={`WorkItem--${to}`}>
    <p className={styles.gridItemTitle}>{title}</p>
    <p className={styles.gridItemDescription}>{description}</p>
    <span className={styles.gridItemFooterSubtitle}>{footerSubtitle}</span>
  </Link>
);

const prepareData = nodes => {
  return nodes.edges.map(({ node }) => ({
    ...node,
    description: node.excerpt.childMarkdownRemark.excerpt
  }));
};

const Work = ({ data }) => {
  const work = prepareData(data.work);
  const projects = prepareData(data.projects);
  const resumeUrl = data.site.siteMetadata.resume_url;
  // const contractWork = prepareData(data.contract_work);

  return (
    <Layout type={SEOTypes.page} content={{ title: 'Career' }} path={WORK_URL}>
      <div className={styles.layoutContainer}>
        <div className={styles.heroImgContainer}>
          <img src={HAPPY_IMG} className={styles.heroImg} />
        </div>

        <section
          className={cx(styles.section, styles.about)}
          data-testid="WorkSection--about"
        >
          <h1 className={styles.title}>About Me</h1>
          <p>
            Hello! My name is Nick Nish and I'm a Software Engineer with a
            particular love for Frontend Development.
          </p>
          <p>
            I{"'"}m a passionate creative with a deep love for making great
            products. Because I love design and crafting great user experiences,
            I consider myself a frontend developer first, but I{"'"}m a
            full-stack developer with JavaScript, React, GraphQL, Node, and Ruby
            on Rails experience.
          </p>
          <p>
            First and foremost, I try to live a life of fulfillment and peace. I
            meditate, learn everyday without fail, and strive to carry joy in
            everything I do.
          </p>
          <p>
            I also <Link to={HOME_URL}>write</Link> occasionally and build{' '}
            <a href="#projects">side projects</a>.
          </p>
        </section>

        <section
          className={cx(styles.section, styles.career)}
          data-testid="WorkSection--career"
        >
          <h1 className={cx(styles.title, styles.titleNoPadding)}>Career</h1>
          <div className={styles.grid}>
            {work.map(data => {
              const {
                title,
                slug,
                startDate,
                endDate,
                current,
                description
              } = data;

              return (
                <WorkItem
                  key={title}
                  to={`/work/${slug}`}
                  title={title}
                  description={description}
                  footerSubtitle={getDate(startDate, endDate, current)}
                />
              );
            })}
          </div>
          <div className={styles.cvLinkContainer}>
            <Button
              component={OutboundLink}
              href={resumeUrl}
              className={styles.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              theme={ButtonThemes.primary}
            >
              See Resume
              <FaExternalLink className={styles.cvLinkIcon} />
            </Button>
          </div>
        </section>

        <section
          className={cx(styles.section, styles.projects)}
          data-testid="WorkSection--projects"
        >
          <h1 className={cx(styles.title, styles.titleNoPadding)} id="projects">
            Projects
          </h1>
          <div className={styles.grid}>
            {projects.map(data => {
              const {
                title,
                slug,
                startDate,
                endDate,
                current,
                description
              } = data;

              return (
                <WorkItem
                  key={title}
                  to={`/projects/${slug}`}
                  title={title}
                  description={description}
                  footerSubtitle={getDate(startDate, endDate, current)}
                />
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Work;

export const query = graphql`
  query WorkQuery {
    site {
      siteMetadata {
        resume_url
      }
    }

    work: allContentfulWork(
      filter: { freelanceWork: { eq: false } }
      sort: { fields: [startDate], order: DESC }
    ) {
      edges {
        node {
          ...WorkInfo
        }
      }
    }

    contract_work: allContentfulWork(
      filter: { freelanceWork: { eq: true } }
      sort: { fields: [startDate], order: DESC }
    ) {
      edges {
        node {
          ...WorkInfo
        }
      }
    }

    projects: allContentfulProject(sort: { fields: [startDate], order: DESC }) {
      edges {
        node {
          title
          slug
          startDate(formatString: "MMM YYYY")
          endDate(formatString: "MMM YYYY")
          current
          excerpt {
            childMarkdownRemark {
              ...Markdown
              excerpt
            }
          }
        }
      }
    }
  }
`;
