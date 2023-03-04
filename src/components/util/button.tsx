import React from 'react';
// mui
import { Button, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// utils
import { primary, purple } from './colors';
// resources
import TOKENLIST from '../../resources/token-list.json';

interface PrimaryContainedButtonProps {
  width: string;
  height: string;
  fontSize: string;
  text: string;
  borderRadius: string;
  onClick: any;
}

interface GradientContainedButtonProps {
  width: string;
  height: string;
  fontSize: string;
  text: string;
  borderRadius: string;
  onClick: any;
}

interface OutlinedButtonProps {
  width: string;
  height: string;
  fontSize: string;
  text: string;
  borderRadius: string;
  onClick: any;
}

interface TokenSearchButtonProps {
  backgroundColor: string;
  onClick: () => void;
}

export function PrimaryContainedButton(props: PrimaryContainedButtonProps) {
  const { width, height, fontSize, text, borderRadius, onClick } = props;
  return (
    <Button
      variant="contained"
      style={{
        width,
        height,
        padding: '8px 16px',
        backgroundColor: primary,
        color: 'white',
        borderRadius,
        border: 'none',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textTransform: 'none',
      }}
      onClick={onClick}
    >
      <Typography style={{ fontSize: `${fontSize}px`, fontWeight: '600' }}>
        {text}
      </Typography>
    </Button>
  );
}

export function GradientContainedButton(props: GradientContainedButtonProps) {
  const { width, height, fontSize, text, borderRadius, onClick } = props;
  return (
    <Button
      variant="contained"
      style={{
        width,
        height,
        padding: '8px 16px',
        background: `linear-gradient(to right, ${primary}, ${purple})`,
        color: 'white',
        borderRadius,
        border: 'none',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textTransform: 'none',
      }}
      onClick={onClick}
    >
      <Typography style={{ fontSize: `${fontSize}px`, fontWeight: '600' }}>
        {text}
      </Typography>
    </Button>
  );
}

export function OutlinedButton(props: OutlinedButtonProps) {
  const { width, height, fontSize, text, borderRadius, onClick } = props;
  return (
    <Button
      variant="outlined"
      style={{
        width,
        height,
        color: primary,
        border: `2px solid ${primary}`,
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

export function TokenSearchButton(props: TokenSearchButtonProps) {
  const { backgroundColor, onClick } = props;

  return (
    <Button
      style={{
        padding: '4px',
        backgroundColor,
        color: 'black',
        borderRadius: '20px',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'none',
      }}
      onClick={onClick}
    >
      <img
        style={{ width: '20px', height: '20px', marginRight: '8px' }}
        src={
          TOKENLIST.tokenObject['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee']
            .logoURI
        }
        alt="token-logo"
      />
      <Typography
        style={{
          marginRight: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {
          TOKENLIST.tokenObject['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee']
            .symbol
        }
      </Typography>
      <KeyboardArrowDownIcon />
    </Button>
  );
}
