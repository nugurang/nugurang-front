import type { CommonComponentProps } from '@/components/common';
import { CommonStyledAttributes } from '@/components/common';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  ordered?: boolean;
}

const StyledOl = styled.ol<ViewProps>`
  ${(props: any) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const StyledUl = styled.ul<ViewProps>`
  ${(props: any) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const ListView: React.FC<ViewProps> = props => {
  if (props.ordered) return (
    <StyledOl {...props} >
      { props.children }
    </StyledOl>
  );
  else return (
    <StyledUl {...props} >
      { props.children }
    </StyledUl>
  );
}

export default ListView;
