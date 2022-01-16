import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

import UserGroupInfoCard from './UserGroupInfoCard';


export default function WorkInfoCard({ work }) {
  const router = useRouter();
  return (
    <UserGroupInfoCard
      primary={work.name}
      secondary={work.name}
      title={work.title}
      users={work.users}
      onClick={() => work.onClick ? work.onClick() : null}
    />
  );
}
