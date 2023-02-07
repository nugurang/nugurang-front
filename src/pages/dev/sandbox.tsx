import { useContext } from "react";
import Button from '@/components/button/Button';
import Container from '@/compositions/container/Container';
import { ThemeContext } from '@/components/theme';

export default () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Container centerizeVertically>
      {theme.palette.primary.main}
      <Button onClick={() => toggleTheme()}>Toggle theme</Button>
    </Container>
  );
};
