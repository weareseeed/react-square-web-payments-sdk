// Dependencies
import styled from '@emotion/styled';

export const Container = styled.div({
  background: '#FEF2F2',
  borderRadius: '0.375rem',
  padding: '1rem',
});

export const Svg = styled.svg({
  color: 'rgb(248,113,113)',
  display: 'block',
  height: 48,
  margin: '0 auto',
  width: 48,
});

export const Text = styled.p({
  fontFamily: 'sans-serif, system-ui',
  color: 'rgb(153,27,27)',
  textAlign: 'center',
  '> span.code': {
    background: 'black',
    borderRadius: 4,
    color: 'white',
    display: 'inline',
    fontFamily: 'monospace',
    padding: '2px 8px',
  },
});
