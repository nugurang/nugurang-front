import PageRow from '@/components/PageRow';

import NewThreadFormFragment from './NewThreadFormFragment';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const boardId = searchParams?.boardId ?? -1

  return (
    <>
      <PageRow>
        <div
          className={[
            'flex', 'justify-center', 'items-center'
          ].join(' ')}
        >
          <span className='text-2xl font-bold'>스레드 작성</span>
        </div>
      </PageRow>
      <PageRow>
        <NewThreadFormFragment />
      </PageRow>
    </>
  );
}
