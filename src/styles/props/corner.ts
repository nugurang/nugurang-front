export type CornerKeys = 'square'
                       | 'round'
                       | 'circle';
export type CornerObject = {[key in CornerKeys]: string};

export const corner = {
  square: '0',
  round:  '4px',
  circle: '50%',
};
