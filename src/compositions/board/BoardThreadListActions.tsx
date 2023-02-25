import ButtonGroup from '@/components/button/ButtonGroup';
import Button from '@/components/button/Button';

interface Props {
  onClickCreateThreadButton: () => void;
  onClickMoveToTopButton: () => void;
}
export default (props: Props) => {
  const {
    onClickCreateThreadButton,
    onClickMoveToTopButton,
  } = props;
 
  return (
    <ButtonGroup>
      <Button
        icon={{
          type: 'fas',
          keyword: 'star',
        }}
        fillVariant='filled'
        palette='primary'
        onClick={onClickCreateThreadButton}
      >
        {'새 스레드'}
      </Button>
      <Button
        icon={{
          type: 'fas',
          keyword: 'arrow-up',
        }}
        fillVariant='filled'
        palette='default'
        onClick={onClickMoveToTopButton}
      >
        {'상단으로'}
      </Button>
    </ButtonGroup>
  );
}
