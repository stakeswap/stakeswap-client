import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { ContainedButton } from '../util/button';
import Logo from '../../assets/Logo.png';

const useStyles: any = makeStyles({
  root: {
    height: '64px',
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 1px 5px black',
  },
  logo: {
    width: 'auto',
    height: '32px',
    marginLeft: '50px',
    cursor: 'pointer',
  },
  link: {
    marginRight: '16px',
    fontSize: '14px',
    fontWeight: 'bold!important',
    cursor: 'pointer',
    color: 'white',
  },
  linkGroup: {
    width: '370px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: '5%',
  },
});

function Navigation() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <img
        className={classes.logo}
        src={Logo}
        alt="logo"
        onClick={() => {
          history.push('/');
        }}
        height={16}
      />
      <div className={classes.linkGroup}>
        <Typography
          className={classes.link}
          onClick={() => {
            history.push('/');
          }}
        >
          Course
        </Typography>
        <ContainedButton
          width="134px"
          height="36px"
          text="Connect Wallet"
          fontSize="15px"
          borderRadius="10px"
          onClick=""
        />
      </div>
    </div>
  );
}

export default Navigation;
