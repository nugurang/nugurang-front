import React from 'react';

import ChattingBox from '../../components/ChattingBox';

export default function CompTest() {

const chats = [
  {
    id: 1,
    name: "Primary text 1",
    content: "Secondary text 1111111111111fsafgsdghjsrjsryjsrtjfgnfgxjgfxjnfgmxrgfmxhfmrxgfmnrxgmyxh1111",
    isMyChat: false,
    image: "/static/favicons/favicon-nugurang.png",
  },
  {
    id: 2,
    name: "Primary text 1",
    content: "Secondary text 1",
    isMyChat: true,
    image: "/static/favicons/favicon-nugurang.png",
  },
  {
    id: 3,
    name: "Primary text 1",
    content: "Secondary text 1",
    isMyChat: false,
    image: "/static/favicons/favicon-nugurang.png",
  },
];

  return (
	<div>
	  <ChattingBox chats={chats} />
	</div>
  );
}
