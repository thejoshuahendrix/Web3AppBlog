import {  useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import Hero from "./components/layout/Hero";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Blog from "./components/pages/Blog";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import Posts from "./components/pages/Posts";
import { GlobalStyles } from "./global";
import { DarkTheme, LightTheme } from "./themes";
import { useAuth } from "./hooks/useAuth";
import ControllerBlog from "./components/pages/ControllerBlog";

export const ToggleThemeButton = styled.div<{ active: boolean }>`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 1rem;
  opacity: 0;
  text-align: center;
  font-size: 14px;
  height: 120px;
  width: 100px;
  border-radius: ${({ theme }) => theme.card.borderRadius};
  overflow: hidden;
  &:after {
    content: "O";
    position: relative;
    top: 30px;
    color: rgba(0, 0, 0, 0);
    ${({ active }) => (active ? "right:0px;" : "right: calc(70% + 0px);")};
    width: 20px;
    font-size: 20px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.4);
    background-color: ${({ active }) => (active ? "#252525 " : "#e9e9e9")};
    transition: 500ms right;
  }
  &:hover {
    opacity: 1;
    transform: opacity ease 3s;
  }
`;

const ContentCard = styled.div`
  width: 80%;
  box-shadow: ${({ theme }) => theme.card.boxShadow};
  background-color: ${({ theme }) => theme.colors.backdrop};
  justify-content: center;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 20%;
  opacity: 0.7;
  border-radius: ${({ theme }) => theme.card.borderRadius};
  @media (max-width:${({theme})=> theme.mobile}) {
    width: 100%;
    font-size: 10px;
  }
`;
const AppWrapper = styled.div`
  width: auto;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  margin: auto;
`;

const App = () => {
  const [theme, setTheme] = useState<DefaultTheme>(DarkTheme);
  const changeTheme = () => {
    setTheme(theme === DarkTheme ? LightTheme : DarkTheme);
  };

  const { active } = useAuth();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Navbar themeChanger={changeTheme} />

          <AppWrapper>
            <Hero />
            <ContentCard>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog1" element={<Blog />} />
                <Route path="/blog2" element={<ControllerBlog />} />
                <Route path="/posts" element={<Posts isAuth={active} />} />
              </Routes>
            </ContentCard>
          </AppWrapper>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
