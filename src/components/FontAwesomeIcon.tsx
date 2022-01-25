import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NextPage } from 'next';
import React from "react";
import { FontAwesomeIcon as ReactFontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export interface Props {
  icon: IconProp;
  fontSize?: string;
}

const StyledFontAwesomeIcon = styled(ReactFontAwesomeIcon)`
  ${(props: any) => `
    ${props.fontSize ? `height: ${props.fontSize};` : ''};
    ${props.fontSize ? `width: ${props.fontSize};` : ''};
  `}
`;

const FontAwesomeIcon: NextPage<Props> =  ({ icon, fontSize }) => {
    return (
       <StyledFontAwesomeIcon
         icon={icon}
         fixedWidth
         fontSize={fontSize}
       />
    );
}
export default FontAwesomeIcon;
