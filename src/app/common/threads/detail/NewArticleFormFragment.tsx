'use client'

import Box from '@/components/Box';
import Card from '@/components/Card';
import FontAwesomeIconButton from "@/components/FontAwesomeIconButton";
import Label from '@/components/Label';
import TextfieldMultiline from '@/components/TextfieldMultiline';

import {
  faSearch,
  faPlus,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

export default function NewArticleFragment() {
  return (
    <Card>
      <Box
        extraPadding={true}
      >
        <Label label='아래에 새 글 추가'>
          <TextfieldMultiline
            className={[
              'grow'
            ].join(' ')}
          />
        </Label>
        <div className={[
          'flex', 'justify-end', 'items-center', 'gap-2',
          'mt-4',
        ].join(' ')}>
          <FontAwesomeIconButton
            icon={faPaperPlane}
            label='추가'
            palette='primary'
          />
        </div>
      </Box>
    </Card>
  );
}
