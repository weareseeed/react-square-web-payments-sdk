// Dependencies
import * as React from 'react';
import type { CSS } from '@stitches/react';

// Internals
import { Line, SpanText } from './styles';

interface Props {
  overrideLineStyles?: CSS;
  overrideSpanStyles?: CSS;
  text?: string;
}

export const Separator = ({
  overrideLineStyles = undefined,
  overrideSpanStyles = undefined,
  text = 'or',
}: Props): JSX.Element => {
  return (
    <Line css={overrideLineStyles}>
      <SpanText css={overrideSpanStyles}>{text}</SpanText>
    </Line>
  );
};

export default Separator;
