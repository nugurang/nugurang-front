import PageRow from '@/components/PageRow';

import ToolbarFragment from './ToolbarFragment';
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
        <ToolbarFragment />
      </PageRow>
      <PageRow>
        <ThreadThumbnailListFragment />
      </PageRow>
    </>
  );
}