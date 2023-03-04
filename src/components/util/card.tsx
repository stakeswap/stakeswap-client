import { Typography } from '@mui/material';
import React from 'react';

// utils
// import { main1 } from './colors';

interface CardProps {
  width: string;
  height: string;
  title: string;
}

export function SwapCard(props: CardProps) {
  const { width, height, title } = props;
  return (
    <div
      style={{
        width,
        height,
        padding: '16px',
        borderRadius: '20px',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
    >
      <Typography
        style={{ marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}
      >
        {title}
      </Typography>
    </div>
  );
}
