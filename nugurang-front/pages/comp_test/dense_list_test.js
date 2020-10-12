import React from 'react';

import DenseList from '../../components/DenseList';

export default function CompTest() {

const list = [
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
	  <DenseList list={list} />
	</div>
  );
}
