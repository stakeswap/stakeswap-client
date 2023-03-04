import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ethers } from 'ethers';
// resources
import TOKENLIST from '../../resources/token-list.json';

interface TokenSearchModalProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'white',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

export default function TokenSearchModal(props: TokenSearchModalProps) {
  const { open, handleClose } = props;

  const [searchKeyword, setSearchKeyword] = React.useState('');
  const { tokenObject } = TOKENLIST;
  const [tokenList, setTokenList] = React.useState(TOKENLIST.tokenList);
  console.log(tokenList);

  const handleSearchKeyword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const tempSearchKeyword: string = e.target.value;
    setSearchKeyword(tempSearchKeyword);
    if (tempSearchKeyword.length === 0) {
      setTokenList(TOKENLIST.tokenList);
    } else if (ethers.utils.isAddress(tempSearchKeyword)) {
      if (Object.keys(tokenObject).includes(tempSearchKeyword)) {
        console.log(tempSearchKeyword);
      }
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Select a Token
          </Typography>
          <Input
            style={{
              width: '100%',
              height: '40px',
              marginTop: '16px',
              padding: '16px',
              backgroundColor: 'rgb(245, 246, 252)',
              border: '1px solid rgb(210, 217, 238)!important',
              borderRadius: '12px',
              fontSize: '16px',
            }}
            disableUnderline
            placeholder="Search name or paste address"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            value={searchKeyword}
            onChange={(e) => handleSearchKeyword(e)}
          />
          <hr
            style={{
              marginTop: '16px',
              border: '0.5px solid rgb(210, 217, 238)',
            }}
          />
          <div
            style={{
              maxHeight: '450px',
              padding: '0 10px',
              overflow: 'scroll',
            }}
          >
            {tokenList.length > 0
              ? tokenList.map((token) => {
                  return (
                    <div
                      style={{
                        height: '56px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <img
                          style={{
                            width: '36px',
                            height: '36px',
                            marginRight: '8px',
                          }}
                          src={token.logoURI}
                          alt="token-logo"
                        />
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <Typography style={{ fontSize: '16px' }}>
                            {token.name}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: '12px',
                              color: 'rgb(152, 161, 192)',
                            }}
                          >
                            {token.symbol}
                          </Typography>
                        </div>
                      </div>
                      <Typography>0</Typography>
                    </div>
                  );
                })
              : null}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
