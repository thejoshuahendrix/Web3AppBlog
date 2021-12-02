import { formatUnits } from '@ethersproject/units';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ToggleThemeButton } from '../../App';
import { useAuth } from '../../hooks/useAuth';
import { getEtherBalance } from '../AuthTest';

const TopBar = styled.div`
    height: 50px;
    background: ${({ theme }) => theme.colors.background};
    position: sticky;
    top: 0;
    color: ${({ theme }) => theme.heading};
    width: 100%;
    padding: 0.5rem 0 0 0;
    z-index: 120;
    box-shadow: ${({ theme }) => theme.card.boxShadow};
    
    a:visited{
        color: ${({ theme }) => theme.heading};
    }

`

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 5% 0px 5%;
    height: 50px;
    
`
const Logo = styled.div`
    font-size: 32px;
    display: grid;
    justify-items: center;
    width: 50px;
    height: 50px;
    a:hover{
        color: ${({ theme }) => theme.colors.text};
    }
`
const LinkWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    padding: .5rem 1rem .5rem 1rem;
    font-size: 24px;
    gap: 2rem;
    a:hover{
        color: ${({ theme }) => theme.colors.text};
    }
`
const ConnectButton = styled.button`
    opacity: .7;
    height:30px;
    margin-bottom: 20px;
    background: ${({ theme }) => theme.button.background}; 
    color: ${({ theme }) => theme.button.text}; 
    border-radius: 25px;
`
const GradientWrap = styled.div`
    background: ${({ theme }) => theme.card.gradient}; 
    color: ${({ theme }) => theme.button.text}; 
    border-radius: 25px;
`
interface Props {
    themeChanger: () => void;
}

const Navbar = ({ themeChanger }: Props) => {
    const [balance, setBalance] = useState("");
    const [avatar, setAvatar] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAKVJREFUWEdj3FX+6j8DEvi42QOZi8Hm992BV55U/YyjDhh0IYA3gmkgiZEGaGAHXiNHHUAwBAjla0JRRqjcGHXAwIfAai0jlLoAPc7Q0wChOCWkHl2ecdQBAx4CF/S1UNLA7d8ceLO2KusPvPKk6mccdcCgC4FXHgdQ4pjadYHYDgcU8zHSwKgDRkNgNAToHgKkVkaE2oDo8oTaFyS3B0YdQO0QAABqSfdp1gqw9AAAAABJRU5ErkJggg==");
    const [ethAddress, setEthAddress] = useState("");
    const [toggle, setToggle] = useState(true);
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
        }
    }, [library, active, chainId, account])

    return (
        <TopBar>
            <NavWrapper>
                <Logo><Link style={{ textDecoration: "none" }} to='/'>Web3</Link>
                <ToggleThemeButton onClick={() => { setToggle(!toggle); themeChanger() }} active={toggle}  >Toggle Theme</ToggleThemeButton>
                </Logo>
                <LinkWrapper>
                    <Link style={{ textDecoration: "none" }} to='/contact'>Contact</Link>
                    <Link style={{ textDecoration: "none" }} to='/about'>About</Link>

                    {!active &&
                        <GradientWrap>
                            <ConnectButton onClick={() => {
                                activate(new InjectedConnector({}));
                            }}>
                                Connect Wallet
                            </ConnectButton>

                        </GradientWrap>}

                    {active && balance.toString()}{active && chainId == 1 ? "ETH" : ""}{active && chainId == 137 ? "WETH" : ""}
                    {active && <GradientWrap><ConnectButton onClick={deactivate}>Disconnect</ConnectButton></GradientWrap>}
                </LinkWrapper>
            </NavWrapper>
        </TopBar >
    )
}

export default Navbar
