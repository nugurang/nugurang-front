import React from 'react';

import CardGrid from '../../components/CardGrid';

export default function CompTest() {

const cards = [
  {
    id: 1,
    title: "Article 1",
    image: "/static/images/team.jpg",
  },
  {
    id: 2,
    title: "Article 2",
    image: "/static/images/team.jpg",
  },
  {
    id: 3,
    title: "Article 3",
    image: "/static/images/team.jpg",
  }
];

  return (
	<div>
	  <CardGrid cards={cards} />
	</div>
  );
}
