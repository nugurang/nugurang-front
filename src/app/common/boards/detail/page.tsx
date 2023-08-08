import PageRow from '@/components/PageRow';

import SearchBarFragment from './SearchBarFragment';
import ThreadThumbnailListFragment from './ThreadThumbnailListFragment';

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
          <span className='text-2xl font-bold'>boardId: {boardId}</span>
        </div>
      </PageRow>
      <PageRow>
        <SearchBarFragment />
      </PageRow>
      <PageRow>
        <ThreadThumbnailListFragment />
      </PageRow>
    </>
  );
}
