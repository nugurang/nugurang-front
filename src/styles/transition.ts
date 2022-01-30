export type TransitionQueryKeys = 'default';
export type TransitionQueryObject = {[key in TransitionQueryKeys]: string};

export const TransitionQuery = {
  default: `
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `,
};
