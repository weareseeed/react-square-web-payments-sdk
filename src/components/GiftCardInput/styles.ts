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
  overrideStyles?: CSSObject;
}>((props) => ({
  background: 'rgba(0, 0, 0, 1)',
  borderRadius: 6,
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  display: 'block',
  fontSize: 16,
  lineHeight: `18px`,
  padding: 16,
  width: '100%',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.85)',
  },
  ...props.overrideStyles,
}));
