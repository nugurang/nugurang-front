'use client'

import ArticleCard from '@/compositions/ArticleCard';

import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

const mockFirstArticleCard = {
  title: '마천루 제목',
  content: '마천루 컨텐츠',
  icon: faSearch,
  imageSrc: 'https://source.unsplash.com/random/?skyscraper',
  onClickThumbnail: () => alert('마천루 썸네일'),
  onClickBody: () => alert('마천루 본문'),
};

export default function FirstArticleFragment() {
  return (
    <div className={[
      'flex', 'flex-col', 'gap-4'
    ].join(' ')}>
      <ArticleCard
        title={mockFirstArticleCard.title}
        content={mockFirstArticleCard.content}
        icon={mockFirstArticleCard.icon}
        imageSrc={mockFirstArticleCard.imageSrc}
        onClickThumbnail={mockFirstArticleCard.onClickThumbnail}
        onClickBody={mockFirstArticleCard.onClickBody}
      />
    </div>
  );
}
