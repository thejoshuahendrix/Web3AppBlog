/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from '../hooks/useAuth';
import { InjectedConnector } from "@web3-react/injected-connector";
import { formatUnits } from '@ethersproject/units';
import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { PolygonEthAbi } from './PolygonEthAbi';
import Web3 from 'web3';
import styled from 'styled-components';



export const getEtherBalance = async (
    lib: Web3Provider,
    chain: number,
    account: string
) => {
    if (chain === 1) {
        return await lib.getBalance(account);
    }
    if (chain === 137) {
        const signer = lib.getSigner();
        const contract = new Contract(
            "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
            PolygonEthAbi,
            signer
        );
        contract.connect(lib.getSigner());
        return await contract["balanceOf"](account);
    }
    return -1;
};




const ContentWrapper = styled.div`
    width: 80%; 
    padding: 20px; 
    margin: auto; 
    display: flex; 
    flex-direction: column;
    justify-content: center;
    color: ${({theme})=> theme.colors.textSecondary};
`

export const AuthTest = () => {
    const { account,
        activate,
        deactivate,
        active,
        chainId,
        library } = useAuth();
    const [balance, setBalance] = useState("");
    const [gas, setGas] = useState<BigNumber>(null);
    const [avatar, setAvatar] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKVJREFUWEdj3FX+6j8DEvi42QOZi8Hm992BV55U/YyjDhh0IYA3gmkgiZEGaGAHXiNHHUAwBAjla0JRRqjcGHXAwIfAai0jlLoAPc7Q0wChOCWkHl2ecdQBAx4CF/S1UNLA7d8ceLO2KusPvPKk6mccdcCgC4FXHgdQ4pjadYHYDgcU8zHSwKgDRkNgNAToHgKkVkaE2oDo8oTaFyS3B0YdQO0QAABqSfdp1gqw9AAAAABJRU5ErkJggg==");
    const [ethAddress, setEthAddress] = useState("");

    useEffect(() => {
        if (active && library) {

            (async () => {
                const lib = (await library)
                let bal = await getEtherBalance(lib, chainId, account);
                setBalance(formatUnits(bal, 18));
                let gasFee = await lib.getGasPrice();
                setGas(gasFee);
                if (chainId === 1) {
                    let adr = await lib.lookupAddress(account);
                    setEthAddress(adr);
                    if (adr) {
                        let ave = await lib.getAvatar(adr);
                        setAvatar(ave);
                    }
                }
            })()
        }
    }, [library, active, chainId, account])

    if (active) {



        return (
            <ContentWrapper>

                <h2>You are logged in!</h2><br /><br />
                <h3>Account: {account}</h3><br /><br />
                <h3>Chain: {chainId} : {chainId === 1 ? 'Ethereum' : ''}{chainId === 137 ? 'Polygon' : ""} Network</h3><br /><br />
                <h3>Balance: {parseFloat(balance).toFixed(5)} {chainId === 1 ? 'ETH' : ''}{chainId === 137 ? 'WETH' : ""}</h3><br /><br />
                <h3>Current Gas Price: {gas && parseFloat(formatUnits(gas, 9)).toFixed(3)} GWEI</h3><br /><br />
                <h3>{ethAddress ? "ENS:" + ethAddress : "No ENS name Found"}</h3>
                <img height="50px" width="50px" src={avatar} alt="avatar" /><br /><br />
                <div style={{ display: 'flex', justifyContent: 'center' }}></div>
            </ContentWrapper>

        );
    } else {
        return null;
    }
};