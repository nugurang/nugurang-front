import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import { UserDTO } from '@/dtos/user';

interface NavigationButtonGroupProps {
  show?: boolean;
}
const NavigationButtonGroup = styled(ButtonGroup)<NavigationButtonGroupProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  &>*:not(:first-child) {
    margin-left: 2px;
  }
`;

interface Props {
  show?: boolean;
  currentUser?: UserDTO;
}
export default (props: Props) => {
  const {
    show,
  } = props;

  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();

  const onClickMenuButton = (pathname: string) => {
    router.push(pathname ?? '/');
  };

  return (
    <NavigationButtonGroup show={show}>
      <Button
        fillVariant='text'
        palette='primary'
        onClick={() => onClickMenuButton('/boards')}
      >
        {commonTranslation('words.boards')}
      </Button>
    </NavigationButtonGroup>
  );
}
