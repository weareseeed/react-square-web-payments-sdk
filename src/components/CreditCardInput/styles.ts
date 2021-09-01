// Dependencies
import { keyframes } from '@emotion/react';
import styled, { CSSObject } from '@emotion/styled';

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
`;

export const LoadingCard = styled.div({
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  background: '#F3F4F6',
  borderRadius: 6,
  height: 50,
  marginBottom: 39,
  position: 'relative',
});

export const PayButton = styled.button<{
  isSubmitting: boolean;
  overrideStyles?: CSSObject;
}>((props) => ({
  background: 'rgba(0, 106, 255, 1)',
  width: '100%',
  fontSize: 16,
  lineHeight: `18px`,
  padding: 16,
  borderRadius: 6,
  border: 'none',
  display: 'block',
  color: 'white',
  '&:hover': {
    background: 'rgba(0, 106, 255, 0.85)',
  },
  ...props.overrideStyles,
  cursor: 'pointer',
  '&[disabled]': {
    cursor: 'not-allowed',
    pointerEvents: 'none',
    opacity: 0.5,
  },
}));
