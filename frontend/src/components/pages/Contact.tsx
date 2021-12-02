import { useState } from 'react'
import styled from 'styled-components'

const Input = styled.input`
    height: 30px;
    width: 50%;
    background-color: ${({theme})=> theme.colors.ternary};
    border: .5px solid #444444;
    border-radius: 10px;
    
`
const TextArea = styled.textarea`
    height: 90px;
    width: 50%;
    background-color: ${({theme})=> theme.colors.ternary};

    border: .5px solid #444444;
    border-radius: 10px;
    
`
const Button = styled.button`
    height: 30px;
    width: 60px;
    background-color: ${({theme})=> theme.button.background};
    border-radius: 4px;
    color: ${({theme})=> theme.button.text};
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 2rem;
    margin: 10% auto 10% auto;
    padding: 20px 0 20px 0;
    width: 80%;
    color: ${({theme})=> theme.colors.textSecondary};
    background-color: ${({theme})=> theme.colors.background};
    border-radius: ${({theme})=> theme.card.borderRadius};
`
const FormWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`


const Contact = () => {
    const [text, setText] = useState('');
    const handleSubmit = () => {
        setText('Email Sent!')
    }
    return (
        <FormWrapper>
            <Form data-testid="contactForm">
                <h2>Contact Me!</h2>
                <label>Name</label>
                <Input data-testid='nameInput' type="text" name="name" />
                <label>Email</label>
                <Input data-testid='emailInput' type="email" name="email" />
                <label>Message</label>
                <TextArea data-testid='messageInput' name="message" />
                <Button data-testid='submitButton' onClick={handleSubmit}>Submit</Button>
                <div>{text}</div>
            </Form>
        </FormWrapper>
    )
}

export default Contact
