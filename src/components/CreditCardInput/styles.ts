// Vendor Modules
import styled, { CSSObject } from '@emotion/styled';

export const PayButton = styled.button<{
  overrideStyles?: CSSObject;
}>(props => ({
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
}));
