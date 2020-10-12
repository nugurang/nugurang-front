import React from 'react';

import PageTitleBoxWithoutBackButton from '../../components/PageTitleBoxWithoutBackButton';

export default function CompTest() {

  let title = 'Back';
  
  return (
	<div>
	  <PageTitleBoxWithoutBackButton title={title} />
	</div>
  );
}
