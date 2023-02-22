import { MouseEventHandler, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import Paragraph from '@/components/text/Paragraph';
import Banner from '../common/Banner';
import { ThreadDTO } from '@/dtos/thread';

interface Props {
  thread: ThreadDTO;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    thread,
  } = props;
  const { t: commonTranslation } = useTranslation('common');
  const { t: threadsTranslation } = useTranslation('threads');
 
  return (
    <Banner
      title={thread.name}
      backButton
    >
      <Paragraph palette='default' align='right'>
      {`${thread.name} Brief Info Here`}
      </Paragraph>
    </Banner>
  );
}
