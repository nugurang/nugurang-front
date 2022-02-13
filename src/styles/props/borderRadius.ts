export type BorderRadiusKeys = 'square'
                             | 'round'
                             | 'circle';
export type BorderRadiusObject = {[key in BorderRadiusKeys]: string};

export const borderRadius = {
  square: '0',
  round:  '4px',
  circle: '50%',
};
