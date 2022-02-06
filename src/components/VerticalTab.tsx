import type { CommonProps, ThemeObject } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Card from '@/src/components/Card';
import Div from '@/src/components/base/Div';
import Icon from '@/src/components/Icon';
import type { IconObject } from '@/src/components/Icon';
import List from '@/src/components/List';
import ListItem from '@/src/components/ListItem';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useState } from 'react';

interface TabItem {
  icon?: IconObject;
  title?: string;
  child?: React.ReactNode;
}

interface ComponentProps extends CommonProps {
  ordered?: boolean;
  tabItems: TabItem[];
}

interface StyledProps extends CommonProps {}

const StyledWrapCard = styled(Card)<StyledProps>`
  ${(props: StyledProps) => `
    display: grid;
    grid-template-columns: repeat(1, 360px 1fr);
    gap: 16px;
    margin: 0 auto;
  `}
`;

const StyledTitleListWrapCard = styled(Card)<StyledProps>`
  ${(props: StyledProps) => `
    width: 100%;
    max-width: 360px;
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
    float: left;
    overflow: hidden;
    padding: 8px;
  `}
`;

const VerticalTab: NextPage<ComponentProps> = props => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <StyledWrapCard
      className={props.className}
      css={props.css}
    >
      <StyledTitleListWrapCard>
        <StyledTitleList
          variant='outlined'
        >
          {
            props.tabItems
            .map((tabItem: TabItem, index: number) => {
              return <>
                <StyledTitleItem key={index}>
                  <StyledTitleItemButton
                    variant='transparent'
                    onClick={() => setSelectedTabIndex(index)}
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
              </>
            })
          }
        </StyledTitleList>
      </StyledTitleListWrapCard>
      <StyledContentDiv>
        {props.tabItems.length > 0 && props.tabItems[selectedTabIndex].child}
      </StyledContentDiv>
    </StyledWrapCard>
  );
}

export default VerticalTab;
