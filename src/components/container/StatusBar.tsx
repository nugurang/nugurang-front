import styled from '@emotion/styled';

interface StatusBarProps {
  show?: boolean;
}
const StatusBarWrap = styled.div<StatusBarProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  position: relative;
  height: 32px;
  width: 100%;
  background-color: #ddd;
`;

interface Props {
  show?: boolean;
}
export default (props: Props) => {
  const {
    show
  } = props;

  return (
    <StatusBarWrap show={show}>
      nugurang
    </StatusBarWrap>
  );
}
