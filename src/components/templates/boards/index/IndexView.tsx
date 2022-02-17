import Grid from '@/src/components/atoms/grid/Grid';
import Image from '@/src/components/atoms/image/Image';
import PageOverview from '@/src/components/molecules/pageOverview/PageOverview';
import Section from '@/src/components/molecules/section/Section';
import Thumbnail from '@/src/components/molecules/thumbnail/Thumbnail';
import WidthLimiter from '@/src/components/atoms/widthLimiter/WidthLimiter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const StyledPageOverviewImageWrap = styled(Image)`
  ${(props: any) => `
    display: block;
    width: 100%;
    max-height: 480px;
    max-width: 480px;
    margin: 0 auto;
    vertical-align: top;
  `}
`;

interface Board {
  id: number;
  name: string;
  image: {
    address: string;
  }
}

interface ViewProps {
  boards: Board[]
}

const BoardsIndexView: React.FC<ViewProps> = props => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <WidthLimiter>
      <Section variant='transparent'>
        <PageOverview
          firstChildren={<>
            <StyledPageOverviewImageWrap
              src='https://image.freepik.com/free-vector/tiny-characters-sitting-laptop-with-lorem-ipsum-title_74855-20389.jpg?w=996'
            />
          </>}
          secondChildren={<>
            Hello
          </>}
        />
        <Grid
          column={{
            default: 1,
            gtePhablet: 2,
            gteTablet: 3,
          }}
        >
          {
            props.boards
            .sort((lhs, rhs) => t(lhs.name) > t(rhs.name) ? 1 : -1)
            .map((board: Board, index: number) => {
              return <Thumbnail
                key={index}
                imageUrl={board.image.address}
                title={t(board.name)}
                onClick={() => router.push({
                  pathname: '/boards/[id]',
                  query: { id: board.id },
                })}
              />
            })
          }
        </Grid>
      </Section>
    </WidthLimiter>
  );
}

export default BoardsIndexView;
