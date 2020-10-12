import React from 'react';

import UserBriefInfoBox from '../../components/UserBriefInfoBox';

export default function CompTest() {

const user = {
  name: "Username",
  image: "/static/favicon/favicon-nugurang.png",
  statistics: "Statistics",
  bio: "Bio"
}

  return (
	<div>
	  <UserBriefInfoBox user={user} />
	</div>
  );
}
