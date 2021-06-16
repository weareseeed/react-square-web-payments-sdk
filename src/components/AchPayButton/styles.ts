// Vendor Modules
import styled, { CSSObject } from '@emotion/styled';

export const PayButton = styled.button<{
  overrideStyles?: CSSObject;
}>((props) => ({
  background: 'white',
  width: '100%',
  fontSize: 16,
  lineHeight: `18px`,
  padding: 16,
  borderRadius: 6,
  border: '1px solid #d9d9d9',
  display: 'block',
  color: 'black',
  '&:hover': {
    background: 'rgba(0, 106, 255, 0.85)',
  },
  ...props.overrideStyles,
  cursor: 'pointer',
}));
