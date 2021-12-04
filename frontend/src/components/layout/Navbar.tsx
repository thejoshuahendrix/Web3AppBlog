import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { ToggleThemeButton } from '../../App';
import Web3Connector from '../Web3Connector';
import Burger from './Burger';
import Menu from './Menu';

const TopBar = styled.div`
    height: 50px;
    background: ${({ theme }) => theme.colors.background};
    position: absolute;
    top: 0;
    color: ${({ theme }) => theme.heading};
    width: 100%;
    padding: 0.5rem 0 0 0;
    z-index: 20;
    box-shadow: ${({ theme }) => theme.card.boxShadow};
    
    a:visited{
        color: ${({ theme }) => theme.heading};
    }

`

export const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 5% 0px 5%;
    height: 50px;
    z-index: 120;
    
`
const Logo = styled.div`
    font-size: 30px;
    width: 50px;
    height: 40px;
    margin-bottom: 20px;
    a:hover{
        color: ${({ theme }) => theme.colors.text};
    }
`
export const LinkWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    padding: .3rem 1rem 0rem 1rem;
    height: 50px;
    font-size: 24px;
    gap: 2rem;
    z-index: 120;
    a:hover{
        color: ${({ theme }) => theme.colors.text};
    }
`
export const ConnectButton = styled.button`
    opacity: .7;
    height:30px;
    margin-bottom: 20px;
    background: ${({ theme }) => theme.button.background}; 
    color: ${({ theme }) => theme.button.text}; 
    z-index: 120;
    border-radius: 25px;
`

export const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.backdrop};
  height: 50vh;
  width: 25vw;
  text-align: center;
  z-index: inherit -1;
  padding: 2rem;
  position: absolute;
  top: 0px;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 1rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const GradientWrap = styled.div`
    background: ${({ theme }) => theme.card.gradient}; 
    color: ${({ theme }) => theme.button.text}; 
    border-radius: 25px;
    height: 35px;
    font-size: 14px;
    font-weight: bolder;
    margin-top: -5px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 20px;
`
interface Props {
    themeChanger: () => void;
    
}

const Navbar = ({ themeChanger }: Props) => {
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(true);
    const theme = useTheme();
    const isDesktopOrLaptop = useMediaQuery({ query: `(min-width: ${theme.mobile})` })
    const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${theme.mobile})` })

    return (
        <TopBar>
            <NavWrapper>
                <Logo><Link style={{ textDecoration: "none" }} to='/'>Web3</Link>
                    <ToggleThemeButton onClick={() => { setToggle(!toggle); themeChanger() }} active={toggle}  >Toggle Theme</ToggleThemeButton>
                </Logo>
                <LinkWrapper>


                    {isDesktopOrLaptop && <>
                        <Link style={{ textDecoration: "none", fontSize:"20px" }} to='/contact'>Contact</Link>
                        <Link style={{ textDecoration: "none", fontSize:"20px" }} to='/about'>About</Link>
                        <Link style={{ textDecoration: "none", fontSize:"20px" }} to='/posts'>Posts</Link>
                        <Link style={{ textDecoration: "none", fontSize:"20px" }} to='/blog1'>Express Blog</Link>
                        <Link style={{ textDecoration: "none", fontSize:"20px" }} to='/blog2'>MVC Blog</Link>
                        <Web3Connector /> </>
                    }{isTabletOrMobile && <>
                        <Burger open={open} setOpen={setOpen} />
                        <Menu open={open} setOpen={setOpen} />
                    </>}
                </LinkWrapper>
            </NavWrapper>
        </TopBar >
    )
}

export default Navbar
