import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import GitHubIcon from '@material-ui/icons/GitHub';

import ArticleList from '../components/ArticleList';
import ArticleListItem from '../components/ArticleListItem';
import BaseButton from '../components/BaseButton';
import BaseCard from '../components/BaseCard';
import BaseIconButton from '../components/BaseIconButton';
import BaseImage from '../components/BaseImage';
import BaseListItem from '../components/BaseListItem';
import BaseSelect from '../components/BaseSelect';
import BaseSwitch from '../components/BaseSwitch';
import BaseTextField from '../components/BaseTextField';
import HonorBadgeBox from '../components/HonorBadgeBox';
import HonorBadgeGrid from '../components/HonorBadgeGrid';
import ImageUploadingBox from '../components/ImageUploadingBox';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import StatCounterBox from '../components/StatCounterBox';
import TeamInfoBox from '../components/TeamInfoBox';
import TeamList from '../components/TeamList';
import ThreadBox from '../components/ThreadBox';
import ThreadGrid from '../components/ThreadGrid';
import ThreadList from '../components/ThreadList';
import UserInfoBox from '../components/UserInfoBox';
import UserList from '../components/UserList';

/* ------------------------ Test data zone start ------------------------- */

/* const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27'; */


const TEST_AVATAR = "/static/images/sample_1.jpg";
const TEST_ICON = <GitHubIcon style={{ fontSize: 30 }} />;
const TEST_IMAGE = "/static/images/sample_2.jpg";


const TEST_ARTICLE_LIST = [
  {
    id: 0,
    author: "Test user",
    avatar: TEST_AVATAR,
    title: "Ignored",
    content: "Content and more",
    image: TEST_IMAGE,
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 1,
    author: "Test user",
    avatar: TEST_AVATAR,
    title: "Ignored",
    content: "Content and more",
    image: TEST_IMAGE,
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 2,
    author: "Test user",
    avatar: TEST_AVATAR,
    title: "Ignored",
    content: "Content and more",
    image: TEST_IMAGE,
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
]


const TEST_BASE_SWITCH_LIST = [
  {
    id: 0,
    value: "Value 1"
  },
  {
    id: 1,
    value: "Value 2"
  },
  {
    id: 2,
    value: "Value 3"
  },
]


const TEST_HONOR_BADGE_LIST = [
  {
    id: 0,
    name: "Pikachu",
    image: TEST_IMAGE,
    score: "1000000",
  },
  {
    id: 1,
    name: "Raichu",
    image: TEST_IMAGE,
    score: "2000000",
  },
  {
    id: 2,
    name: "Charmander",
    image: TEST_IMAGE,
    score: "3000000",
  },
  {
    id: 3,
    name: "Squirtle",
    image: TEST_IMAGE,
    score: "4000000",
  },
]


const TEST_THREAD_LIST = [
  {
    id: 0,
    author: "Test user",
    avatar: TEST_AVATAR,
    title: "Test title",
    content: "Content and more",
    image: TEST_IMAGE,
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 1,
    author: "Test user",
    avatar: TEST_AVATAR,
    title: "Test title",
    content: "Content and more",
    image: TEST_IMAGE,
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
  {
    id: 2,
    author: "Test user",
    avatar: TEST_AVATAR,
    title: "Test title",
    content: "Content and more",
    image: TEST_IMAGE,
    like: 3,
    topic: "Test topic",
    view: 4,
    vote: 5,
  },
]


const TEST_USER_LIST = [
  {
    id: 0,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_1.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 1,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_2.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 2,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_3.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 3,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_4.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
]


const TEST_TEAM_LIST = [
  {
    id: 0,
    title: "Test title",
    primary: "Test primary",
    secondary: "Test secondary",
    users: TEST_USER_LIST,
  },
  {
    id: 1,
    title: "Test title",
    primary: "Test primary",
    secondary: "Test secondary",
    users: TEST_USER_LIST,
  },
  {
    id: 2,
    title: "Test title",
    primary: "Test primary",
    secondary: "Test secondary",
    users: TEST_USER_LIST,
  },
]



/* ------------------------- Test data zone end -------------------------- */


const useStyles = makeStyles(() => ({
  divider: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    margin: '2rem 0rem',
  },
  paper: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '2rem 0rem',
    padding: '1.5rem 1.5rem',
    variant: 'outlined',
  },
  pageTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 32,
    fontWeight: 400,
    margin: '0.5rem 0.5rem',
    wordWrap: "break-word",
  },
  paperTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 28,
    fontWeight: 300,
    wordWrap: "break-word",
  },
}));

function Overview({ title, children }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={2}>
      <Typography className={classes.paperTitleTypography} variant="h4" gutterBottom>
        {title}
      </Typography>
      <Divider className={classes.divider} />
      {children}
    </Paper>
  );
}

