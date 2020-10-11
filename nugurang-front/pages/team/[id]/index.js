import { useRouter } from 'next/router'
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link'
import StarsIcon from '@material-ui/icons/Stars';

import Layout from '../../components/Layout';
import SelectButton from '../../components/buttons/SelectButton';
import BackgroundPaper from '../../components/papers/BackgroundPaper';
import ContentCard from '../../components/cards/ContentCard';
import ContentCardMedia from '../../components/cards/ContentCardMedia';
import CardTitleTypography from '../../components/cards/CardTitleTypography';
import ContentPaper from '../../components/papers/ContentPaper';
import ButtonTypography from '../../components/buttons/ButtonTypography';
import PageTitlePaper from '../../components/papers/PageTitlePaper';
import PageTitleTypography from '../../components/typographies/PageTitleTypography';
import ContentPaperTitleTypography from '../../components/papers/ContentPaperTitleTypography';
import ContentTypography from '../../components/typographies/ContentTypography';
import ListItemTextPrimaryTypography from '../../components/lists/ListItemTextPrimaryTypography';
import ListItemTextSecondaryTypography from '../../components/lists/ListItemTextSecondaryTypography';


const teamProjectsDB = [
  {
    id: "team-project01",
    name: "Team Project A",
    profile_image: "/static/images/team01-profile-image.jpg"
  },
  {
    id: "team-project02",
    name: "Team Project B",
    profile_image: "/static/images/team02-profile-image.jpg"
  },
  {
    id: "team-project03",
    name: "Team Project C",
    profile_image: "/static/images/team03-profile-image.jpg"
  },
  {
    id: "team-project04",
    name: "Team Project D",
    profile_image: "/static/images/team04-profile-image.jpg"
  }
];


function PageTitle() {
  return (
    <PageTitleTypography>
      Projects
    </PageTitleTypography>
  );
}

function TeamProjectssList() {
  return (

    <Grid container spacing={2}>
      <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            </Grid>

            {teamProjectsDB.map(project => (
              <Grid item xs={12} sm={6}>
                <Link href="/team/[id]" as={`/team/${project.id}`}>
                  <ContentCard>
                    <CardActionArea>
                      <ContentCardMedia
                        image={project.profile_image}
                        title={project.name}
                      />
                      <CardContent>
                        <CardTitleTypography>
                          {project.name}
                        </CardTitleTypography>
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
                </Link>
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


export default function Teams() {

  const router = useRouter()
  const { id } = router.query
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
            <ProjectsList />
          </ContentPaper>
        </Grid>

      </Grid>
    </Layout>
  );
}
