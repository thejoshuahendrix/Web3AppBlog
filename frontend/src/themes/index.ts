import { DefaultTheme } from "styled-components"
import darkBackground from '../assets/background.jpg'
import lightBackground from '../assets/background2.jpg'

export const DarkTheme: DefaultTheme = {
  colors: {
    text: '#6a18d6',
    textSecondary: "#1b8af2",
    background: '#181b1f',
    backdrop: '#212c3b',
    ternary: '#444444'
  },
  card: {
    borderRadius: '15px',
    boxShadow: '10px 10px 10px 10px rgba(0,0,0,.4)',
    gradient: 'linear-gradient(151deg, rgba(0,100,100,1) 2%, rgba(0,165,254,1) 37%, rgba(120,1,245,1) 87%)'
  },
  button: {
    background: '#D3D3D3',
    text: '#121212'
  },
  background: darkBackground,
  heading: '#f0f0f0',
  mobile: '1000px'
}

export const LightTheme: DefaultTheme = {
  colors: {
    text: '#222222',
    textSecondary: '#CE2D4F',
    background: "#E5EBEA",
    backdrop: '#F3F3F3',
    ternary: '#dddddd'
  },
  card: {
    borderRadius: '10px',
    boxShadow: '5px 10px 10px rgba(0,0,0,0.2), 5px 12px 12px rgba(0,0,0,0.2)',
    gradient: 'linear-gradient(151deg, rgba(224,224,224,1) 5%, rgba(0,165,254,0.8037383177570093) 40%, rgba(125,2,255,1) 87%)'

  },
  button: {
    background: '#D3D3D3',
    text: '#121212'
  },
  background: lightBackground,
  heading: '#050505',
  mobile: '1000px'
}