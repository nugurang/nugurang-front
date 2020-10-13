import React from 'react';

import UniversalList from '../../components/UniversalList';

export default function CompTest() {

const list = [
  {
    id: 1,
    primary: "Primary text 1",
    secondary: "Secondary text 1",
    icon: "/static/favicons/favicon-nugurang.png",
  },
  {
    id: 2,
    primary: "Primary text 2 without icon",
    secondary: "Secondary text 2",
  },
  {
    id: 3,
    primary: "Primary text 3, no secondary text",
    icon: "/static/favicons/favicon-nugurang.png",
    secondary: null,
  },
  {
    id: 4,
    primary: "Primary text 4",
    secondary: "Quite a long secondary text. 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    icon: "/static/favicons/favicon-nugurang.png",
  }
];

  return (
	<div>
	  <UniversalList list={list} />
	</div>
  );
}
