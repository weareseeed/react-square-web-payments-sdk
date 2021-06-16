// Vendor Modules
import styled from '@emotion/styled';

export const ApplePayContainer = styled.div({
  ApplePayButtonStyle: 'black',
  ApplePayButtonType: 'plain',
  WebkitAppearance: '-apple-pay-button',
  height: 48,
  width: '100%',
  display: 'inline-block',
});

export const ErrorContainer = styled.div({
  background: 'rgb(254,242,242)',
  borderRadius: '0.375rem',
  padding: '1rem',
  '> .flex': {
    display: 'flex',
    '> .icon-container': {
      flexShrink: 0,
      '> svg': {
        color: 'rgb(248,113,113)',
        height: '1.25rem',
        width: '1.25rem',
      },
    },
    '> .text-container': {
      marginLeft: '.75rem',
      '> h3': {
        color: 'rgb(153,27,27)',
        fontFamily: 'sans-serif, system-ui',
        fontSize: '.875rem',
        fontWeight: 500,
        lineHeight: '1.25rem',
        margin: 0,
      },
    },
  },
});
