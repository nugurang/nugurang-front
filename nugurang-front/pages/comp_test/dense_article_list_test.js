import React from 'react';

import DenseArticleList from '../../components/DenseArticleList';

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
	  <DenseArticleList article={article} />
	</div>
  );
}
