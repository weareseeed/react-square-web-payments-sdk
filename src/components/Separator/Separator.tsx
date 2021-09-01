// Dependencies
import { CSSObject } from '@emotion/styled';
import * as React from 'react';

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
