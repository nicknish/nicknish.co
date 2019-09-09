import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import shortid from 'shortid';
import { getDate } from '../utils/helpers';

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

    return (
      <Layout page={{ title: 'Work' }} path="/work">
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
              title,
              slug,
              startDate,
              endDate,
              current,
              excerpt,
              images = [],
              image_preview_description
            } = node;

            return (
              <IndexCard
                key={id}
                path={`work/${slug}`}
                title={title}
                imageSizes={get(images, '[0].sizes')}
                imagePreviewDescription={image_preview_description}
                descriptionExcerpt={excerpt.childMarkdownRemark.html}
                date={getDate(startDate, endDate, current)}
              />
            );
          })}

          <div className="container">
            <h2 className="pt4 bt b--black-10">Freelance Work</h2>

            <div className="contractWork">
              {sortedContractExperiences.map(node => {
                const {
                  id,
                  title,
                  slug,
                  startDate,
                  endDate,
                  current,
                  excerpt
                } = node;

                return (
                  <div key={id} className="contractWork-card">
                    <Link to={`work/${slug}`}>
                      <h3>{title}</h3>
                      <div className="date">
                        {getDate(startDate, endDate, current)}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: excerpt.childMarkdownRemark.html
                        }}
                      />
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
  }
`;
