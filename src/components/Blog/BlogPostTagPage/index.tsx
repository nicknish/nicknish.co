import React from 'react';

interface IBlogPostTagPage {
  data: any;
}

const BlogPostTagPage: React.FC<IBlogPostTagPage> = (props: any) => {
  return (
    <div>
      <pre>
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>
    </div>
  );
};

export default BlogPostTagPage;
