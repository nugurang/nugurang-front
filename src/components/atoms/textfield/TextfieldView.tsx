import type { CommonComponentProps } from '@/components/common';
import { CommonStyledAttributes } from '@/components/common';
import Div from '@/components/quarks/div/Div';
import React from 'react';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  children?: React.ReactNode;
  type?: TextfieldTypeKeys;
  onInput?: () => void;
  state: TextfieldStateObject;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  rows?: number;
  cols?: number;
}

const StyledInputWrapDiv = styled(Div)`
  ${(props: any) => `
    padding: 20px 0;
    position: relative;
  `}
`;

const CommonStyledTextfield = (props: any) => `
  ${CommonStyledAttributes(props)}

  display: block;
  box-sizing: border-box;
  width: 100%;

  padding: 0 8px;
  font-size: 16px;

  border: 2px solid ${props.theme.palette.default.main};
  &:focus {
    outline-style: none;
    border: 2px solid ${props.theme.palette[props.palette || 'primary'].main};
  }
  ${props.state.error ? `
    border: 2px solid ${props.theme.palette.danger.main};
    &:focus {
      border: 2px solid ${props.theme.palette.danger.main};
    }
  ` : ''};
`;

const StyledInput = styled.input<ViewProps>`
  ${(props: any) => `
    ${CommonStyledTextfield(props)}
    height: 32px;
    ${props.css}
  `}
`;

const StyledTextarea = styled.textarea<ViewProps>`
  ${(props: any) => `
    ${CommonStyledTextfield(props)}
    padding: 8px;
    height: ${((props.rows ?? 5) * (16 * 1.25)) + 16}px;
    ${props.cols ? `
      width: ${(props.cols ?? 40) * 16}px;
    ` : ''}
    resize: none;
    ${props.css}
  `}
`;

const StyledPlaceholder = styled(Div)<ViewProps>`
  ${(props: any) => `
    position: absolute;
    pointer-events: none;
    top: 28px;
    left: 8px;
    font-size: 16px;
    color: ${props.theme.palette.default.subtext};
    ${(props.state.isFocus) ? `
      top: 2px;
      left: 6px;
      font-size: 12px;
      color: ${props.theme.palette[props.palette || 'primary'].main};
    `: ''}
    ${props.state.isError ? `
      color: ${props.theme.palette.danger.main};
    ` : ''};
  `}
`;

const StyledErrorMessage = styled(Div)<ViewProps>`
  ${(props: any) => `
    display: none;
    position: absolute;
    bottom: 4px;
    left: 8px;
    font-size: 16px;
    color: ${props.theme.palette.danger.main};
    ${(props.state.isError) ? `
      display: block;
      bottom: 4px;
      left: 6px;
      font-size: 12px;
    `: ''}
  `}
`;

const TextfieldView: React.FC<ViewProps> = props => {

  const inputProps = {
    ...props,
    placeholder: ''
  }

  return (
    <StyledInputWrapDiv>
      <StyledPlaceholder {...inputProps} >
        {props.placeholder}
      </StyledPlaceholder>
      {
        props.type == 'textarea' && <>
          <StyledTextarea {...inputProps} />
        </>
      }
      {
        props.type != 'textarea' && <>
          <StyledInput {...inputProps} />
        </>
      }
      <StyledErrorMessage {...inputProps} >
        {props.errorMessage}
      </StyledErrorMessage>
    </StyledInputWrapDiv>
  );
  
};

export default TextfieldView;
