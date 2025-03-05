'use client';
import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAccount, useWalletClient, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import useGetStakingBalance from '../hooks/useGetStakingBalance';
import useDepostitEth from '../hooks/useDepostitEth';

const Home = () => {
  const { address, isConnected } = useAccount();
  const { data: stakedAmount, refetch } = useGetStakingBalance(0, address);
  const { depostitToken, isLoading, isError, isSuccess, errorMessage } =
    useDepostitEth();
  const [amount, setAmount] = useState('0');
  const { data } = useWalletClient();
  const { data: balance } = useBalance({
    address: address,
  });
  const handleStake = async () => {
    if (!address || !data) return;
    console.log(balance, amount, 'wallet');

    if (parseFloat(amount) > parseFloat(balance!.formatted)) {
      toast.error('Amount cannot be greater than current balance');
      return;
    }

    try {
      depostitToken(amount);
    } catch (error) {
      console.log(error, 'stake-error');
    }
  };
  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
  }, [isError]);
  useEffect(() => {
    if (isSuccess) {
      toast.success('Transaction receipt !');
      refetch?.();
    }
  }, [isSuccess, refetch]);
  return (
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
      {/* <Button onClick={updatePool}>Update</Button> */}
      <Box
        sx={{
          border: '1px solid #eee',
          borderRadius: '12px',
          p: '20px',
          width: '600px',
          mt: '30px',
        }}
      >
        <Box display={'flex'} alignItems={'center'} gap={'5px'} mb="10px">
          <Box>Staked Amount: </Box>
          <Box>{stakedAmount} ETH</Box>
        </Box>
        <TextField
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          sx={{ minWidth: '300px' }}
          label="Amount"
          variant="outlined"
        />
        <Box mt="30px">
          {!isConnected ? (
            <ConnectButton />
          ) : (
            <LoadingButton
              variant="contained"
              loading={isLoading}
              onClick={handleStake}
            >
              Stake
            </LoadingButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
