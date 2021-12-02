import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import Hero from './components/layout/Hero';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import { DarkTheme, LightTheme } from './themes';


export const ToggleThemeButton = styled.div<{ active: boolean }>`
  
background: ${({ theme }) => theme.colors.background};
color: ${({ theme }) => theme.colors.textSecondary};
padding: 1rem;
opacity: 0;
text-align: center;
font-size: 14px;
height: 50px;
width: 100px;
border-radius: ${({ theme }) => theme.card.borderRadius};
overflow:hidden;
&:after{
        content: "O";
        position: relative;
        top:22px;
        color: rgba(0,0,0,0);
        ${({ active }) => active ? 'right:0px;' : 'right: calc(100% - 40px);'};
        width:20px;
        font-size: 20px;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,.4);
        background-color:${({ active }) => active ? '#252525 ' : '#e9e9e9'};
        transition: 500ms right;
}
&:hover{
  opacity: 1;
}
`

const ContentCard = styled.div`
  width: 80%;
  box-shadow: ${({ theme }) => theme.card.boxShadow};
  background-color: ${({ theme }) => theme.colors.backdrop};
  justify-content: center;
  margin: auto;
  margin-top: 10%;
  opacity: .7;
  border-radius: ${({ theme }) => theme.card.borderRadius};
  
`
const AppWrapper = styled.div`
  width: auto;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  margin: auto;
  height: 150vh;

  
`

const App = () => {

  const [theme, setTheme] = useState<DefaultTheme>(DarkTheme)
  const changeTheme = () => {
    setTheme(theme == DarkTheme ? LightTheme : DarkTheme)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar themeChanger={changeTheme} />
          <AppWrapper>
            <Hero />
            <ContentCard>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </ContentCard>

          </AppWrapper>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
