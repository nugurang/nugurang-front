import type { CommonComponentProps } from '@/src/components/common';
import Div from '@/src/components/quarks/div/Div';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  domActive: boolean;
}

const StyledWrap = styled(Div)<ViewProps>`
  ${(props: any) => `
    display: ${props.domActive ? 'block' : 'none'};
  `}
`;

const DOMToggleProviderView: React.FC<ViewProps> = props => {
  return (
    <StyledWrap {...props} >
      { props.children }
    </StyledWrap>
  );
}

export default DOMToggleProviderView;