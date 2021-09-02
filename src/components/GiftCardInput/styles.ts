// Dependencies
import { keyframes, styled } from '@stitches/react';

const pulse = keyframes({
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
});

export const LoadingCard = styled('div', {
  animation: `${pulse()} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  background: '#F3F4F6',
  borderRadius: 6,
  height: 50,
  marginBottom: 39,
  position: 'relative',
});

export const PayButton = styled('button', {
  backgroundColor: '#006aff',
  borderRadius: 5,
  boxShadow: 1,
  color: '#fff',
  cursor: 'pointer',
  borderStyle: 'none',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '24px',
  outline: 'none',
  padding: 12,
  userSelect: 'none',
  width: '100%',
  '&:active': {
    backgroundColor: 'rgb(0, 85, 204)',
  },
  '&:disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    color: 'rgba(0, 0, 0, 0.3)',
    cursor: 'not-allowed',
  },
});
