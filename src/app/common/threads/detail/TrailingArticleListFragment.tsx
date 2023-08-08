'use client'

import ArticleCard from '@/compositions/ArticleCard';

import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

const mockTrailingArticleCardList = [
  {
    title: '카이오 전설',
    content: '소녀 일곱 명은 곰에게 쫓겼다. 곰이 막 따라잡았을 때 소녀들은 낮은 바위로 뛰어올랐다. 한 소녀가 돌에 빌었다. \"돌이여, 저희를 가엽게 여기시고 구해주소서!\" 돌이 그들을 듣고 위로 자라기 시작하여 소녀들을 높이, 더 높이 올려주었다.',
    icon: faSearch,
  },
  {
    title: '카이오 전설',
    content: '소녀 일곱 명은 곰에게 쫓겼다. 곰이 막 따라잡았을 때 소녀들은 낮은 바위로 뛰어올랐다. 한 소녀가 돌에 빌었다. \"돌이여, 저희를 가엽게 여기시고 구해주소서!\" 돌이 그들을 듣고 위로 자라기 시작하여 소녀들을 높이, 더 높이 올려주었다.',
    icon: faSearch,
  },
  {
    title: '카이오 전설',
    content: '소녀 일곱 명은 곰에게 쫓겼다. 곰이 막 따라잡았을 때 소녀들은 낮은 바위로 뛰어올랐다. 한 소녀가 돌에 빌었다. \"돌이여, 저희를 가엽게 여기시고 구해주소서!\" 돌이 그들을 듣고 위로 자라기 시작하여 소녀들을 높이, 더 높이 올려주었다.',
    icon: faSearch,
  },
  {
    title: '카이오 전설',
    content: '소녀 일곱 명은 곰에게 쫓겼다. 곰이 막 따라잡았을 때 소녀들은 낮은 바위로 뛰어올랐다. 한 소녀가 돌에 빌었다. \"돌이여, 저희를 가엽게 여기시고 구해주소서!\" 돌이 그들을 듣고 위로 자라기 시작하여 소녀들을 높이, 더 높이 올려주었다.',
    icon: faSearch,
  },
  {
    title: '카이오 전설',
    content: '소녀 일곱 명은 곰에게 쫓겼다. 곰이 막 따라잡았을 때 소녀들은 낮은 바위로 뛰어올랐다. 한 소녀가 돌에 빌었다. \"돌이여, 저희를 가엽게 여기시고 구해주소서!\" 돌이 그들을 듣고 위로 자라기 시작하여 소녀들을 높이, 더 높이 올려주었다.',
    icon: faSearch,
  },
];

export default function TrailingArticleListFragment() {
  return (
    <div className={[
      'flex', 'flex-col', 'gap-4'
    ].join(' ')}>
      {mockTrailingArticleCardList.map((trailingArticleCard, index) => (
        <ArticleCard
          key={index}
          title={trailingArticleCard.title}
          content={trailingArticleCard.content}
          icon={trailingArticleCard.icon}
        />
      ))}
    </div>
  );
}
