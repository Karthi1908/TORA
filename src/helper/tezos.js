import { NetworkType } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit, MichelCodecPacker, compose } from '@taquito/taquito';


//const CONTRACT_ADDRESS = 'KT1EvyfVE1bLztZ6vigLHwjmZrNDr52vsNcq';
const TOKEN_ADDRESS = 'KT19Spcv2j1ktJd5EBTkg4XbnaEeRD1tWmhW';
const CONTRACT_ADDRESS = 'KT1QaSBB28diZQANVE6NNR7iQvnKKXtPivMX';
//const TOKEN_ADDRESS = 'KT1BvYkPGPau7xDSRxLVz7DQpuWZfrXBLL27';

//const Tezos = new TezosToolkit('https://hangzhounet.smartpy.io');
const Tezos = new TezosToolkit('https://jakartanet.ecadinfra.com');
Tezos.setPackerProvider(new MichelCodecPacker());

const ContractProvider = Tezos.contract;

const beaconWallet = new BeaconWallet({
  name: 'TORA',
  preferredNetwork: "jakartanet"
});

Tezos.setWalletProvider(beaconWallet);

const wallet = Tezos.wallet;

export { CONTRACT_ADDRESS,TOKEN_ADDRESS, Tezos, ContractProvider, wallet, beaconWallet };
