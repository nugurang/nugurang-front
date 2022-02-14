import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import Button from '@/src/components/atoms/button/Button';
import Div from '@/src/components/quarks/div/Div';
import Image from '@/src/components/atoms/image/Image';
import { hexToRGB } from '@/src/utils/color';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  imageUrl?: string;
  title?: string;
  state: ThumbnailStateObject;
}

interface ButtonProps extends CommonComponentProps {
  state: ThumbnailStateObject;
}

interface NameDivProps extends CommonComponentProps {}

const StyledButton = styled(Button)<ButtonProps>`
  ${(props: any) => `
    overflow: hidden;
    height: 128px;
    ${props.theme.screenSizeMediaQuery.gteMobile} {
      height: 192px;
    }
    &:active {
      transform: scale(0.95);
    }
  `}
`;

const StyledImage = styled(Image)`
  ${(props: any) => `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `}
`;

const StyledNameDiv = styled(Div)<NameDivProps>`
  ${(props: any) => `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    padding: 16px;
    font-size: 20px;

    color: #fff;
    border-radius: 0;
    background-color: ${hexToRGB(props.theme.palette.primary.light, 0.9)};
    @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
    };
  `}
`;

const ThumbnailView: React.FC<ViewProps> = props => {
  return (
    <StyledButton
      className={props.className}
      css={props.css}
      variant='transparent'
      onClick={props.onClick}
      state={props.state}
    >
      <StyledImage src={props.imageUrl}/>
      <StyledNameDiv
        palette={props.palette}
        ellipsis={1}
      >
        {props.title}
      </StyledNameDiv>
    </StyledButton>
  );
}

export default ThumbnailView;