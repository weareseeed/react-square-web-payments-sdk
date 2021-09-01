// Dependencies
import styled from '@emotion/styled';

export const Container = styled.div({
  minHeight: 160,
  position: 'relative',
});

export const Text = styled.div({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});
