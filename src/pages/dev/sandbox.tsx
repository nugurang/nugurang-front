import { useContext, useState } from 'react';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import CircularLoader from '@/components/progress/CircularLoader';
import Container from '@/compositions/container/Container';
import Grid from '@/components/layout/Grid';
import Multistage from '@/components/layout/Multistage';
import Section from '@/compositions/page/Section';
import Text from '@/components/text/Text';
import { ThemeContext } from '@/components/theme';
import Modal from '@/components/layout/Modal';
import Card from '@/components/paper/Card';
import Dialog from '@/compositions/common/Dialog';

export default () => {
  const { theme, setThemeKey } = useContext(ThemeContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <Container centerizeVertically>
        <Section>
          <Grid stage={4} gap='8px'>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
          </Grid>
          <CircularLoader size='96px'/>
          <Multistage stage={2} minWidth={'40px'} gap='8px'>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
            <Text>{theme.palette.primary.main}</Text>
          </Multistage>
          <ButtonGroup>
            <Button onClick={() => setThemeKey('light')}>Light</Button>
            <Button onClick={() => setThemeKey('dark')}>Dark</Button>
            <Button
              isLoading={isLoading}
              onClick={() => setLoading((loading: boolean) => !loading)}
            >
              Toggle Loading
            </Button>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </ButtonGroup>
        </Section>
        <Dialog
          open={isModalOpen}
          title='Test Title'
          content='Test Content'
          onClickBackdrop={() => setModalOpen(false)}
        >
          <ButtonGroup>
            <Button
              fillVariant='filled'
              palette='default'
            >
              Yes
            </Button>
            <Button
              fillVariant='filled'
              palette='error'
            >
              No
            </Button>
          </ButtonGroup>
        </Dialog>
      </Container>
    </>
  );
};
