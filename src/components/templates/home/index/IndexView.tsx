import Section from '@/components/molecules/section/Section';
import WidthLimiter from '@/components/atoms/widthLimiter/WidthLimiter';
import { useTranslation } from 'next-i18next';

interface ViewProps {}

const HomeIndexView: React.FC<ViewProps> = props => {
  const { t } = useTranslation('common');
  return (
    <WidthLimiter>
      <Section>
        {t('_helloWorld')}
      </Section>
    </WidthLimiter>
  );
}

export default HomeIndexView;
