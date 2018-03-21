import Web3 from 'web3';
import config from './config';

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.httpProvider));
export default web3;
