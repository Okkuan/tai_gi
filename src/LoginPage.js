import styled from 'styled-components'
import Header from './components/Header';
import { useState } from 'react'

const Container = styled.div`
width:100%
`
const LoginContainer = styled.form`
margin: auto;
margin-top: 2rem;
width: 10rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
button {
    width: 50%;
    margin-top: 1rem;
}
`
function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const url = ""

    const handleLogin = (e) => {
        e.preventDefault()
        const state = { "username": username, "password": password }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(state)
        })
            .then(response => {
                //記錄登入狀態
                localStorage.setItem("isLogin", response.json())
                return response.json();
            }
            )
            .then(json => console.log(json));
    }

    return (
        <Container>
            <Header />
            <LoginContainer >
                <div>
                    <label for="username">username:</label >
                    <input name="username" type="text" onChange={e => setUsername(e.target.value)} value={username}></input>
                </div>
                <div>
                    <label for="password">password:</label >
                    <input name="password" type="password" onChange={e => setPassword(e.target.value)} value={password}></input>
                </div>
                <button onClick={handleLogin}>登入</button>
            </LoginContainer>
        </Container>
    );
}

export default LoginPage;
