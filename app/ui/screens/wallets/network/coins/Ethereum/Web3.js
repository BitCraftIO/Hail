import Web3 from 'web3';
import {HttpProvider} from './config';

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(HttpProvider));
export default web3;