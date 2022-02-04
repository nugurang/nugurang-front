import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { NextPage } from 'next';
import React from "react";
import { FontAwesomeIcon as ReactFontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SizeKeys = 'small'
              | 'medium'
              | 'large';

const iconSize = {
  small: '16px',
  medium: '24px',
  large: '32px',
};

interface CssProps {
  icon?: IconProp;
  size?: SizeKeys;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
}

const FontAwesomeIcon: NextPage<ComponentProps> =  ({ icon, size }) => {
    return (
      <ReactFontAwesomeIcon
        icon={icon || ['fas', 'question']}
        fixedWidth
        style={{
          height: iconSize[`${size || 'medium'}`],
          width: iconSize[`${size || 'medium'}`],
        }}
      />
    );
}
export default FontAwesomeIcon;
