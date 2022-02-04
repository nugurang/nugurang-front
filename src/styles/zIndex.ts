export type ZIndexKeys = 'none'
                       | 'default'
                       | 'hover'
                       | 'fixed'
                       | 'backdrop'
                       | 'modal';
export type ZIndexObject = {[key in ZIndexKeys]: string};

export const zIndex = {
  none:     '0',
  default:  '100',
  hover:    '110',
  fixed:     '200',
  backdrop: '300',
  modal:    '310',
};
