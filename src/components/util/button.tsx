import React from 'react';

import { Button, Typography } from '@mui/material';

interface ButtonProps {
  width: string;
  height: string;
  fontSize: string;
  text: string;
  borderRadius: string;
  onClick: any;
}

export function ContainedButton(props: ButtonProps) {
  const { width, height, fontSize, text, borderRadius, onClick } = props;
  return (
    <Button
      variant="contained"
      style={{
        width,
        height,
        padding: '8px 16px',
        backgroundColor: '#408CF7',
        color: 'white',
        borderRadius,
        border: 'none',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textTransform: 'none',
      }}
      onClick={onClick}
    >
      <Typography style={{ fontSize: `${fontSize}rem`, fontWeight: 600 }}>
        {text}
      </Typography>
    </Button>
  );
}

export function OutlinedButton(props: ButtonProps) {
  const { width, height, fontSize, text, borderRadius, onClick } = props;
  return (
    <Button
      variant="outlined"
      style={{
        width,
        height,
        color: '#408CF7',
        border: '2px solid #408CF7',
        borderRadius,
        textAlign: 'center',
        lineHeight: '50px',
        whiteSpace: 'nowrap',
        textTransform: 'none',
      }}
      onClick={onClick}
    >
      <Typography style={{ fontSize: `${fontSize}rem`, fontWeight: 'bold' }}>
        {text}
      </Typography>
    </Button>
  );
}
