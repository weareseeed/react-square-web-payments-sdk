// Dependencies
import { styled } from '@stitches/react';

export const Container = styled('div', {
  background: '#FFFFFF',
  border: '1px solid #e0e2e4',
  borderLeft: '4px solid',
  borderLeftColor: '#d92b2b',
  borderRadius: 4,
  boxShadow:
    '0 0 2px rgb(0 0 0 / 10%), 0 2px 2px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 10%)',
  display: 'flex',
  flexFlow: 'row nowrap',
  margin: '24px auto',
  maxWidth: 800,
  padding: '16px 24px 16px 16px',
  width: '100%',
});

export const SvgContainer = styled('div', {
  alignItems: 'center',
  display: 'inline-flex',
  marginRight: 16,
  maxHeight: 24,
});

export const Svg = styled('svg', {
  display: 'inline-block',
  verticalAlign: 'middle',
});

export const TextContainer = styled('div', {
  flexGrow: 1,
  fontSize: 16,
  lineHeight: 28,
});

export const Title = styled('h4', {
  color: '#373f4a',
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 0,
  marginTop: 0,
  letterSpacing: 0,
  lineHeight: '24px',
  textTransform: 'none',
});

export const Text = styled('p', {
  color: '#373f4a',
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
  fontSize: 14,
  lineHeight: '24px',
  marginBottom: 0,
  marginTop: 0,
  maxWidth: 700,
  width: '100%',
  '& a': {
    color: '#006be6',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
