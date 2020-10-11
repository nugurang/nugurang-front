import React from 'react';

import PageTitleAppBar from '../../components/PageTitleAppBar';

export default function TestComp() {
  let title = 'Back';
  return (
	<div>
	  <PageTitleAppBar title={title} />
	</div>
  );
}
