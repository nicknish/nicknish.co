import React from 'react';
import { graphql } from 'gatsby';
import IndexCard from '../components/indexCard';
import shortid from 'shortid';
import get from 'lodash/get';
import { getDate } from '../utils/helpers';

import Layout from '../components/layout';
import Page from '../components/layout/page';

export class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sortedProjects: [] };
  }

  componentDidMount() {
    let sortedProjects = [];

    this.props.data.projects.edges.forEach(({ node }) => {
      node.id = shortid.generate();

      if (node.title === 'Portfolio') {
        sortedProjects.unshift(node);
        return;
      }

      sortedProjects.push(node);
    });

    this.setState({ sortedProjects });
  }

  render() {
    const { sortedProjects } = this.state;

    return (
      <Layout page={{ title: 'Projects' }} path="/projects">
        <Page>
          <header className="container hero">
            <h1 className="page-title">Projects</h1>
            <p className="page-subtitle">
              Projects create opportunity to experiment and explore.
            </p>
          </header>

          {sortedProjects.map(node => {
            const {
              id,
              title,
              slug,
              startDate,
              endDate,
              current,
              excerpt,
              images
            } = node;

            const imageSizes = get(images, '[0].sizes');

            return (
              <IndexCard
                key={id}
                path={`projects/${slug}`}
                title={title}
                imageSizes={imageSizes}
                imagePreviewDescription={get(images, '[0].description')}
                descriptionExcerpt={excerpt.childMarkdownRemark.html}
                date={getDate(startDate, endDate, current)}
              />
            );
          })}
        </Page>
      </Layout>
    );
  }
}

export default Projects;

export const query = graphql`
  query ProjectsQuery {
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
            }
          }
          images {
            description
            sizes(maxWidth: 640) {
              ...ImageSizes
            }
          }
        }
      }
    }
  }
`;
