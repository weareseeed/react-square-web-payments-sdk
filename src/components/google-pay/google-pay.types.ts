// Dependencies
import type * as Square from '@square/web-sdk';
import type * as React from 'react';

export interface GooglePayProps extends Square.GooglePayButtonOptions, React.ComponentPropsWithoutRef<'div'> {}
