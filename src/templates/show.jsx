import React from 'react'
import Path from 'path'
import Link from 'gatsby-link'

export const Show = ({ data }) => {
  const {
    markdownRemark: {
      html,
      frontmatter: { title, date, external_url, path },
    },
  } = data
  const { backUrl, backLinkText, headerText } = prepareShowData(path)

  let externalLink
  let imageSection

  if (external_url) {
    externalLink = (
      <span>
        {' -- '}
        <a href={external_url} className="show-externalLink" target="_blank">
          See it here{' '}
          <i className="show-externalLinkIcon fa fa-external-link-alt" />
        </a>
      </span>
    )
  }

  return (
    <div className="show-page">
      <section className="container hero">
        <Link to={backUrl} className="show-backLink">
          <i className="show-backLinkIcon fas fa-caret-left" />
          <span className="show-backLinkText">{backLinkText}</span>
        </Link>
        <h1 className="show-title">{title}</h1>
        <span className="show-subtitle">
          {date}
          {externalLink}
        </span>
      </section>

      {imageSection}

      <div className="container">
        <h3>{headerText}</h3>
        <p
          className="u-multiLineText"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

const prepareShowData = path => {
  const type = Path.dirname(path).indexOf('work') > -1 ? 'work' : 'project'
  const isProject = type === 'project'

  const backUrl = `/${type === 'work' ? 'work' : 'projects'}`
  const backLinkText = `Back to ${isProject ? 'projects' : 'work experience'}`
  const headerText = `${isProject ? 'Project' : 'Role'} Description`

  return { backUrl, backLinkText, headerText }
}

export default Show

export const query = graphql`
  query ShowQuery($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        title
        path
        external_url
        image_preview_url
        image_preview_description
        date
        excerpt
      }
    }
  }
`
