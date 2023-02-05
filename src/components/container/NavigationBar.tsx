import styled from '@emotion/styled';
import Card from '../layout/Card';

interface NavigationBarProps {
  show?: boolean;
}
const NavigationBarMobile = styled.div<NavigationBarProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  z-index: 100;

  bottom: 0;
  height: 48px;
  width: 100%;
  transition: height 500ms cubic-bezier(0.16, 1, 0.3, 1);
  &:hover {
    height: 72px;
    max-height: 100vh;
  }
`;
const NavigationBarDesktop = styled.div<NavigationBarProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  z-index: 100;

  left: 0;
  height: 100%;
  width: 48px;
  transition: width 500ms cubic-bezier(0.16, 1, 0.3, 1);
  &:hover {
    width: 240px;
    max-width: 100vw;
  }
`;

interface Props {
  isMobileView: boolean;
  show?: boolean;
}
export default (props: Props) => {
  const {
    isMobileView,
    show
  } = props;

  if(isMobileView) return (
    <NavigationBarMobile show={show}>
      <Card fullSize roundCorner={false}>
        Nv
      </Card>
    </NavigationBarMobile>
  );
  else return (
    <NavigationBarDesktop show={show}>
      <Card fullSize roundCorner={false}>
        Nv
      </Card>
    </NavigationBarDesktop>
  )
}
