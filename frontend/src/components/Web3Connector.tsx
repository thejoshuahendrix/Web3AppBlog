import { formatUnits } from '@ethersproject/units';
import { InjectedConnector } from '@web3-react/injected-connector';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { getEtherBalance } from './AuthTest';
import { GradientWrap } from './layout/Navbar';

const Web3Connector = () => {
    const [balance, setBalance] = useState("");
    const [avatar, setAvatar] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKVJREFUWEdj3FX+6j8DEvi42QOZi8Hm992BV55U/YyjDhh0IYA3gmkgiZEGaGAHXiNHHUAwBAjla0JRRqjcGHXAwIfAai0jlLoAPc7Q0wChOCWkHl2ecdQBAx4CF/S1UNLA7d8ceLO2KusPvPKk6mccdcCgC4FXHgdQ4pjadYHYDgcU8zHSwKgDRkNgNAToHgKkVkaE2oDo8oTaFyS3B0YdQO0QAABqSfdp1gqw9AAAAABJRU5ErkJggg==");
    const [ethAddress, setEthAddress] = useState("");
    const { account,
        activate,
        deactivate,
        active,
        chainId,
        library } = useAuth();
    useEffect(() => {
        if (active && library) {
            
            (async () => {
                const lib = (await library)
                let bal = await getEtherBalance(lib, chainId, account);
                setBalance(parseFloat(formatUnits(bal, 18)).toFixed(3));

                if (chainId === 1) {
                    let adr = await lib.lookupAddress(account);
                    setEthAddress(adr);
                    if (adr) {
                        let ave = await lib.getAvatar(adr);
                        setAvatar(ave);
                    }
                }
            })()
        } else {
            
        }
    }, [library, active, chainId, account])
    return (
        <>
            {!active &&
                <GradientWrap onClick={() => {
                    activate(new InjectedConnector({}));
                }}>
                    Connect Wallet
                </GradientWrap>}

            {active && balance.toString()}{active && chainId === 1 ? "ETH" : ""}{active && chainId === 137 ? "WETH" : ""}
            {active && <GradientWrap onClick={deactivate}>Disconnect</GradientWrap>}
        </>
    )
}

export default Web3Connector
