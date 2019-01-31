export const query = graphql`
  fragment ImageSizes on ContentfulSizes {
    base64
    tracedSVG
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`;
