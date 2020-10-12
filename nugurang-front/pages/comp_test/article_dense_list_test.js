import React from 'react';

import ArticleDenseList from '../../components/ArticleDenseList';

export default function CompTest() {

const article = [
  {
    id: 1,
    title: "Article 1",
  },
  {
    id: 2,
    title: "Article 2",
  },
  {
    id: 3,
    title: "Article 3",
  }
];

  return (
	<div>
	  <ArticleDenseList article={article} />
	</div>
  );
}
