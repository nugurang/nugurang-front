import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import 'array-flat-polyfill';

export default function FullScreenDialogBox({ children, titleBar=null }) {
  const router = useRouter();
  let key = 0;
  return (
    <>
      <Box display={titleBar ? "block" : "none"}>
        {titleBar}
      </Box>
      <Box mt="40%">
        {[children].flat().map((child) => <div key={++key}>{child}</div>)}
      </Box>
    </>
  );
}