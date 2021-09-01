// Dependencies
import * as React from 'react';

// Internals
import { Container, Svg, Text } from './styles';

export const NoLocationIdOrAppId = (): JSX.Element => {
  return (
    <Container>
      <Svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </Svg>

      <Text>
        There are no <span className="code">applicationId</span> or{' '}
        <span className="code">locationId</span> present.
      </Text>
    </Container>
  );
};

export default NoLocationIdOrAppId;
