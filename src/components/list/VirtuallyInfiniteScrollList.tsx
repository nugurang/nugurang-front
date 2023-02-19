import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import React from 'react';
import CircularLoader from '../progress/CircularLoader';

interface ListWrapProps {
  ref?: React.RefObject<HTMLDivElement>;
  height?: string;
}
const ListWrap = styled.div<ListWrapProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

interface ListHeaderWrapProps {
  ref?: React.RefObject<HTMLDivElement>;
  gap?: string;
}
const ListHeaderWrap = styled.div<ListHeaderWrapProps>`
  padding-bottom: ${props => props.gap};
`;

interface ListInnerWrapProps {
  gap?: string;
  paddingTop: number;
}
const ListInnerWrap = styled.ul<ListInnerWrapProps>`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.gap ?? '0'};
  position: relative;
  padding-top: ${props => props.paddingTop}px;
`;

interface ListItemProps {
  ref?: (element: HTMLLIElement | null) => HTMLLIElement | null;
  column: number;
  gap?: string;
}
const ListItem = styled.li<ListItemProps>`
  ${props => `
    flex-grow: 1;
    flex-basis: calc(${100 / props.column}% - (${props.gap ?? '0'} * (${props.column} - 1) / ${props.column}));
    max-width: calc(${100 / props.column}% - (${props.gap ?? '0'} * (${props.column} - 1) / ${props.column}));
  `}
`;

interface ListEndObserveeProps {
  ref?: React.RefObject<HTMLDivElement>;
}
const ListEndObservee = styled.div<ListEndObserveeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 156px;
  width: 100%;
