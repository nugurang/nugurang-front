import { ApolloQueryResult, gql } from '@apollo/client';
import { mutateToBackend, queryToBackend } from '@/utilities/network/graphQl';
import { GetServerSidePropsContextAdapter } from '@/constants/common';
import { ArticleVoteTypeDTO } from '@/dtos/article';

export interface GetAllArticleVoteTypesProps extends GetServerSidePropsContextAdapter {}
interface GetAllArticleVoteTypesResponseRawListItem {
  id: string;
  name: string;
}
export interface GetAllArticleVoteTypesResponse {
  data: {
    articleVoteTypeList: ArticleVoteTypeDTO[];
  }
}
export const getAllArticleVoteTypes = async (props: GetAllArticleVoteTypesProps = {}) => {
  const response: ApolloQueryResult<any> = await queryToBackend({
    query: gql`
      query getAllVoteTypes {
        voteTypes {
          id
          name
        }
      }
    `,
    context: props.context
  });
  const articleVoteTypeList = response.data.voteTypes.map((articleVoteType: GetAllArticleVoteTypesResponseRawListItem) => ({
    ...articleVoteType,
  }));
  return {
    data: {
      articleVoteTypeList,
    }
  };
};

export interface CreateArticleVoteMutationProps extends GetServerSidePropsContextAdapter {
  userId: string;
  articleId: string;
  articleVoteTypeId: string;
}
export const createArticleVote = async (props: CreateArticleVoteMutationProps) => {
  const { userId, articleId, articleVoteTypeId } = props; 
  const response = await mutateToBackend({
    mutation: gql`
      mutation CreateVote($vote: VoteInput!) {
        createVote(vote: $vote) {
          id
        }
      }
    `,
    variables: {
      vote: {
        user: userId,
        article: articleId,
        voteType: articleVoteTypeId,
      },
    },
    context: props.context
  });
  return {
    data: response.data.createVote
  };
};
