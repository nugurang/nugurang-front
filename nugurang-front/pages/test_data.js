import Chip from '@material-ui/core/Chip';

const articleTest = {
  id: 1,
  title: "Article 1",
  content: "Content 1",
  like: 1,
  comment: 3,
  image: "/static/images/sample_1.jpg",
  chip: <Chip label="Basic1" />,
};


const articlesTest = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    like: 1,
    comment: 3,
    image: "/static/images/sample_1.jpg",
    chip: <Chip label="Basic1" />,
  },
  {
    id: 2,
    title: "Article 2 with no images",
    content: "Content 2",
    like: 4,
    comment: 2,
    chip: <Chip label="Basic2" />,
  },
  {
    id: 3,
    title: "Article 3 with no chips",
    content: "Content 3",
    like: 9,
    image: "/static/images/sample_3.jpg",
    comment: 1,
  }
];



const cardsTest = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    image: "/static/images/sample_1.jpg",
  },
  {
    id: 2,
    title: "Article 2",
    content: "Content 2",
    image: "/static/images/sample_2.jpg",
  },
  {
    id: 3,
    title: "Article 3",
    content: "Content 3",
    image: "/static/images/sample_3.jpg",
  }
];


const chatsTest = [
  {
    id: 1,
    name: "User 1",
    content: "Chat message 1",
    isMyChat: false,
    image: "/static/images/sample_1.jpg",
  },
  {
    id: 2,
    name: "User 2",
    content: "Chat message 2",
    isMyChat: true,
    image: "/static/images/sample_2.jpg",
  },
  {
    id: 3,
    name: "User 3",
    content: "Chat message 3",
    isMyChat: false,
    image: "/static/images/sample_3.jpg",
  },
  {
    id: 4,
    name: "User 4",
    content: "Chat message 4",
    isMyChat: true,
    image: "/static/images/sample_4.jpg",
  },
  {
    id: 5,
    name: "User 5",
    content: "Chat message 5",
    isMyChat: false,
    image: "/static/images/sample_5.jpg",
  },
  {
    id: 6,
    name: "User 6",
    content: "Chat message 6",
    isMyChat: true,
    image: "/static/images/sample_6.jpg",
  },
  {
    id: 7,
    name: "User 7",
    content: "Chat message 7",
    isMyChat: false,
    image: "/static/images/sample_7.jpg",
  },
  {
    id: 8,
    name: "User 8",
    content: "Chat message 8",
    isMyChat: true,
    image: "/static/images/sample_8.jpg",
  },
  {
    id: 9,
    name: "User 9",
    content: "Quite a long chat message. 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    isMyChat: false,
    image: "/static/images/sample_9.jpg",
  },
];



const commentsTest = [
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


let labelTest = "UniversalButton";



const listTest = [
  {
    id: 1,
    primary: "Primary text 1",
    secondary: "Secondary text 1",
    icon: "/static/images/sample_1.jpg",
  },
  {
    id: 2,
    primary: "Primary text 2 without icon",
    secondary: "Secondary text 2",
  },
  {
    id: 3,
    primary: "Primary text 3, no secondary text",
    icon: "/static/images/sample_3.jpg",
    secondary: null,
  },
  {
    id: 4,
    primary: "Primary text 4",
    secondary: "Quite a long secondary text. 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    icon: "/static/images/sample_4.jpg",
  }
];


const tabsTest = [
  {
    id: 1,
    title: "Tab 1",
  },
  {
    id: 2,
    title: "Tab 2",
  },
  {
    id: 3,
    title: "Tab 3",
  }
];


let titleTest = 'Back';





const userTest = {
  id: 1,
  name: "Username",
  image: "/static/favicon/sample_1.jpg",
  statistics: "Statistics",
  bio: "Bio"
}



const userGroupTest = {
  id: 1,
  title: "Article 1",
  content: "Article 1 content",
  image: "/static/images/sample_1.jpg",
  users:[
    {
      id: 1,
      name: "User 1",
      image: "/static/images/sample_2.jpg",
	  statistics: "Statistics",
	  bio: "Bio"
    },
    {
      id: 2,
      name: "User 2",
      image: "/static/images/sample_3.jpg",
	  statistics: "Statistics",
	  bio: "Bio"
    },
    {
      id: 3,
      name: "User 3",
      image: "/static/images/sample_4.jpg",
	  statistics: "Statistics",
	  bio: "Bio"
    },
  ]
};

