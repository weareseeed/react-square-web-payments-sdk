// Dependencies
import { styled } from '@stitches/react';

export const PayButton = styled('button', {
  alignItems: 'center',
  background: 'white',
  borderRadius: 6,
  border: '1px solid #d9d9d9',
  color: 'black',
  cursor: 'pointer',
  display: 'flex',
  fontSize: 14,
  justifyContent: 'center',
  lineHeight: `16px`,
  padding: '12px 16px',
  width: '100%',
  '&:hover': {
    background: 'rgba(1, 208, 158, 0.1)',
  },
});

export const SvgIcon = styled('svg', {
  display: 'inline-flex',
  height: 24,
  marginRight: 14,
  width: 36,
});
