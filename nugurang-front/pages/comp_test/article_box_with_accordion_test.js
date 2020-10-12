import React from 'react';

import ArticleBoxWithAccordion from '../../components/ArticleBoxWithAccordion';

export default function CompTest() {

const article = {
  title: "Article title",
  subtitle: "Article subtitle",
  image: "/static/images/team.jpg",
  content: "Article content using accordion",
};

  return (
	<div>
	  <ArticleBoxWithAccordion article={article} />
	</div>
  );
}
