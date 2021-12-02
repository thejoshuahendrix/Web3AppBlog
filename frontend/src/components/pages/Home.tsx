import styled from 'styled-components'
import { AuthTest } from '../AuthTest'

const HomeWrapper = styled.div`
    background-color:  ${({ theme }) => theme.colors.backdrop};;
    height: 60vh;
    width: 100%;
    color:  ${({ theme }) => theme.heading};
    border-radius: ${({theme})=> theme.card.borderRadius};
    box-shadow: ${({theme})=> theme.card.boxShadow};
`
const HomeTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: ${({theme})=> theme.card.borderRadius};
`

const Home = () => {
    return (
        <HomeWrapper>
            <HomeTextWrapper style={{padding: '30px', margin: 'auto', textAlign:'center' }}><h1>Welcome to the Web3 Hub, Here you can view your NFTs and balance info from your wallet.</h1></HomeTextWrapper>
            <AuthTest />
        </HomeWrapper>
    )
}

export default Home
