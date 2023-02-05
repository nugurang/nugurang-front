import styled from '@emotion/styled';

interface NavigationBarProps {
  show?: boolean;
}
const NavigationBarWrap = styled.div<NavigationBarProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  position: relative;
  height: 100%;
  width: 128px;
  background-color: #eee;
`;

interface Props {
  show?: boolean;
}
export default (props: Props) => {
  const {
    show
  } = props;

  return (
    <NavigationBarWrap show={show}>
      Nv
    </NavigationBarWrap>
  );
}
