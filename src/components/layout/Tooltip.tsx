import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from '@emotion/styled';
import { useElementDistanceFromViewport, UseElementDistanceFromViewportDistance } from '@/components/common'

interface TooltipOuterWrapProps {
}
const TooltipOuterWrap = styled.div<TooltipOuterWrapProps>`
  position: relative;
`;

interface TooltipInnerWrapProps {
  ref?: React.RefObject<HTMLDivElement>;
  show: boolean;
  marginNumber?: number;
  distanceFromViewport: UseElementDistanceFromViewportDistance;
}
const TooltipInnerWrap = styled.div<TooltipInnerWrapProps>`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  overflow: visible;
  z-index: 100;
  ${props => props.distanceFromViewport.bottom < 0 ? 'bottom: 0;' : 'top: 100%;'}
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
  content: ReactNode | string;
  delay?: number;
  marginNumber?: number;
}
export default (props: Props) => {
  const {
    children,
    content,
    delay,
    marginNumber,
  } = props;

  let timeout: string | number | NodeJS.Timeout | undefined;
  const [active, setActive] = useState(false);
  const tooltipInnerWrapRef = useRef<HTMLDivElement>(null);
  const [distanceFromViewport, handleResize] = useElementDistanceFromViewport(tooltipInnerWrapRef);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 0);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  useEffect(() => {
    (handleResize as Function)();
  }, [active]);

  return (
    <TooltipOuterWrap
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      <TooltipInnerWrap
        ref={tooltipInnerWrapRef}
        show={active}
        marginNumber={marginNumber}
        distanceFromViewport={distanceFromViewport as UseElementDistanceFromViewportDistance}
      >
        {content}
      </TooltipInnerWrap>
    </TooltipOuterWrap>
  );
};
