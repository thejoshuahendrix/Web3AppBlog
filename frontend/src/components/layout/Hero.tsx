import styled from 'styled-components';


const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  background: url(${({theme})=> theme.background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`

const HeroText = styled.div`
  z-index: 1;
  text-align: center;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({theme})=> theme.heading};
  font-size: 72px;
  
`
const HeroLowerText = styled.div`
  z-index: 1;
  text-align: center;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({theme})=> theme.heading};
  font-size: 45px;
  @media (max-width: 1000px) {
      opacity: 0%;
  }
`
const Hero = () => {

  return (
    <>
      <HeroImage>
        <HeroText id="hero">Web3 Tech</HeroText>
        <HeroLowerText>The future of web!</HeroLowerText>
      </HeroImage> 
    </>
  )
}

export default Hero