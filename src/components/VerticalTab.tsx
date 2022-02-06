import { useEffect, useState } from 'react';

import Button from '@/src/components/base/Button';
import Card from '@/src/components/Card';
import type { CommonProps } from '@/src/components/base/common';
import Div from '@/src/components/base/Div';
import Icon from '@/src/components/Icon';
import type { IconObject } from '@/src/components/Icon';
import List from '@/src/components/List';
import ListItem from '@/src/components/ListItem';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

export interface TabItem {
  name: string;
  icon?: IconObject;
  title?: string;
  subtitle?: string;
  onClickTitle?: () => void;
  child?: React.ReactNode;
}

interface ComponentProps extends CommonProps {
  ordered?: boolean;
  tabItems: TabItem[];
  initialIndex?: number;
  initialDepth?: number;
}

interface StyledProps extends CommonProps {
  depth: number;
}

const StyledWrapCard = styled(Card)<StyledProps>`
  ${(props: StyledProps) => `
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

const StyledTitleListWrapCard = styled(Card)<StyledProps>`
  ${(props: StyledProps) => `
    width: 100%;
    ${props.theme.screenSizeMediaQuery.gteTablet}
      max-width: 360px;
    }
  `}
`;

const StyledTitleList = styled(List)<StyledProps>`
  ${(props: StyledProps) => `
    display: block;
    padding: 8px;
  `}
`;

const StyledTitleItem = styled(ListItem)<StyledProps>`
  ${(props: StyledProps) => `
  
  `}
`;

const StyledTitleItemButton = styled(Button)<StyledProps>`
  ${(props: StyledProps) => `
    clear: both;
    display: block;
    width: 100%;
    padding: 8px;
  `}
`;

const StyledTitleItemIcon = styled(Icon)<StyledProps>`
  ${(props: StyledProps) => `
    float: left;
    height: 28px;
    width: 28px;
    margin-right: 16px;
  `}
`;

const StyledTitleItemTextDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    overflow: hidden;
    margin: 2px 0;
    vertical-align: top;
  `}
`;

const StyledTitleItemTitleDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
  `}
`;

const StyledTitleItemSubtitleDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
  `}
`;

const StyledContentDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    display: ${props.depth > 0 ? 'block' : 'none'};
    float: left;
    overflow: hidden;
    padding: 8px;
  `}
`;

const VerticalTab: NextPage<ComponentProps> = props => {
  const [selectedTab, setSelectedTab] = useState({
    index: props.initialIndex ?? 0,
    depth: props.initialDepth ?? 0
  });

  return (
    <StyledWrapCard
      className={props.className}
      css={props.css}
      depth={selectedTab.depth}
    >
      <StyledTitleListWrapCard>
        <StyledTitleList
          variant='outlined'
        >
          {
            props.tabItems
            .map((tabItem: TabItem, index: number) => {
              return <StyledTitleItem key={index}>
                <StyledTitleItemButton
                  variant='transparent'
                  onClick={() => {
                    if (!!tabItem.onClickTitle) tabItem.onClickTitle();
                    else {
                      setSelectedTab((selectedTab: any) => ({
                        ...selectedTab,
                        index,
                        depth: 1
                      }));
                    }
                  }}
                >
                  <StyledTitleItemIcon
                    type={tabItem?.icon?.type}
                    src={tabItem?.icon?.src}
                  />
                  <StyledTitleItemTextDiv>
                    <StyledTitleItemTitleDiv>
                      {tabItem.title}
                    </StyledTitleItemTitleDiv>
                    <StyledTitleItemSubtitleDiv>
                      {tabItem.subtitle}
                    </StyledTitleItemSubtitleDiv>
                  </StyledTitleItemTextDiv>
                </StyledTitleItemButton>
              </StyledTitleItem>
            })
          }
        </StyledTitleList>
      </StyledTitleListWrapCard>
      <StyledContentDiv
        depth={selectedTab.depth}
      >
        {props.tabItems.length > 0 && props.tabItems[selectedTab.index].child}
      </StyledContentDiv>
    </StyledWrapCard>
  );
}

export default VerticalTab;
