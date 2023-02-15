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
  innerHeight: number;
}
const ListInnerWrap = styled.div<ListInnerWrapProps>`
  position: relative;
  height: ${props => props.innerHeight}px;
`;

interface ListItemProps {
  ref?: React.RefObject<HTMLLIElement>;
  top: number;
}
const ListItem = styled.li<ListItemProps>`
  position: absolute;
  top: ${props => props.top}px;
  width: 100%;
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
  itemHeight: number;
  windowHeight: number;
  onInitialize: () => void;
  onEndOfListReached: () => void;
}
export default (props: Props) => {
  const { 
    children,
    itemHeight,
    windowHeight,
    onInitialize,
    onEndOfListReached,
  } = props;

  const itemsCount = useMemo(() => React.Children.toArray(children).length, [children]);
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listEndObserveeRef = useRef<(HTMLDivElement | null)>(null);

  const [scrollTop, setScrollTop] = useState(0);
  const innerHeight = useMemo(() => itemsCount * itemHeight, [itemsCount, itemHeight])
  const startIndex = useMemo(() =>  Math.floor(scrollTop / itemHeight), [children, scrollTop, itemHeight])
  const endIndex = useMemo(() => Math.min(
    itemsCount,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  ), [children, scrollTop, windowHeight, itemHeight])

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
    initializeListEndObserver();
    onInitialize();
  }, []);

  useEffect(() => {
    console.log(endIndex)
  }, [endIndex]);

  return (
    <ListWrap
      height={windowHeight}
      onScroll={onScroll}
    >
      <ListInnerWrap
        innerHeight={innerHeight}
      >
        {React.Children.toArray(children).map((child, index) => (
          (index >= startIndex && index < endIndex) ? (
            <ListItem
              key={index}
              ref={element => listItemRefs.current[index] = element}
              data-index={String(index)}
              top={index * itemHeight}
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
