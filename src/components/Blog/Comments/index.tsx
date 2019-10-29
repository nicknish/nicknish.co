import React from 'react';
import cx from 'classnames';
import styles from './Comments.module.css';
import { SCRIPT_ELEMENT_TARGET } from './constants';
import useComments from './useComments';

const Loader: React.FC = () => <div>Loading Comments...</div>;
const Error: React.FC = () => (
  <div>There was an error loading comments. Please refresh!</div>
);

const Comments = () => {
  const { containerRef, loaded, isOnScreen, scriptHasError } = useComments();

  return (
    <div
      ref={containerRef}
      className={cx(styles.comments, { [styles.notLoaded]: !loaded })}
    >
      {isOnScreen && !loaded && <Loader />}
      {loaded && scriptHasError && <Error />}
      <div id={SCRIPT_ELEMENT_TARGET}></div>
    </div>
  );
};

export default Comments;
