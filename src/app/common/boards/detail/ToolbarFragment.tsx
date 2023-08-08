'use client'

import { useRouter } from 'next/navigation'

import Autocomplete from '@/components/Autocomplete';
import FontAwesomeIconButton from "@/components/FontAwesomeIconButton";

import {
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const mockKeywordSearchCandidateList = [
  {
    label: '검색결과 1',
    icon: faSearch,
    onClick: () => alert('검색결과 1'),
  },
  {
    label: '검색결과 2',
    icon: faSearch,
    onClick: () => alert('검색결과 2'),
  },
  {
    label: '검색결과 3',
    icon: faSearch,
    onClick: () => alert('검색결과 3'),
  },
]

export default function ToolbarFragment() {
  const router = useRouter();
  return (
    <>
      <div className={[
        'flex', 'justify-end', 'items-center', 'gap-2',
      ].join(' ')}>
        <Autocomplete
          type='search'
          placeholder='키워드를 입력하세요.'
          className={[
            'w-full', 'sm:max-w-[16rem]'
          ].join(' ')}
          candidateList={mockKeywordSearchCandidateList}
        />
        <FontAwesomeIconButton icon={faSearch} />
        <FontAwesomeIconButton icon={faPlus} onClick={() => router.push('/common/boards/create')} />
      </div>
    </>
  );
}
