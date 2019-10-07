import React from 'react';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

const Loader: React.FC<{ inverted?: boolean, content?: string }> = ({
  inverted = true,
  content
}) => {
  return (
    <Dimmer active inverted={inverted}>
      <SemanticLoader content={content} />
    </Dimmer>
  );
}

export default Loader;
