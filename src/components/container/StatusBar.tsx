import styled from '@emotion/styled';
import Card from '../layout/Card';

interface StatusBarProps {
  show?: boolean;
}
const StatusBarOuterWrap = styled.div<StatusBarProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  height: 48px;
  z-index: 200;
`;
const StatusBarInnerWrap = styled.div<StatusBarProps>`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background-color: #ff0;
`;

interface Props {
  show?: boolean;
}
export default (props: Props) => {
  const {
    show
  } = props;

  return (
    <StatusBarOuterWrap show={show}>
      <Card fullSize roundCorner={false}>
        <StatusBarInnerWrap>
          nugurang
        </StatusBarInnerWrap>
      </Card>
    </StatusBarOuterWrap>
  );
}
