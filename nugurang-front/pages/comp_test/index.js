import Link from 'next/link'
import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '30px 20px 10px 20px',
    padding: '0px',
    variant: 'outlined',
  },
});

const components = [
  {
    id: 1,
    title: "ArticleBox",
    link: "./comp_test/article_box_test",
  },
  {
    id: 2,
    title: "ArticleBoxWithAccordion",
    link: "./comp_test/article_box_with_accordion_test",
  },
  {
    id: 3,
    title: "ArticleListWithLikeComment",
    link: "./comp_test/article_list_with_like_comment_test",
  },
  {
    id: 4,
    title: "CardGrid",
    link: "./comp_test/card_grid_test",
  },
  {
    id: 5,
    title: "CommentList",
    link: "./comp_test/comment_list_test",
  },
  {
    id: 6,
    title: "ArticleDenseList",
    link: "./comp_test/article_dense_list_test",
  },
  {
    id: 7,
    title: "PageTitleBox",
    link: "./comp_test/page_title_box_test",
  },
  {
    id: 8,
    title: "ScrollableTabs",
    link: "./comp_test/scrollable_tabs_test",
  },
  {
    id: 9,
    title: "SectionTitleBox",
    link: "./comp_test/section_title_box_test",
  },
  {
    id: 10,
    title: "SectionTitleBoxWithTextField",
    link: "./comp_test/section_title_box_with_text_field_test",
  },
  {
    id: 11,
    title: "UserInfoBox",
    link: "./comp_test/user_info_box_test",
  },
  {
    id: 12,
    title: "ContentPaper",
    link: "./comp_test/content_paper_test",
  },
  {
    id: 13,
    title: "PageTitleBoxWithoutBackButton",
    link: "./comp_test/page_title_box_without_back_button_test",
  },
  {
    id: 14,
    title: "UserBriefInfoBox",
    link: "./comp_test/user_brief_info_box_test",
  },
  {
    id: 15,
    title: "UniversalButton",
    link: "./comp_test/universal_button_test",
  },
  {
    id: 16,
    title: "UniversalList",
    link: "./comp_test/universal_list_test",
  }
];


function CompTestList(props) {

    const { classes } = props

    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h4" gutterBottom>
	        Componetes testing area
	      </Typography>
	    </Paper>
        <Paper className={classes.paper} elevation={1}>
          <List>
            {components.map(component => (
                <Link href={component.link}>
              <ListItem>
                <ListItemText
                  primary={<Typography>{component.title}</Typography>}
                />
              </ListItem>
                </Link>
            ))}
          </List>
        </Paper>
      </React.Fragment>
    );
}

CompTestList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompTestList);