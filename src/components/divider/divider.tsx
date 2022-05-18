// Dependencies
import * as React from 'react';
import type * as Stitches from '@stitches/react';

// Internals
import { Line, SpanText } from './divider.styles';

interface DividerProps extends Stitches.ComponentProps<typeof Line> {
  spanProps?: Omit<Stitches.ComponentProps<typeof SpanText>, 'children'>;
}

const Divider = ({ children, spanProps, ...props }: DividerProps): React.ReactElement => (
  <Line {...props}>
    <SpanText {...spanProps}>{children ?? 'or'}</SpanText>
  </Line>
);

export default Divider;
export type { DividerProps };
