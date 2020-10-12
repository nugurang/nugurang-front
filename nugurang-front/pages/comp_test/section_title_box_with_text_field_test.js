import React from 'react';

import AssignmentIcon from '@material-ui/icons/Assignment';
import SectionTitleBoxWithTextField from '../../components/SectionTitleBoxWithTextField';

export default function CompTest() {
	
  let title = 'Title';

  return (
	<div>
	  <SectionTitleBoxWithTextField title={title} icon={<AssignmentIcon />} />
	</div>
  );
}
