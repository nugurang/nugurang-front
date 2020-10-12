import React from 'react';

import AssignmentIcon from '@material-ui/icons/Assignment';
import SectionTitleBox from '../../components/SectionTitleBox';

export default function CompTest() {
	
  let title = 'Title';

  return (
	<div>
	  <SectionTitleBox title={title} icon={<AssignmentIcon />} />
	</div>
  );
}
