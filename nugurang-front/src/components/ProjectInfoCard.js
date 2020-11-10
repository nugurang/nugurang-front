import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

import UserGroupInfoCard from './UserGroupInfoCard';


export default function ProjectInfoCard({ project }) {
  const router = useRouter();
  return (
    <UserGroupInfoCard
      primary={project.name}
      secondary={project.name}
      title={project.title}
      users={project.users}
      onClick={() => project.onClick ? project.onClick() : null}
      onAddButtonClick={() => router.push({pathname: `/projects/invite`, query: { id: project.id }})}
    />
  );
}
