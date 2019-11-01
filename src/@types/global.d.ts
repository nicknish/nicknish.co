import Sentry from './sentry';

interface Window {
  commento?: any;
  Sentry: typeof Sentry;
}

// https://github.com/s-panferov/awesome-typescript-loader/issues/146#issuecomment-248808206
declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.gql' {
  const content: any;
  export default content;
}
