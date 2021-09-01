// Dependencies
import * as React from 'react';
import type { CSSObject } from '@emotion/styled';

// Internals
import { Line, SpanText } from './styles';

interface Props {
  overrideLineStyles?: CSSObject;
  overrideSpanStyles?: CSSObject;
  text?: string;
}

export const Separator = ({
  overrideLineStyles = undefined,
  overrideSpanStyles = undefined,
  text = 'or',
}: Props): JSX.Element => {
  return (
    <Line overrideStyles={overrideLineStyles}>
      <SpanText overrideStyles={overrideSpanStyles}>{text}</SpanText>
    </Line>
  );
};

export default Separator;
