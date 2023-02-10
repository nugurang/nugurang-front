import { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import ButtonBase from '../base/ButtonBase';

interface AccordionWrapProps {
  fullWidth?: boolean;
}
const AccordionWrap = styled.div<AccordionWrapProps>`
  display: block;
  position: relative;
  width: 100%;
`;

interface AccordionTitleWrapProps {
  isOpen: boolean;
}
const AccordionTitleWrap = styled.div<AccordionTitleWrapProps>`
  display: block;
  width: 100%;
`;

interface AccordionContentWrapProps {
  isOpen: boolean;
}
const AccordionContentWrap = styled.div<AccordionContentWrapProps>`
  display: block;
  ${props => props.isOpen ? '' : 'height: 0;'}
  width: 100%;
  overflow: hidden;
`;

interface Props {
  children: ReactNode | string;
  title: ReactNode | string;
  isOpen: boolean;
  onClickTitle: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    children,
    title,
    isOpen,
    onClickTitle,
  } = props;

  return (
    <AccordionWrap>
      <AccordionTitleWrap
        isOpen={isOpen}
      >
        <ButtonBase fullWidth onClick={onClickTitle}>
          {title}
        </ButtonBase>
      </AccordionTitleWrap>
      <AccordionContentWrap
        isOpen={isOpen}
      >
        <div>{children}</div>
      </AccordionContentWrap>
    </AccordionWrap>
  );
}
