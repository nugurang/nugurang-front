import { useTranslation } from 'next-i18next';
import { Button } from '@/components/Button';
import { WithDefaultServerSideProps } from '@/hocs/WithServerSideProps';
import {
  Container,
  ContainerSection,
  ContainerSectionHeader,
  ContainerSubsection,
} from '@/components/Container';
import { useLocalForage } from '@/hooks/storage';

export const getServerSideProps = WithDefaultServerSideProps();

const Sandbox = ({ currentUser }) => {
  const { t } = useTranslation('common');
  const [value, updateValue, removeValue] = useLocalForage('test', {
    initialValue: {
      friends: [],
    },
    overrideValue: false,
  });

  return (
    <Container>
      <ContainerSection>
        <ContainerSectionHeader
          title="샌드박스"
          subtitle="마음껏 테스트하세요!"
        />
        <ContainerSubsection>
          <div>{t('hello_world')}</div>
          {currentUser && <div>{currentUser.name}</div>}
        </ContainerSubsection>
        <ContainerSubsection>
          {value &&
            value.friends?.map((friend) => <li key={friend}>{friend}</li>)}
        </ContainerSubsection>
        <ContainerSubsection>
          <Button
            label="Add friend"
            onClick={() => {
              const oldFriends = value?.friends ?? [];
              updateValue({
                friends: [
                  ...(value?.friends ?? []),
                  `New friend #${oldFriends.length + 1}`,
                ],
              });
            }}
            primary
          />
          <Button
            label="Remove all friends"
            onClick={() => removeValue()}
            primary
          />
        </ContainerSubsection>
      </ContainerSection>
    </Container>
  );
};

export default Sandbox;
