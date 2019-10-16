import React from 'react';

const Page: React.FC<{ className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export default Page;
