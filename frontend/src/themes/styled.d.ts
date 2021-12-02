import "styled-components";



declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            text: string,
            textSecondary: string,
            background: string,
            backdrop: string,
            ternary: string
        },
        card: {
            borderRadius: string,
            boxShadow: string,
            gradient: string
        },
        button: {
            text: string,
            background: string
        },
        background: string,
        heading: string,
        mobile:string
    }
}