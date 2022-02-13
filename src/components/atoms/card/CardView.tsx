import type { CommonComponentProps } from '@/src/components/common';
import Div from '@/src/components/quarks/div/Div';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {}

const StyledWrapDiv = styled(Div)`
  ${(props: any) => `
    ${props.css || ''}
  `}
`;

const CardView: React.FC<ViewProps> = props => {
  return (
    <StyledWrapDiv
      {...props}
    >
      { props.children }
    </StyledWrapDiv>
  );
}

export default CardView;
