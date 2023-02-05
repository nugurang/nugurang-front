import styled from '@emotion/styled';
import Card from '../layout/Card';

interface NavigationBarProps {
  show?: boolean;
}
const NavigationBarOuterWrap = styled.div<NavigationBarProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  left: 0;
  height: 100%;
	transition: width 500ms cubic-bezier(0.16, 1, 0.3, 1);
  width: 48px;
  &:hover {
    width: 240px;
    max-width: 100vw;
  }
  z-index: 100;
`;
const NavigationBarInnerWrap = styled.div`
  display: flex;
`;

interface Props {
  show?: boolean;
}
export default (props: Props) => {
  const {
    show
  } = props;

  return (
    <NavigationBarOuterWrap show={show}>
      <Card fullSize roundCorner={false}>
        <NavigationBarInnerWrap>
          Nv
        </NavigationBarInnerWrap>
      </Card>
    </NavigationBarOuterWrap>
  );
}
