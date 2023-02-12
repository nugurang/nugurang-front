import React, { ReactNode, SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useElementDistanceFromViewport, UseElementDistanceFromViewportDistance } from '@/components/common'
import { Theme, ThemeContext } from '../theme';

export type TooltipTrigger = 'click' | 'hover';
export type TooltipBaseDirection = 'left' | 'right';

interface TooltipOuterWrapProps {
}
const TooltipOuterWrap = styled.div<TooltipOuterWrapProps>`
  position: relative;
`;

interface TooltipInnerWrapProps {
  theme: Theme;
  ref?: React.RefObject<HTMLDivElement>;
  show: boolean;
  baseDirection: TooltipBaseDirection;
  marginNumber?: number;
  distanceFromViewport: UseElementDistanceFromViewportDistance;
}
const TooltipInnerWrap = styled.div<TooltipInnerWrapProps>`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  overflow: visible;
  ${props => props.baseDirection === 'left' ? `
    left: 0;
  ` : ''}
  ${props => props.baseDirection === 'right' ? `
    right: 0;
  ` : ''}
  z-index: ${props => props.theme.zIndex.tooltip};

  ${props => props.distanceFromViewport.bottom < 0
    ? 'bottom: 0;'
    : 'top: 100%;'
  }
  ${true && (props => {
    const prefix = 'transform: translate(';
    const suffix = ');';
    const transform = {
      x: '0px',
      y: '0px',
    };
    const marginNumber = props.marginNumber ?? 0;

    if(props.distanceFromViewport.top < marginNumber) {
      transform.y = `${-(props.distanceFromViewport.top - marginNumber)}px`;
    } else if(props.distanceFromViewport.bottom < marginNumber) {
      transform.y = `${(props.distanceFromViewport.bottom - marginNumber)}px`;
    }
    if(props.distanceFromViewport.left < marginNumber) {
      transform.x = `${-(props.distanceFromViewport.left - marginNumber)}px`;
    } else if(props.distanceFromViewport.right < marginNumber) {
      transform.x = `${(props.distanceFromViewport.right - marginNumber)}px`;
    }

    return prefix + transform.x + ', ' + transform.y + suffix;
  })}
`;

interface Props {
  children: ReactNode | string;
  isOpen: boolean;
  setOpen: (_: boolean) => void;
  content: ReactNode | string;
  baseDirection?: TooltipBaseDirection;
  delay?: number;
  marginNumber?: number;
  trigger?: TooltipTrigger;
}
export default (props: Props) => {
  const {
    children,
    isOpen,
    setOpen,
    content,
    baseDirection,
    delay,
    marginNumber,
    trigger = 'click',
  } = props;
  const { theme } = useContext(ThemeContext);

  let timeout: string | number | NodeJS.Timeout | undefined;
  const tooltipOuterWrapRef = useRef<HTMLDivElement>(null);
  const tooltipInnerWrapRef = useRef<HTMLDivElement>(null);
  const [distanceFromViewport, handleResize] = useElementDistanceFromViewport(tooltipInnerWrapRef);

  const showTooltip = (eventTrigger: TooltipTrigger) => {
    if(eventTrigger === trigger) {
      timeout = setTimeout(() => {
        setOpen(true);
      }, delay || 0);
    }
  };

  const hideTooltip = (eventTrigger: TooltipTrigger) => {
    if(eventTrigger === trigger) {
      setOpen(false);
      clearInterval(timeout);
    }
  };

  useEffect(() => {
    if(isOpen) {
      (handleResize as Function)();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (tooltipInnerWrapRef.current && !tooltipInnerWrapRef.current.contains(event.target)) {
        hideTooltip('click');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <TooltipOuterWrap
      ref={tooltipOuterWrapRef}
      onClick={() => showTooltip('click')}
      onMouseEnter={() => showTooltip('hover')}
      onMouseLeave={() => hideTooltip('hover')}
    >
      {children}
      <TooltipInnerWrap
        ref={tooltipInnerWrapRef}
        theme={theme}
        show={isOpen}
        baseDirection={baseDirection ?? 'left'}
        marginNumber={marginNumber}
        distanceFromViewport={distanceFromViewport as UseElementDistanceFromViewportDistance}
      >
        {content}
      </TooltipInnerWrap>
    </TooltipOuterWrap>
  );
};
