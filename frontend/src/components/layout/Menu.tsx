import { StyledMenu } from './Navbar';
import { Link } from 'react-router-dom';
import Web3Connector from '../Web3Connector';

const Menu = ({ open, setOpen }) => {

    return (
        <StyledMenu open={open}>
            <Link style={{ textDecoration: "none" }} to='/'>Home</Link>
            <Link style={{ textDecoration: "none" }} to='/contact'>Contact</Link>
            <Link style={{ textDecoration: "none" }} to='/about'>About</Link>
            <Link style={{ textDecoration: "none" }} to='/posts'>Posts</Link>
            <Link style={{ textDecoration: "none" }} to='/blog1'>Blog 1</Link>
            <Link style={{ textDecoration: "none" }} to='/blog2'>Blog 2</Link>
            <Web3Connector/>
        </StyledMenu>
    )
}
export default Menu;