`;

interface Props {
  listHeader?: ReactNode | string;
  children: ReactNode | string;
  column?: number;
  listHeight?: string;
  listItemMinWidthPixel?: number;
  gap?: string;
  isLoading: boolean;
  hasNextPage: boolean;
  onInitialize?: () => void;
  onLoadMore: () => void;
}
export default (props: Props) => {
  const {
    listHeader,
    children,
    listHeight,
    listItemMinWidthPixel,
    gap = '8px',
    isLoading,
    hasNextPage,
    onInitialize,
    onLoadMore,
  } = props;

  const [scrollTop, setScrollTop] = useState<number>(0);
  const [itemHeightMemo, setItemHeightMemo] = useState<number[]>([]);
  const [maxItemHeightPerChunkMemo, setMaxItemHeightPerChunkMemo] = useState<number[]>([]);
  const listWrapRef = useRef<(HTMLDivElement | null)>(null);
  const listHeaderWrapRef = useRef<(HTMLDivElement | null)>(null);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listEndObserverRef = useRef<IntersectionObserver>();
  const listEndObserveeRef = useRef<(HTMLDivElement | null)>(null);

  const [windowHeight, setWindowHeight] = useState<number | undefined>(undefined);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);
  const [column, setColumn] = useState<number>(1);
  
  const itemsCount = useMemo(() => React.Children.toArray(children).length, [children]);
  
  useEffect(() => {
    const chunkedItemHeightMemo = [];
    for (let index = 0; index < itemHeightMemo.length; index += column) {
      chunkedItemHeightMemo.push(itemHeightMemo.slice(index, index + column));
    }
    setMaxItemHeightPerChunkMemo(chunkedItemHeightMemo.map(chunk => Math.max(...chunk)));
  }, [itemHeightMemo, column]);

  const innerPaddingTop = useMemo(() => {
    const indexOnlyPositive = startIndex - column >= 0 ? startIndex - column : 0;
    return maxItemHeightPerChunkMemo.slice(
      0,
      indexOnlyPositive / column
    ).reduce((acc, item) => acc + item, 0);
  }, [maxItemHeightPerChunkMemo, itemsCount, startIndex, column]);

  const onScroll = (e: {
    currentTarget: {
      scrollTop: React.SetStateAction<number>;
    };
  }) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  useEffect(() => {
    const measure = () => {
      if(listWrapRef.current) {
        setWindowHeight(_ => listWrapRef.current?.clientHeight);
        setWindowWidth(_ => listWrapRef.current?.clientWidth);

        let newColumn = 1;
        if(windowWidth && listItemMinWidthPixel) {
          newColumn = Math.floor(windowWidth / listItemMinWidthPixel);
        }
        setColumn(_ => newColumn > 0 ? newColumn : 1);
      }
    }
    measure();
    window.addEventListener("resize", measure );
    return () => {
      window.removeEventListener("resize", measure );
    };
  }, [windowWidth, listItemMinWidthPixel]);

  useEffect(() => {
    const listHeaderWrapHeight = listHeaderWrapRef.current?.clientHeight ?? 0;
    let acc = listHeaderWrapHeight ?? 0;
    let isStartIndexDecided = false;
    let nextStartIndex = 0;
    let endIndex = Number.MAX_SAFE_INTEGER;
    for(let index = 0; index <= itemsCount; index += column) {
      if(acc >= scrollTop && !isStartIndexDecided) {
        nextStartIndex = index;
        isStartIndexDecided = true;
      } else if(windowHeight && (acc >= scrollTop + windowHeight)) {
        endIndex = Math.min(index);
        break;
      }
      acc += maxItemHeightPerChunkMemo[index / column];
    }
    setStartIndex(_ => nextStartIndex);
    setEndIndex(_ =>  Math.min(itemsCount, endIndex));
  }, [
    listWrapRef.current?.clientHeight,
    column,
    itemHeightMemo,
    itemsCount,
    scrollTop
  ]);

  useEffect(() => {
    const newItemHeightMemo = [...itemHeightMemo];
    for(let index = startIndex; index <= endIndex; index++) {
      if(listItemRefs.current[index]) {
        const newItemHeight = listItemRefs.current[index]?.clientHeight ?? 0;
        if(newItemHeight > 0) {
          newItemHeightMemo[index] = newItemHeight;
        }
      }
    }
    setItemHeightMemo(newItemHeightMemo);
  }, [listItemRefs, startIndex, endIndex]);

  useEffect(() => {
    const listEndObservee = listEndObserveeRef.current;
    if (!listEndObservee || !hasNextPage) return;

    const onListEndIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting && hasNextPage) {
          onLoadMore();
        }
      });
    };

    listEndObserverRef.current = new IntersectionObserver(onListEndIntersect, { threshold: 0 });
    listEndObserverRef.current.observe(listEndObservee);
    return () => {
      listEndObserverRef.current && listEndObserverRef.current.disconnect();
    };
  }, [hasNextPage]);

  useEffect(() => {
    if(!isLoading
      && hasNextPage
      && listEndObserverRef.current
      && listEndObserveeRef.current
    ) {
      listEndObserverRef.current.observe(listEndObserveeRef.current);
    } else if(isLoading && listEndObserverRef.current) {
      listEndObserverRef.current.disconnect();
    }
  }, [isLoading]);
  
  return (
    <ListWrap
      ref={listWrapRef}
      onScroll={onScroll}
      height={listHeight}
    >
      <ListHeaderWrap
        ref={listHeaderWrapRef}
        gap={gap}
      >
        {listHeader}
      </ListHeaderWrap>
      <ListInnerWrap
        gap={gap}
        paddingTop={innerPaddingTop}
      >
        {React.Children.toArray(children).map((child, index) => (
          ((index >= startIndex - column) && (index <= endIndex)) && (
            <ListItem
              key={index}
              ref={element => listItemRefs.current[index] = element}
              data-index={String(index)}
              column={column}
              gap={gap}
            >
              {child}
            </ListItem>
          )
        ))}
      </ListInnerWrap>
      <ListEndObservee
        key='end'
        ref={listEndObserveeRef}
      >
        {isLoading && (
          <CircularLoader />
        )}
        {!hasNextPage && (
          <div>No more item.</div>
        )}
      </ListEndObservee>
    </ListWrap>
  );
}