export default function ComponentOverview() {
  const classes = useStyles();
  const [baseSwitchState, setBaseSwitchState] = useState(false);
  const [baseSelectValue, setBaseSelectValue] = useState("");
  const toggleBaseSwitch = () => {
    setBaseSwitchState((prev) => !prev);
  };
  const refreshBaseSelect = (event) => {
    setBaseSelectValue(event.target.value);
  };


  return (
    <Container maxWidth="sm">

      <Typography className={classes.pageTitleTypography}>
        Components testing area
      </Typography>


      <Overview title="ArticleListItem">
        <ArticleListItem
          author="Test user"
          avatar={TEST_AVATAR}
          title="Ignored"
          content="Content and more"
          image={TEST_IMAGE}
          like={3}
          topic="Test topic"
          view={4}
          vote={5}
        />
      </Overview>


      <Overview title="ArticleList">
        <ArticleList
          items={TEST_ARTICLE_LIST}
        />
      </Overview>


      <Overview title="BaseButton">
        <BaseButton
          label="Test label"
          startIcon={TEST_ICON}
          endIcon={TEST_ICON}
        />
      </Overview>


      <Overview title="BasdCard">
        <BaseCard
          imageTitle="imageTitle"
          image={TEST_IMAGE}
        >
          <BaseIconButton icon={TEST_ICON} />
        </BaseCard>
      </Overview>


      <Overview title="BaseIconButton">
        <BaseIconButton
          icon={TEST_ICON}
        />
      </Overview>


      <Overview title="BaseImage">
        <BaseImage
          image={TEST_IMAGE}
          imageTitle="Image title"
        />
      </Overview>


      <Overview title="BaseListItem-Avatar">
        <BaseListItem
          avatar={TEST_IMAGE}
          avatarDescription="Icon description"
          primary="Primary"
          secondary="Secondary"
          circleIcon
        />
      </Overview>



      <Overview title="BaseListItem-Icon">
        <BaseListItem
          icon={TEST_ICON}
          primary="Primary"
          secondary="Secondary"
          circleIcon
        />
      </Overview>


      <Overview title="BaseSelect">
        <BaseSelect
          label="Test label"
          items={TEST_BASE_SWITCH_LIST}
          value={baseSelectValue}
          onChange={refreshBaseSelect}
        />
      </Overview>


      <Overview title="BaseSwitch">
        <BaseSwitch
          label="Test label"
          value={baseSwitchState}
          onChange={toggleBaseSwitch}
        />
        { baseSwitchState ?
          (
            <Typography>Activated</Typography>
          )
          : (
            <Typography>Deactivated</Typography>
          )}
      </Overview>


      <Overview title="BaseTextField">
        <BaseTextField
          label="Test label"
        />
      </Overview>


      <Overview title="HonorBadgeBox">
        <HonorBadgeBox
          name="Pokemon"
          image={TEST_IMAGE}
          score="1000000"
        />
      </Overview>


      <Overview title="HonorBadgeGrid">
        <HonorBadgeGrid
          items={TEST_HONOR_BADGE_LIST}
        />
      </Overview>


      <Overview title="ImageUploadingBox">
        <ImageUploadingBox
          image={TEST_IMAGE}
        />
      </Overview>


      <Overview title="SectionBox">
        <SectionBox
          titleBar={(
            <SectionTitleBar
              title="Test title"
              icon={TEST_ICON}
            >
              <BaseIconButton icon={TEST_ICON} />
            </SectionTitleBar>
          )}
        >
          <BaseIconButton icon={TEST_ICON} />
        </SectionBox>
      </Overview>


      <Overview title="SectionTitleBar">
        <SectionTitleBar
          title="Test title"
          icon={TEST_ICON}
        >
          <BaseTextField label="Test label" />
        </SectionTitleBar>
      </Overview>



      <Overview title="SectionTitleBar-WithBackButton">
        <SectionTitleBar
          title="Test title"
          icon={TEST_ICON}
          backButton
        >
          <BaseTextField label="Test label" />
        </SectionTitleBar>
      </Overview>


      <Overview title="StatCounterBox">
        <StatCounterBox
          comment={3}
          image={TEST_IMAGE}
          like={4}
          topic="Test topic"
          view={5}
          vote={6}
        />
      </Overview>



      <Overview title="TeamInfoBox">
        <TeamInfoBox
          title="Test title"
          primary="Test primary"
          secondary="Test secondary"
          users={TEST_USER_LIST}
        />
      </Overview>


      <Overview title="TeamList">
        <TeamList
          items={TEST_TEAM_LIST}
        />
      </Overview>



      <Overview title="ThreadBox">
        <ThreadBox
          title="Test title"
          author="Test user"
          content="Test content"
          image={TEST_IMAGE}
          articles={TEST_ARTICLE_LIST}
          accordion
        />
      </Overview>


      <Overview title="ThreadGrid">
        <ThreadGrid
          items={TEST_THREAD_LIST}
        />
      </Overview>


      <Overview title="ThreadList">
        <ThreadList
          items={TEST_THREAD_LIST}
        />
      </Overview>


      <Overview title="UserInfoBox">
        <UserInfoBox
          name="Test User"
          image="/static/images/sample_1.jpg"
          bio="Test bio"
          followers={5}
          followings={10}
          dense={false}
        />
      </Overview>

      <Overview title="UserInfoBox-Dense">
        <UserInfoBox
          name="Test User"
          image="/static/images/sample_1.jpg"
          bio="Test bio"
          followers={5}
          followings={10}
          dense
        />
      </Overview>


      <Overview title="UserList">
        <UserList
          items={TEST_USER_LIST}
        />
      </Overview>



    </Container>
  );
}