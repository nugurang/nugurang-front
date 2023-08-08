import PageRow from '@/components/PageRow';

import NewArticleFormFragment from './NewArticleFormFragment';
import FirstArticleFragment from './FirstArticleFragment';
import TrailingArticleListFragment from './TrailingArticleListFragment';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const threadId = searchParams?.threadId ?? -1

  return (
    <>
      <PageRow>
        <FirstArticleFragment />
      </PageRow>
      <PageRow>
        <NewArticleFormFragment />
      </PageRow>
      <PageRow>
        <TrailingArticleListFragment />
      </PageRow>
    </>
  );
}
