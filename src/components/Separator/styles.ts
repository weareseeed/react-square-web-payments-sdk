// Internals
import { styled } from '@/stitches.config';

export const Line = styled('div', {
  background: 'rgba(0, 0, 0, 0.1)',
  color: 'rgba(0, 0, 0, 0.55)',
  fontSize: 12,
  height: 1,
  lineHeight: '20px',
  margin: '30px 0',
  position: 'relative',
  textTransform: 'uppercase',
  width: '100%',
});

export const SpanText = styled('span', {
  background: '#FAFAFA',
  fontFamily: 'sans-serif, system-ui',
  left: 'calc(50% - 1em - 5px)',
  padding: '0 10px',
  position: 'absolute',
  top: -10,
});
