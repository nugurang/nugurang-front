import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InboxIcon from '@material-ui/icons/Inbox';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarsIcon from '@material-ui/icons/Stars';

import Layout from '../components/Layout';
import PageTitleTypography from '../components/typographies/PageTitleTypography';
import SelectButton from '../components/buttons/SelectButton';
import ButtonTypography from '../components/buttons/ButtonTypography';
import BackgroundPaper from '../components/papers/BackgroundPaper';
import ContentPaper from '../components/papers/ContentPaper';
import PageTitlePaper from '../components/papers/PageTitlePaper';
import ListItemTextPrimaryTypography from '../components/lists/ListItemTextPrimaryTypography';
import ListItemTextSecondaryTypography from '../components/lists/ListItemTextSecondaryTypography';

const userBriefInfo = {
    id: 1,
    name: "Name",
    image: "",
    bio: "Bio",
  };

const settingItems = [
  {
    id: 1,
    title: "Message",
  },
  {
    id: 2,
    title: "Display",
  },
  {
    id: 3,
    title: "Notification",
  },
  {
    id: 4,
    title: "General",
  },
];


function PageTitle() {
  return (
    <PageTitleTypography>
      More
    </PageTitleTypography>
  );
}

function UserBriefInfo() {
  return (
    <Grid container spacing={2} alignItems="center" justify="space-between">
      <Grid item xs={12} sm={7}>
        <List>
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt={userBriefInfo.name}
                src={userBriefInfo.image}
              />
            </ListItemAvatar>
            <ListItemText
              primary={<ListItemTextPrimaryTypography>{userBriefInfo.name}</ListItemTextPrimaryTypography>}
              secondary={<ListItemTextSecondaryTypography>{userBriefInfo.bio}</ListItemTextSecondaryTypography>}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Link href="/signin">
          <SelectButton startIcon={<StarsIcon />} >
            <ButtonTypography>Sign in</ButtonTypography>
          </SelectButton>
        </Link>
      </Grid>
    </Grid>
  );
}


function Setting() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <List>
          {settingItems.map(settingItem => (
            <>
              <ListItem button>
                <ListItemText
                  primary={<ListItemTextPrimaryTypography>{settingItem.title}</ListItemTextPrimaryTypography>}
                />
              </ListItem>
            </>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}


export default function Home() {
  return (
    <Layout>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <PageTitlePaper>
            <PageTitle />
          </PageTitlePaper>
        </Grid>

        <Grid item xs={12}>
          <ContentPaper>
            <UserBriefInfo />
          </ContentPaper>
        </Grid>

        <Grid item xs={12}>
          <ContentPaper>
            <Setting />
          </ContentPaper>
        </Grid>
        
      </Grid>
    </Layout>
  );
}
