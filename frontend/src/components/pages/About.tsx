import styled from 'styled-components'
import React from 'react'

const AboutWrapper = styled.div`
    color: ${({ theme }) => theme.colors.textSecondary};
    width:80%;
    padding:20px;
     margin:auto;
`

const About = () => {
    return (
        <AboutWrapper>
            This is a simple Web3 app built by Joshua Hendrix, with the help of LVK.
            Its purpose is to see the utility of Web3 for frontend applications.
        </AboutWrapper>
    )
}

export default About
