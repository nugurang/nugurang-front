import { useEffect, useState } from 'react';

import type { CommonComponentProps } from '@/components/common';
import React from 'react';
import TextfieldView from '@/components/atoms/textfield/TextfieldView';

interface ComponentProps extends CommonComponentProps {
  children?: React.ReactNode;
  type?: TextfieldTypeKeys;
  onInput?: () => void;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  rows?: number;
  cols?: number;
}

const Textfield: React.FC<ComponentProps> = props => {
  const [state, setState] = useState({
    isHover: false,
    isFocus: false,
    isError: !!props.errorMessage
  })
  
  const handleInput = () => {
    if (props.onInput) props.onInput();
  };
  const handleMouseEnter = () => {
    setState({
      ...state,
      isHover: true
    });
    if (props.onMouseEnter) props.onMouseEnter();
  };
  const handleMouseLeave = () => {
    setState({
      ...state,
      isHover: false
    });
    if (props.onMouseLeave) props.onMouseLeave();
  };
  const handleOnFocus = () => {
    setState({
      ...state,
      isFocus: true
    });
    if (props.onFocus) props.onFocus();
  };
  const handleOnBlur = () => {
    setState({
      ...state,
      isFocus: false
    });
    if (props.onBlur) props.onBlur();
  };
  const handleOnError = () => {
    setState({
      ...state,
      isError: true
    });
  };
  const handleOnErrorResolved = () => {
    setState({
      ...state,
      isError: false
    });
  };

  useEffect(() => {
    if (!!props.errorMessage) handleOnError();
    else handleOnErrorResolved();
  }, [props.errorMessage]);

  const viewProps = {
    ...props,
    type: props.type ?? 'text',
    state,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur
  };

  return (
    <TextfieldView {...viewProps} />
  );

};

export default Textfield;
