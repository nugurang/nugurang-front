import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

import UserGroupInfoCard from './UserGroupInfoCard';


export default function TeamInfoCard({ team }) {
  const router = useRouter();
  return (
    <UserGroupInfoCard
      primary={team.name}
      secondary={team.name}
      title={team.title}
      users={team.users}
      onClick={() => team.onClick ? team.onClick : router.push(`/teams/${team.id}`)}
      onAddButtonClick={() => router.push({pathname: `/teams/invite`, query: { id: team.id }})}
    />
  );
}
