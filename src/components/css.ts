import { css, keyframes } from "@emotion/css";

export const baseCss = css`
  font-family: "Noto Sans KR", Helvetica, sans-serif;
  border-radius: 8px;
  transition: all 0.1s ease-in-out;
`;

export const onClickCss = css`
  &:active {
    transform: scale(0.9);
  }
`;

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const keyframesExample = css([
  bounce,
  css({
    marginTop: "50px",
    width: "20px",
    height: "20px",
    background: "black",
    borderRadius: "50%",
    padding: "20px",
    animation: `${bounce} 1s ease infinite`,
    transformOrigin: "center",
  }),
]);
