import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '15px',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '10px',
    padding: '10px 30px',
    variant: 'outlined',
  },
  card: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0px',
    padding: '0px',
    variant: 'outlined',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 24,
    fontWeight: 300,
    wordWrap: "break-word",
  },
};


function CardGrid(props) {
  const { classes } = props;
  return (
    <>
      <Box className={classes.box}>
        <Grid container spacing={2}>
          {props.cards.map(card => (
            <div key={card.id}>
              <Grid item xs={12} sm={6}>
                <Card key={card.id} className={classes.card} variant="outlined">
                  <CardActionArea>
                    <div key={card.id}>
                      <CardMedia className={classes.cardMedia}
                        image={card.image}
                        title={card.title}
                      />
                    </div>
                    <CardContent>
                      <div key={card.id}>
                        <Typography className={classes.cardTitleTypography}>
                          {card.title}
                        </Typography>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </div>
          ))}
        </Grid>
      </Box>
    </>
  );
}

CardGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardGrid);
