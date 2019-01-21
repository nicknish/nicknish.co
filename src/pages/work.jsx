import React from 'react';
import { Link, graphql } from 'gatsby';
import shortid from 'shortid';

import IndexCard from '../components/indexCard';
import Layout from '../components/layout';
import Page from '../components/layout/page';

export class Work extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sortedExperiences: [], sortedContractExperiences: [] };
  }

  componentDidMount() {
    let sortedExperiences = this.props.data.work.edges.map(({ node }) => {
      node.id = shortid.generate();
      return node;
    });

    let sortedContractExperiences = this.props.data.contract_work.edges.map(
      ({ node }) => {
        node.id = shortid.generate();
        return node;
      }
    );

    this.setState({ sortedExperiences, sortedContractExperiences });
  }

  render() {
    const { sortedExperiences, sortedContractExperiences } = this.state;
    const { location } = this.props;

    return (
      <Layout location={location}>
        <Page>
          <section className="container hero">
            <h1 className="page-title">Work</h1>
            <p className="page-subtitle">
              Work is both a means to gain mastery and a way to create something
              meaningful. Here are some of the major work experiences I've had.
            </p>
          </section>

          {sortedExperiences.map(node => {
            const {
              id,
              frontmatter: {
                title,
                path,
                date,
                excerpt,
                image_preview_url,
                image_preview_description
              }
            } = node;

            return (
              <IndexCard
                key={id}
                path={path}
                title={title}
                imageSizes={image_preview_url.childImageSharp.sizes}
                imagePreviewDescription={image_preview_description}
                descriptionExcerpt={excerpt}
                date={date}
              />
            );
          })}

          <div className="container">
            <h2 className="pt4 bt b--black-10">Freelance Work</h2>

            <div className="contractWork">
              {sortedContractExperiences.map(node => {
                const {
                  id,
                  frontmatter: { title, path, date, excerpt }
                } = node;

                return (
                  <div key={id} className="contractWork-card">
                    <Link to={path}>
                      <h3>{title}</h3>
                      <div className="date">{date}</div>
                      <p>{excerpt}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </Page>
      </Layout>
    );
  }
}

export default Work;

export const query = graphql`
  query WorkQuery {
    work: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { frontmatter: { type: { eq: "work" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            excerpt
            external_url
            image_preview_url {
              childImageSharp {
                sizes(maxWidth: 640) {
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
            image_preview_description
            type
          }
        }
      }
    }

    contract_work: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { frontmatter: { type: { eq: "contract_work" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            excerpt
            external_url
            image_preview_url {
              childImageSharp {
                sizes(maxWidth: 640) {
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
            image_preview_description
            type
          }
        }
      }
    }
  }
`;
