import PageRow from '@/components/PageRow';
import BriefProfileFragment from './BriefProfileFragment';

export default async function Page() {
  return (
    <>
      <PageRow>
        <BriefProfileFragment />
      </PageRow>
      <PageRow>
        <div
          className={[
            'grid', 'xs:grid-cols-2', 'sm:grid-cols-2', 'gap-4',
          ].join(' ')}
        >
        </div>
      </PageRow>
    </>
  );
}
