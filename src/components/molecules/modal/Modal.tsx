import { useEffect, useState } from 'react';

import type { CommonComponentProps } from '@/components/common';
import ModalView from '@/components/molecules/modal/ModalView';
import React from 'react';

interface ComponentProps extends CommonComponentProps {
  children?: React.ReactNode;
  className?: string;
  open: boolean;
  onClickBackdrop: (() => void) | undefined;
}

const Modal: React.FC<ComponentProps> = props => {
  const [enable, setEnable] = useState(props.open);
  const [cssActive, setCSSActive] = useState(props.open);
  
  useEffect(() => {
    setEnable(props.open);
  }, [props.open]);

  let viewProps = {
    ...props,
    enable,
    cssActive,
    setCSSActive
  };

  return (
    <ModalView {...viewProps} />
  );
}

export default Modal;
