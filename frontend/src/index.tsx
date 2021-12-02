import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import './index.css'
import { render } from 'react-dom';
import  App  from './App';

const getLibrary = async (provider: any) => {
    const library = new Web3Provider(provider);
    return library;
};

render(
    <Web3ReactProvider getLibrary={getLibrary} >
        <App />
    </Web3ReactProvider>
, document.getElementById('root'));

// 😏 Luc was here