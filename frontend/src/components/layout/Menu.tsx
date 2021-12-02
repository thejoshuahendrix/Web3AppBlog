import React, { useEffect, useState } from 'react';
import { ConnectButton, GradientWrap, LinkWrapper, StyledMenu } from './Navbar';
import { Link } from 'react-router-dom';
import Burger from './Burger';
import { getEtherBalance } from '../AuthTest';
import { formatUnits } from '@ethersproject/units';
import { useAuth } from '../../hooks/useAuth';
import { InjectedConnector } from '@web3-react/injected-connector';
import Web3Connector from '../Web3Connector';

const Menu = ({ open, setOpen }) => {

    return (
        <StyledMenu open={open}>
            <Link style={{ textDecoration: "none" }} to='/'>Home</Link>
            <Link style={{ textDecoration: "none" }} to='/contact'>Contact</Link>
            <Link style={{ textDecoration: "none" }} to='/about'>About</Link>
            <Link style={{ textDecoration: "none" }} to='/posts'>Posts</Link>
            <Link style={{ textDecoration: "none" }} to='/blog'>Blog</Link>
            <Web3Connector/>
        </StyledMenu>
    )
}
export default Menu;