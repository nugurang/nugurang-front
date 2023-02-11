import styled from '@emotion/styled';
import Box from '@/components/layout/Box';
import Card from '@/components/paper/Card';

const Sidebar = styled.aside`
  display: block;
  margin: 0 auto;
  width: 100%;
`;

interface Props {
}
export default (props: Props) => {
  const {
  } = props;

  return (
    <Sidebar>
      <Card>
        {Array.from(Array(50).keys()).map((count: number) => (
          <Box
            key={count}
            horizontalPaddingLevel={2}
            verticalPaddingLevel={2}
          >
            Test {count}
          </Box>
        ))}
      </Card>
    </Sidebar>
  );
}
