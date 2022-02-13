declare type TextfieldTypeKeys = 'email'
                               | 'number'
                               | 'password'
                               | 'search'
                               | 'tel'
                               | 'text'
                               | 'textarea'
                               | 'url';

declare interface TextfieldStateObject {
  isHover: boolean;
  isFocus: boolean;
  isError: boolean;
}
