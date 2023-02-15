import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import React from 'react';

interface ListWrapProps {
  height: number;
}
const ListWrap = styled.div<ListWrapProps>`
  height: ${props => props.height}px;
  width: 100%;
  overflow-y: scroll;
`;

interface ListInnerWrapProps {
  paddingTop: number;
}
const ListInnerWrap = styled.ul<ListInnerWrapProps>`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding-top: ${props => props.paddingTop}px;
`;

interface ListItemProps {
  ref?: React.RefObject<HTMLLIElement>;
  column: number;
  width?: number;
  top: number;
  height?: number;
}
const ListItem = styled.li<ListItemProps>`
  flex-basis: calc(100% / ${props => props.column});
`;

interface ListEndObserveeProps {
  ref?: React.RefObject<HTMLDivElement>;
}
const ListEndObservee = styled.div<ListEndObserveeProps>`
  height: 200px;
  width: 100%;
`;

interface Props {
  children: ReactNode | string;
  column?: number;
  itemHeight: number;
  windowHeight: number;
  onInitialize: () => void;
  onEndOfListReached: () => void;
}
export default (props: Props) => {
  const { 
    children,
    column = 1,
    itemHeight,
    windowHeight,
    onInitialize,
    onEndOfListReached,
  } = props;

  const sum = (list: number[]) => list.reduce((acc, item) => acc + item, 0);
  const itemsCount = useMemo(() => React.Children.toArray(children).length, [children]);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listEndObserveeRef = useRef<(HTMLDivElement | null)>(null);
  const [itemHeightMemo, setItemHeightMemo] = useState<number[]>([]);
  const maxItemHeightPerChunkMemo = useMemo(() => {
    const chunkedItemHeightMemo = [];
    for (let index = 0; index < itemHeightMemo.length; index += column) {
      chunkedItemHeightMemo.push(itemHeightMemo.slice(index, index + column));
    }
    return chunkedItemHeightMemo.map(chunk => Math.max(...chunk));
  }, [itemHeightMemo, column]);

  const [scrollTop, setScrollTop] = useState(0);

  const [startIndex, endIndex] = useMemo(() => {
    let acc = 0;
    let isStartIndexDecided = false;
    let startIndex = 0;
    let endIndex = Number.MAX_SAFE_INTEGER;
    for(let index = 0; index <= itemsCount; index += column) {
      if(acc >= scrollTop && !isStartIndexDecided) {
        startIndex = index;
        isStartIndexDecided = true;
      } else if(acc >= scrollTop + windowHeight) {
        endIndex = Math.min(index);
        break;
      }
      acc += maxItemHeightPerChunkMemo[index / column];
    }
    return [startIndex, Math.min(itemsCount, endIndex)];
  }, [column, itemHeightMemo, itemsCount, scrollTop, windowHeight]);
  const innerPaddingTop = useMemo(() => {
    const indexOnlyPositive = startIndex - column >= 0 ? startIndex - column : 0;
    return sum(maxItemHeightPerChunkMemo.slice(0, indexOnlyPositive / column));
  }, [itemHeightMemo, itemsCount, startIndex, column]);

  const onScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  let listEndObserver: IntersectionObserver;
  const onListEndIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        const observee = listEndObserveeRef.current;
        listEndObserver.disconnect();
        onEndOfListReached();
        observee && listEndObserver.observe(observee);
      }
    });
  };
  const initializeListEndObserver = () => {
    const observee = listEndObserveeRef.current;
    listEndObserver = new IntersectionObserver(onListEndIntersect, { threshold: 0 });
    observee && listEndObserver.observe(observee);
  };

  useEffect(() => {
    const newItemHeightMemo = [...itemHeightMemo];
    for(let index = startIndex; index <= endIndex; index++) {
      if(listItemRefs.current[index]) {
        const newItemHeight = listItemRefs.current[index].clientHeight;
        if(newItemHeight > 0) {
          newItemHeightMemo[index] = newItemHeight;
        }
      }
    }
    setItemHeightMemo(newItemHeightMemo);
  }, [listItemRefs, startIndex, endIndex]);

  useEffect(() => {
    initializeListEndObserver();
    onInitialize();
  }, []);

  return (
    <ListWrap
      height={windowHeight}
      onScroll={onScroll}
    >
      <ListInnerWrap
        paddingTop={innerPaddingTop}
      >
        {React.Children.toArray(children).map((child, index) => (
          ((index >= startIndex - column) && (index <= endIndex)) ? (
            <ListItem
              key={index}
              ref={element => listItemRefs.current[index] = element}
              data-index={String(index)}
              column={column}
              top={index * itemHeight}
              height={itemHeight}
            >
              {child}
            </ListItem>
          )
          : <></>
        ))}
      </ListInnerWrap>
      <ListEndObservee
        key='end'
        ref={listEndObserveeRef}
      />
    </ListWrap>
  );
}
