import { useContext, useState } from "react";
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CircularLoader from '@/components/progress/CircularLoader';
import Container from '@/compositions/container/Container';
import { ThemeContext } from '@/components/theme';

export default () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  return (
    <Container centerizeVertically>
      {theme.palette.primary.main}
      <ButtonGroup>
        <Button onClick={() => toggleTheme()}>Toggle theme</Button>
        <Button
          isLoading={isLoading}
          onClick={() => setLoading((loading: boolean) => !loading)}
        >
          Toggle Loading
        </Button>
      </ButtonGroup>
      <CircularLoader size='96px'/>
    </Container>
  );
};
