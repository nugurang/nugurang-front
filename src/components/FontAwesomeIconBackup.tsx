import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { NextPage } from 'next';
import React from "react";
import { FontAwesomeIcon as ReactFontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CssProps {
  className?: string;
  css?: string;
  icon?: IconProp;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
}

const FontAwesomeIcon: NextPage<ComponentProps> = ({
  className,
  css,
  icon
}) => {
    return (
      <ReactFontAwesomeIcon
        className={className}
        css={css}
        icon={icon || ['fas', 'question']}
        fixedWidth
      />
    );
}
export default FontAwesomeIcon;
