import { useEffect, useState } from 'react';

import type { CommonComponentProps } from '@/src/components/common';
import React from 'react';
import TextfieldView from '@/src/components/atoms/textfield/TextfieldView';

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
    hover: false,
    focus: false,
    error: !!props.errorMessage
  })
  
  const handleInput = () => {
    if (props.onInput) props.onInput();
  };
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

  const viewProps = {
    ...props,
    type: props.type ?? 'text',
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
