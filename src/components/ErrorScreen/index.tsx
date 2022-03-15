// Dependencies
import * as React from 'react'

// Internals
import {
  Container,
  Svg,
  SvgContainer,
  Text,
  TextContainer,
  Title,
} from './styles'

type ErrorScreenProps = {
  development?: boolean
}

const ErrorScreen = ({
  development = true,
}: ErrorScreenProps): React.ReactElement => {
  // See if we're in development mode or props.development is set
  const isDevelopment = process.env.NODE_ENV === 'development' || development

  if (process.env.NODE_ENV !== 'development') {
    // Show a generic error on production
    console.error(
      'Please contact your developer to provide the required parameters to use the Web Payments SDK.'
    )
  }

  return (
    <Container>
      <SvgContainer>
        <Svg height={17} viewBox="0 0 20 17" width={20}>
          <path
            d="M10.874.573l8.3 14.941A1 1 0 0118.3 17H1.7a1 1 0 01-.875-1.486l8.3-14.94a1 1 0 011.75 0zM9 12v2h2v-2H9zm2-1V7H9v4h2z"
            fill="#d92b2b"
            fillRule="evenodd"
          />
        </Svg>
      </SvgContainer>

      <TextContainer>
        <Title>
          {isDevelopment
            ? 'No location ID or app ID found. Please check your configuration.'
            : 'Error'}
        </Title>

        <Text>
          {isDevelopment ? (
            <>
              Please provide a location ID or app ID to use the{' '}
              <a
                href="https://developer.squareup.com/docs/web-payments/overview"
                rel="noopener noreferrer"
                target="_blank"
              >
                Web Payments SDK
              </a>{' '}
              to take payments on a web client.
            </>
          ) : (
            <>An error occurred has ocurred while loading your Payment Form.</>
          )}
        </Text>
      </TextContainer>
    </Container>
  )
}

export default ErrorScreen
export type { ErrorScreenProps }
