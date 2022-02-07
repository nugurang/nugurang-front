import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';
import { useEffect, useState } from 'react';

import { CommonStyledAttributes } from '@/src/components/base/common';
import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

export type TextfieldType = 'email'
                          | 'number'
                          | 'password'
                          | 'search'
                          | 'tel'
                          | 'text'
                          | 'textarea'
                          | 'url';

interface ComponentProps extends CommonProps {
  children?: React.ReactNode;
  type?: TextfieldType;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  rows?: number;
  cols?: number;
}

interface StyledComponentProps extends CommonStyledProps {
  type?: TextfieldType;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  rows?: number;
  cols?: number;

  state: {
    hover: boolean;
    focus: boolean;
    error: boolean;
  };
}
const StyledInputWrapDiv = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    padding: 20px 0;
    position: relative;
  `}
`;

const CommonStyledTextfield = (props: StyledComponentProps) => `
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

const StyledInput = styled.input<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    ${CommonStyledTextfield(props)}
    height: 32px;
    ${props.css}
  `}
`;

const StyledTextarea = styled.textarea<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    ${CommonStyledTextfield(props)}
    padding: 8px;
    height: ${((props.rows ?? 5) * 20) + 16}px;
    width: ${(props.cols ?? 40) * 16}px;
    resize: none;
    ${props.css}
  `}
`;

const StyledPlaceholder = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    position: absolute;
    pointer-events: none;
    top: 28px;
    left: 8px;
    font-size: 16px;
    color: ${props.theme.palette.default.subtext};
    ${(props.state.focus) ? `
      top: 2px;
      left: 6px;
      font-size: 12px;
      color: ${props.theme.palette[props.palette || 'primary'].main};
    `: ''}
    ${props.state.error ? `
      color: ${props.theme.palette.danger.main};
    ` : ''};
  `}
`;

const StyledErrorMessage = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    display: none;
    position: absolute;
    bottom: 4px;
    left: 8px;
    font-size: 16px;
    color: ${props.theme.palette.danger.main};
    ${(props.state.error) ? `
      display: block;
      bottom: 4px;
      left: 6px;
      font-size: 12px;
    `: ''}
  `}
`;

const Textfield: NextPage<ComponentProps> = React.forwardRef((props, ref) => {
  const [state, setState] = useState({})
  
  const handleMouseEnter = () => {
    setState({
      ...state,
      hover: true
    });
    if (props.onMouseEnter) props.onMouseEnter();
  };
  const handleMouseLeave = () => {
    setState({
      ...state,
      hover: false
    });
    if (props.onMouseLeave) props.onMouseLeave();
  };
  const handleOnFocus = () => {
    setState({
      ...state,
      focus: true
    });
    if (props.onFocus) props.onFocus();
  };
  const handleOnBlur = () => {
    setState({
      ...state,
      focus: false
    });
    if (props.onBlur) props.onBlur();
  };
  const handleOnError = () => {
    setState({
      ...state,
      error: true
    });
  };
  const handleOnErrorResolved = () => {
    setState({
      ...state,
      error: false
    });
  };

  useEffect(() => {
    if (!!props.errorMessage) handleOnError();
    else handleOnErrorResolved();
  }, [props.errorMessage]);

  return (
    <StyledInputWrapDiv>
      <StyledPlaceholder state={state}>
        {props.placeholder}
      </StyledPlaceholder>
      {
        props.type == 'textarea' && <>
          <StyledTextarea
            className={props.className}
            css={props.css}
            ref={ref}
    
            ellipsis={props.ellipsis}
            enable={props.enable}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            palette={props.palette}
    
            type={props.type ?? 'text'}
            required={props.required}
            placeholder=''
            errorMessage={props.errorMessage}
            rows={props.rows}
            cols={props.cols}
    
            state={state}
          />
        </>
      }
      {
        props.type != 'textarea' && <>
          <StyledInput
            className={props.className}
            css={props.css}
            ref={ref}
    
            ellipsis={props.ellipsis}
            enable={props.enable}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            palette={props.palette}
    
            type={props.type ?? 'text'}
            required={props.required}
            placeholder=''
            errorMessage={props.errorMessage}
    
            state={state}
          />
        </>
      }
      <StyledErrorMessage state={state}>
        {props.errorMessage}
      </StyledErrorMessage>
    </StyledInputWrapDiv>
  );
});

export default Textfield;
