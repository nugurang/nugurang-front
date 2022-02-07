/** @jsxImportSource @emotion/react */

import { css, jsx, keyframes } from '@emotion/react'

export type KeyframeKeys = 'shakeHorizontally';
export type KeyframeObject = {[key in KeyframeKeys]: any};

export const shakeHorizontally = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const keyframe = {
  shakeHorizontally
};
