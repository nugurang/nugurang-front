import React from 'react';

import CommentList from '../../components/CommentList';

export default function CompTest() {

const comments = [
  {
    id: 1,
    author: "Author 1",
    content: "Comment 1",
  },
  {
    id: 2,
    author: "Author 2",
    content: "Comment 2",
  },
  {
    id: 3,
    author: "Author 3",
    content: "Comment 3",
  },
  {
    id: 4,
    author: "Author 4",
    content: "Quite a long comment. 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
  }
];

  return (
	<div>
	  <CommentList comments={comments} />
	</div>
  );
}
