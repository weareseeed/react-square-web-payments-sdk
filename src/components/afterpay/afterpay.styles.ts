// Internals
import { keyframes, styled } from '~/stitches.config';

const pulse = keyframes({
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
});

export const ButtonLoader = styled('div', {
  animation: `${pulse()} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  background: '#F3F4F6',
  borderRadius: 6,
  height: 40,
});
