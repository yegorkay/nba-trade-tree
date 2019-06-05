import { React, FunctionComponent, styled, keyframes } from 'vendor';

const Loader: FunctionComponent<{}> = () => (
  <LoaderWrapper>
    <div />
    <div />
    <div />
  </LoaderWrapper>
);

const loadingAnimation = keyframes`
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #8385aa;
    border-radius: 50%;
    animation: ${loadingAnimation} 0.6s infinite alternate;
  }
  & > div:nth-child(2) {
    animation-delay: 0.2s;
  }
  & > div:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export { Loader };
