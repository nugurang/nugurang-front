'use client'

import { useRouter } from 'next/navigation'

import Box from '@/components/Box';
import Button, { HorizontalButtonGroup } from '@/components/Button';
import Card from '@/components/Card';
import Label from '@/components/Label';
import Textfield from '@/components/Textfield';
import TextfieldMultiline from '@/components/TextfieldMultiline';

import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

export default function SearchBarFragment() {
  const router = useRouter();
  return (
    <Card>
      <Box>
        <div className={[
          'flex', 'flex-col', 'gap-4'
        ].join(' ')}>
          <Label
            label={'제목'}
            isRequired={true}
          >
            <Textfield />
          </Label>
          <Label
            label={'본문'}
            isRequired={true}
          >
            <TextfieldMultiline />
          </Label>
        </div>
        <HorizontalButtonGroup marginTop={true}>
          <Button
            label='게시'
            palette='primary'
          />
          <Button
            label='취소'
            palette='error'
            onClick={() => router.push('/common/boards/detail')}
          />
        </HorizontalButtonGroup>
      </Box>
    </Card>
  );
}
