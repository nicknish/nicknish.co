import React from 'react';
import IndexCard from '../components/IndexCard';
import shortid from 'shortid';

export class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sortedProjects: [] };
  }

  componentDidMount() {
    let sortedProjects = [];

    this.props.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { frontmatter } = node;

      node.id = shortid.generate();

      if (frontmatter.title === 'Portfolio') {
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
      <div className="index">
        <section className="container hero">
          <h1 className="index-title">Projects</h1>
        </section>

        {sortedProjects.map(node => {
          const {
            id,
            frontmatter: {
              title,
              path,
              date,
              excerpt,
              external_url,
              image_preview_url,
              image_preview_description,
              type
            }
          } = node;

          const imageSizes = image_preview_url
            ? image_preview_url.childImageSharp.sizes
            : null;

          return (
            <IndexCard
              key={id}
              path={path}
              title={title}
              imageSizes={imageSizes}
              imagePreviewDescription={image_preview_description}
              descriptionExcerpt={excerpt}
              date={date}
            />
          );
        })}
      </div>
    );
  }
}

export default Projects;

export const query = graphql`
  query ProjectsQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { frontmatter: { type: { eq: "project" } } }
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
