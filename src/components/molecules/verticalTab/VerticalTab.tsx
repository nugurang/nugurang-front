import type { CommonComponentProps, CommonStyledProps } from '@/components/common';

import Button from '@/components/atoms/button/Button';
import Card from '@/components/atoms/card/Card';
import Div from '@/components/quarks/div/Div';
import Icon from '@/components/molecules/icon/Icon';
import List from '@/components/atoms/list/List';
import ListItem from '@/components/atoms/listItem/ListItem';
import VerticalTabView from '@/components/molecules/verticalTab/VerticalTabView';
import styled from '@emotion/styled';
import { useState } from 'react';

interface ComponentProps extends CommonComponentProps {
  ordered?: boolean;
  items: VerticalTabItemObject[];
  initialIndex?: number;
  initialDepth?: number;
}

interface StyledComponentProps extends CommonStyledProps {
  depth: number;
}

const StyledWrapCard = styled(Card)<StyledComponentProps>`
  ${(props: any) => `
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    & > *:nth-of-type(1) {
      display: ${props.depth > 0 ? 'none' : 'block'};
    }
    & > *:nth-of-type(2) {
      display: ${props.depth > 0 ? 'block' : 'none'};
    }
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      grid-template-columns: repeat(1, 360px 1fr);
      & > *:nth-of-type(1),
      & > *:nth-of-type(2) {
        display: block;
      }
    }
    gap: 16px;
    margin: 0 auto;
  `}
`;

const StyledTitleListWrapCard = styled(Card)`
  ${(props: any) => `
    width: 100%;
    ${props.theme.screenSizeMediaQuery.gteTablet}
      max-width: 360px;
    }
  `}
`;

const StyledTitleList = styled(List)`
  ${(props: any) => `
    display: block;
    padding: 8px;
  `}
`;

const StyledTitleItem = styled(ListItem)`
  ${(props: any) => `
  
  `}
`;

const StyledTitleItemButton = styled(Button)`
  ${(props: any) => `
    clear: both;
    display: block;
    width: 100%;
    padding: 8px;
  `}
`;

const StyledTitleItemIcon = styled(Icon)`
  ${(props: any) => `
    float: left;
    height: 28px;
    width: 28px;
    margin-right: 16px;
  `}
`;

const StyledTitleItemTextDiv = styled(Div)`
  ${(props: any) => `
    overflow: hidden;
    margin: 2px 0;
    vertical-align: top;
  `}
`;

const StyledTitleItemTitleDiv = styled(Div)`
  ${(props: any) => `
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
  `}
`;

const StyledTitleItemSubtitleDiv = styled(Div)`
  ${(props: any) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
  `}
`;

const StyledContentDiv = styled(Div)<StyledComponentProps>`
  ${(props: any) => `
    display: ${props.depth > 0 ? 'block' : 'none'};
    float: left;
    overflow: hidden;
  `}
`;

const VerticalTab: React.FC<ComponentProps> = props => {
  const [selectedTab, setSelectedTab] = useState({
    index: props.initialIndex ?? 0,
    depth: props.initialDepth ?? 0
  });

  let viewProps = {
    ...props,
    selectedTab,
    setSelectedTab
  };

  return (
    <VerticalTabView {...viewProps} />
  );
}

export default VerticalTab;
