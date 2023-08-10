
import { gql } from '@urql/core';

import { getBackendGraphqlClient } from "@/libraries/urql";

import Carousel from '@/components/Carousel';
import Chip, { ChipGroup } from '@/components/Chip';
import PageRow from '@/components/PageRow';
import { DummyBannerCard, DummyVerticalListCard } from '@/compositions/Dummy';

import {
  faCode
} from "@fortawesome/free-solid-svg-icons";

/*
const UserQuery = gql`
  {
    Post(id: 1) {
        id
        title
        views
        User {
            name
        }
        Comments {
            date
            body
        }
    }
  }
`;
*/

const GetCurrentOAuth2UserQuery = gql`
  {
    currentOAuth2User {
      id
      name
      email
    }
  }
`;

async function getOAuth2UserInfo() {
  const backendGraphqlClient = getBackendGraphqlClient();
  const result = await backendGraphqlClient.query(GetCurrentOAuth2UserQuery,
    {}
  );
  return result;
}

export default async function Page() {
  // const { data, error } = await getUserInfo();
  const { data, error } = await getOAuth2UserInfo();
  console.log(data)
  console.log(error)

  return (
    <>
      <PageRow limitWidth={false}>
        <Carousel>
          <DummyBannerCard />
          <DummyBannerCard />
        </Carousel>
      </PageRow>
      <PageRow>
        <div
          className={[
            'flex', 'justify-center', 'items-center'
          ].join(' ')}
        >
          <span className='text-2xl font-bold'>주목할 스레드</span>
        </div>
      </PageRow>
      <PageRow>
        <div
          className={[
            'grid', 'xs:grid-cols-2', 'sm:grid-cols-2', 'gap-4',
            'mt-4',
          ].join(' ')}
        >
          <DummyVerticalListCard
            title='Hot threads'
            icon={faCode}
            itemCount={5}
          />
          <DummyVerticalListCard
            title='Recently created threads'
            icon={faCode}
            itemCount={3}
          />
        </div>
      </PageRow>
      <PageRow>
        <div
          className={[
            'flex', 'justify-center', 'items-center'
          ].join(' ')}
        >
          <span className='text-2xl font-bold'>스레드를 탐색하세요.</span>
        </div>
      </PageRow>
      <PageRow>
        <ChipGroup>
          <Chip id='thread-cpp' label='C/C++' />
          <Chip id='thread-kotlin' label='Java/Kotlin' />
          <Chip id='thread-swift' label='Objective-C/Swift' />
          <Chip id='thread-python' label='Python' />
          <Chip id='thread-typescript' label='JavaScript/TypeScript' />
          <Chip id='thread-ruby' label='Ruby' />
          <Chip id='thread-go' label='Go' />
          <Chip id='thread-etc' label='Etc' />
        </ChipGroup>
      </PageRow>
      <PageRow>
        <DummyVerticalListCard
          itemCount={15}
          marginTop={true}
        />
      </PageRow>
    </>
  );
}
