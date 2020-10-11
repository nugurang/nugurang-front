import React from 'react';

import ArticleListWithLikeComment from '../../components/ArticleListWithLikeComment';

export default function TestComp() {

const list = [
  {
    id: 1,
    title: "Article 1",
    like: 1,
    comment: 3
  },
  {
    id: 2,
    title: "Article 2",
    like: 4,
    comment: 2
  },
  {
    id: 3,
    title: "Article 3",
    like: 9,
    comment: 1
  }
];

  return (
	<div>
	  <ArticleListWithLikeComment list={list} />
	</div>
  );
}
