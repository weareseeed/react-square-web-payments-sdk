// Internals
import { styled } from '../../stitches.config';

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
  span: {
    lineHeight: 1,
    verticalAlign: 'middle',
  },
});

export const SvgIcon = styled('svg', {
  display: 'inline-flex',
  height: 24,
  marginRight: 14,
  verticalAlign: 'middle',
  width: 36,
});
