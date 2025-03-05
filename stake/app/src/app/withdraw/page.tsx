'use client';

import { Box, Grid, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { Pid } from '../../utils';
import { useAccount, useWalletClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import useGetUserData from '../../hooks/useGetUserData';
import useUnstake from '../../hooks/useUnstake';
import useWithDraw from '../../hooks/useWithDraw';

export type UserStakeData = {
  staked: string;
  withdrawPending: string;
  withdrawable: string;
};

export const InitData = {
  staked: '0',
  withdrawable: '0',
  withdrawPending: '0',
};

const Withdraw: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { userData, refetch } = useGetUserData(0, address);
  const {
    unstakeToken,
    isError: isUnstakeTokenError,
    isLoading: isUnstakeTokenLoading,
    errorMessage: unstakeTokenErrorMessage,
    isSuccess: isUnstakeTokenSuccess,
  } = useUnstake();
  const {
    withdrawToken,
    isError: isWithdrawTokenError,
    isLoading: isWithdrawTokenLoading,
    errorMessage: withdrawTokenErrorMessage,
    isSuccess: isWithdrawTokenSuccess,
  } = useWithDraw();
  const [amount, setAmount] = useState('0');
  const { data } = useWalletClient();

  const isWithdrawable = useMemo(() => {
    return Number(userData.withdrawable) > 0 && isConnected;
  }, [userData, isConnected]);

  const handleUnStake = async () => {
    if (!address || !data) return;
    try {
      unstakeToken(Pid, amount);
    } catch (error) {
      console.log(error, 'stake-error');
    }
  };
  useEffect(() => {
    if (isUnstakeTokenError) {
      toast.error(unstakeTokenErrorMessage);
    }
  }, [isUnstakeTokenError]);
  useEffect(() => {
    if (isUnstakeTokenSuccess) {
      toast.success('Transaction receipt !');
      refetch?.();
    }
  }, [isUnstakeTokenSuccess]);
  const handleWithdraw = async () => {
    if (!address || !data) return;
    try {
      withdrawToken(Pid);
    } catch (error) {
      console.log(error, 'stake-error');
    }
  };
  useEffect(() => {
    if (isWithdrawTokenError) {
      toast.error(withdrawTokenErrorMessage);
    }
  }, [isWithdrawTokenError]);
  useEffect(() => {
    if (isWithdrawTokenSuccess) {
      toast.success('Transaction receipt !');
      refetch?.();
    }
  }, [isWithdrawTokenSuccess]);
  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        width={'100%'}
      >
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>
          Rcc Stake
        </Typography>
        <Typography sx={{}}>Stake ETH to earn tokens.</Typography>
        <Box
          sx={{
            border: '1px solid #eee',
            borderRadius: '12px',
            p: '20px',
            width: '600px',
            mt: '30px',
          }}
        >
          <Grid
            container
            sx={{
              mb: '60px',
              '& .title': {
                fontSize: '15px',
                mb: '5px',
              },
              '& .val': {
                fontSize: '18px',
                fontWeight: 'bold',
              },
            }}
          >
            <Grid item xs={4}>
              <Box
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
              >
                <Box className="title">Staked Amount: </Box>
                <Box className="val">{userData.staked} ETH</Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
              >
                <Box className="title">Available to withdraw </Box>
                <Box className="val">{userData.withdrawable} ETH</Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
              >
                <Box className="title">Pending Withdraw: </Box>
                <Box className="val">{userData.withdrawPending} ETH</Box>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ fontSize: '20px', mb: '10px' }}>Unstake</Box>
          <TextField
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            sx={{ minWidth: '300px' }}
            label="Amount"
            variant="outlined"
          />
          <Box mt="20px">
            {!isConnected ? (
              <ConnectButton />
            ) : (
              <LoadingButton
                variant="contained"
                loading={isUnstakeTokenLoading}
                onClick={handleUnStake}
              >
                UnStake
              </LoadingButton>
            )}
          </Box>
          <Box sx={{ fontSize: '20px', mb: '10px', mt: '40px' }}>Withdraw</Box>
          <Box> Ready Amount: {userData.withdrawable} </Box>
          <Typography fontSize={'14px'} color={'#888'}>
            After unstaking, you need to wait 20 minutes to withdraw.
          </Typography>
          <LoadingButton
            sx={{ mt: '20px' }}
            disabled={!isWithdrawable}
            variant="contained"
            loading={isWithdrawTokenLoading}
            onClick={handleWithdraw}
          >
            Withdraw
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default Withdraw;
