import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import InboxIcon from '@material-ui/icons/Inbox';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';

import useStyles from '../components/UseStyles';

import Layout from '../components/Layout';
import SelectButton from '../components/buttons/SelectButton';
import BackgroundPaper from '../components/papers/BackgroundPaper';
import ContentCard from '../components/cards/ContentCard';
import CardTitleTypography from '../components/cards/CardTitleTypography';
import ContentPaper from '../components/papers/ContentPaper';
import ButtonTypography from '../components/buttons/ButtonTypography';
import PageTitleTypography from '../components/typographies/PageTitleTypography';
import PaperTitleTypography from '../components/papers/PaperTitleTypography';
import ContentTitleTypography from '../components/typographies/ContentTitleTypography';
import ContentTypography from '../components/typographies/ContentTypography';
import ListItemTextPrimaryTypography from '../components/lists/ListItemTextPrimaryTypography';
import ListItemTextSecondaryTypography from '../components/lists/ListItemTextSecondaryTypography';


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const shortcutButtons = [
  {
    id: "competition",
    title: "Competition",
    image: "/static/images/competition.jpg"
  },
  {
    id: "study",
    title: "Study",
    image: "/static/images/study.jpg"
  },
  {
    id: "hobby",
    title: "Hobby",
    image: "/static/images/hobby.jpg"
  },
  {
    id: "team",
    title: "Team",
    image: "/static/images/team.jpg"
  }
];

const hotArticles = [
  {
    id: 1,
    primary: "Hot article 1",
    secondary: "1 likes"
  },
  {
    id: 2,
    primary: "Hot article 2",
    secondary: "4 likes"
  },
  {
    id: 3,
    primary: "Hot article 3",
    secondary: "9 likes"
  },
  {
    id: 4,
    primary: "Hot article 4",
    secondary: "16 likes"
  }
];

const recentComps = [
  {
    id: 1,
    title: "Comp 1",
    content: "Comp 1 content",
    image: "/static/images/article_01.jpg"
  },
  {
    id: 2,
    title: "Comp 2",
    content: "Comp 2 content",
    image: "/static/images/article_02.jpg"
  },
  {
    id: 3,
    title: "Comp 3",
    content: "Comp 3 content",
    image: "/static/images/article_03.jpg"
  },
  {
    id: 4,
    title: "Comp 4",
    content: "Comp 4 content",
    image: "/static/images/article_04.jpg"
  }
];


function TopTitle() {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Avatar alt="Nugurang"
        src="/static/favicons/favicon-nugurang.png"
        variant="square"
      />
      <PageTitleTypography>
        Nugurang
      </PageTitleTypography>
    </Box>
  );
}

function ShortcutButtons() {
 const classes = useStyles();
  return (
        <Grid container spacing={2}>
          {shortcutButtons.map(shortcutButton => (
            <Grid item xs={6} sm={3}>
              <ContentCard>
                <CardActions>
                  <CardActionArea>
                    <CardMedia
                      className={classes.card_media_image_top}
                      image={shortcutButton.image}
                      title={shortcutButton.title}
                    />
                    <ContentTypography align="center">
                      {shortcutButton.title}
                    </ContentTypography>
                  </CardActionArea>
                </CardActions>
              </ContentCard>
            </Grid>
          ))}

          <Grid item xs={12} align="right">
            <SelectButton startIcon={<StarsIcon />} >
              <ButtonTypography>
                More
              </ButtonTypography>
            </SelectButton>
          </Grid>
        </Grid>
  );
}

function HotArticles() {
 const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PaperTitleTypography>
          Hot articles
        </PaperTitleTypography>
        <ContentPaper>
            <List>

              {hotArticles.map(hotArticle => (
                <>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar>
                        <StarsIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<ListItemTextPrimaryTypography>{hotArticle.primary}</ListItemTextPrimaryTypography>}
                      secondary={<ListItemTextSecondaryTypography>{hotArticle.secondary}</ListItemTextSecondaryTypography>}
                    />
                  </ListItem>
                </>
              ))}

            </List>
        </ContentPaper>
      </Grid>
    </Grid>
  );
}

function RecentComps() {
 const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PaperTitleTypography>
                Recent comps
              </PaperTitleTypography>
            </Grid>

            {recentComps.map(recentComp => (
              <Grid item xs={12} sm={6}>
                <ContentCard>
                  <CardActionArea>
                    <CardMedia
                      className={classes.card_media_image_top}
                      image={recentComp.image}
                      title={recentComp.title}
                    />
                    <CardContent>
                      <CardTitleTypography>
                        {recentComp.title}
                      </CardTitleTypography>
                      <ContentTypography>
                        {recentComp.content}
                      </ContentTypography>
                    </CardContent>
                    <CardActions>
                      <SelectButton size="small" color="primary">
                        <ButtonTypography>View</ButtonTypography>
                      </SelectButton>
                      <SelectButton size="small" color="primary">
                        <ButtonTypography>Star</ButtonTypography>
                      </SelectButton>
                    </CardActions>
                  </CardActionArea>
                </ContentCard>
              </Grid>
            ))}

            <Grid item xs={12} align="right">
              <SelectButton startIcon={<StarsIcon />} >
                <ButtonTypography>More</ButtonTypography>
              </SelectButton>

            </Grid>
          </Grid>
      </Grid>
    </Grid>
  );
}


export default function Home() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <TopTitle />
        </Grid>

        <Grid item xs={12}>
          <ContentPaper>
            <ShortcutButtons />
          </ContentPaper>
        </Grid>

        <Grid item xs={12}>
          <ContentPaper>
            <HotArticles />
          </ContentPaper>
        </Grid>

        <Grid item xs={12}>
          <ContentPaper>
            <RecentComps />
          </ContentPaper>
        </Grid>

      </Grid>
    </Layout>
  );
}
