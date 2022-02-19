import type { CommonComponentProps, CommonStyledProps } from '@/components/common';

import Card from '@/components/atoms/card/Card';
import Div from '@/components/quarks/div/Div';
import Icon from '@/components/molecules/icon/Icon';
import SectionView from '@/components/molecules/section/SectionView';
import styled from '@emotion/styled';

interface ComponentProps extends CommonComponentProps {
  title?: string;
  icon?: IconObject;
  enableMargin?: boolean;
  enablePadding?: boolean;
}

interface StyledCardProps extends CommonStyledProps {
  enableMargin?: boolean;
}

interface StyledChildrenWrapDivProps extends CommonStyledProps {
  enablePadding?: boolean;
}

const StyledCard = styled(Card)<StyledCardProps>`
  ${(props: any) => `
    margin: ${props.enableMargin ? '8px' : '0'};
  `}
`;

const StyledHeaderDiv = styled(Div)`
  ${(props: any) => `
    padding: 16px;
    border-bottom: 1px solid ${props.theme.palette.default.high};
  `}
`;

const StyledIcon = styled(Icon)`
  ${(props: any) => `
    float: left;
    height: 28px;
    width: 28px;
    margin-right: 16px;
  `}
`;

const StyledTitleDiv = styled(Div)`
  ${(props: any) => `
    font-size: 24px;
    line-height: 28px;
    font-weight: bold;
  `}
`;

const StyledChildrenWrapDiv = styled(Div)<StyledChildrenWrapDivProps>`
  ${(props: any) => `
    padding: ${props.enablePadding ? '16px' : '0'};
  `}
`;

const Section: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <SectionView {...viewProps} />
  );

}

export default Section;
