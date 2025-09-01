import { Badge } from '@mui/material';
import React from 'react';

export const BadgeUi = ({ children }: { children: React.ReactNode }) => {
  return (
    <Badge
      color="secondary"
      badgeContent=" "
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiBadge-badge': {
          width: 10,
          height: 10,
          minWidth: 0,
          boxShadow: '0px 0px 4px 1px #FCA311',
          backgroundColor: '#FCA311',
          color: '#FCA311',
        },
      }}
    >
      {children}
    </Badge>
  );
}