import React from 'react';
import Grid from '@material-ui/core/Grid';

import UserGroupInfoCard from './UserGroupInfoCard';


export default function TaskInfoCard({ task }) {
  return (
    <UserGroupInfoCard
      primary={task.name}
      secondary={task.name}
      title={task.title}
      users={task.users}
      onClick={() => task.onClick ? task.onClick() : null}
    />
  );
}
