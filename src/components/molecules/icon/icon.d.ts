declare type IconTypeKeys = 'image'
                          | 'fontAwesomeIcon';

declare interface IconObject {
  type?: IconTypeKeys;
  edge?: string;
  src?:  string | IconProp;
  alt?:  string;
}
