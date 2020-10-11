import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

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
import ContentTitleTypography from '../../components/typographies/ContentTitleTypography';
import ContentTypography from '../../components/typographies/ContentTypography';
import ListItemTextPrimaryTypography from '../../components/lists/ListItemTextPrimaryTypography';
import ListItemTextSecondaryTypography from '../../components/lists/ListItemTextSecondaryTypography';


const user = {
  id: "1",
  name: "Username",
  profile_image: ""
};


function PageTitle() {
  return (
    <PageTitleTypography>
      User Info
    </PageTitleTypography>
  );
}

function UserInfoAvatar() {
  return (
    <Grid container spacing={2} alignItems="center" justify="space-between">
      <Grid item xs={12} align="center">
        <Avatar alt={user.name}
          src={user.image}
          style={{ height: '150px', width: '150px'}}
        />
        <ContentTitleTypography>
          {user.name}
        </ContentTitleTypography>
      </Grid>
    </Grid>
  );
}


export default function UserInfo() {

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
            <UserInfoAvatar />
          </ContentPaper>
        </Grid>

      </Grid>
    </Layout>
  );
}
