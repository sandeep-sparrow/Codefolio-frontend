import React, {useEffect, useState} from 'react';
import './style.css';
import {Link, useNavigate} from "react-router-dom";
import {login} from "../../util/api/authenticateapi.tsx";
import Loader from "../../common/Components/Loader/Loader.tsx";

const Login: React.FC = () => {
    const [showFields, setShowFields] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'true') {
            navigate('/dashboard');
        }
        else {
            setLoading(false);
        }
    }, [navigate]);

    const handleLogin = async () => {
        const loginRequest = await login(email, password);
        if (loginRequest) {
            localStorage.setItem('loggedIn', 'true');
            navigate('/dashboard');
        }
    }

    const redirectUri = "http://localhost:5173/dashboard";

    if (loading){
        return (
            <Loader />
        )
    }

    return (
        <div className="login-card">
            <h2 className="login-header"><span>Codefolio</span></h2>
            <p className="login-text">Log in to your account</p>
            {showFields ? (
                <>
                    <button
                        className="back-button"
                        onClick={() => setShowFields(false)}
                    >
                        Back
                    </button>
                    <input
                        type="email"
                        className="form-field"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-field"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={`login-button ${email.length > 3 && password.length > 3 ? 'active' : ''}`} onClick={handleLogin}>Log In</button>
                </>
            ) : (
                <>
                    <div className={'button-container'}>
                        <button className="login-button github" onClick={() => {
                            window.location.href = `http://localhost:8080/oauth/authorize/github?redirect_uri=${redirectUri}`;
                        }}>Continue with GitHub<img className={'github-icon'} src={'src/assets/github-logo.png'} alt={'github icon'}/></button>
                        <button
                            className="login-button email"
                            onClick={() => setShowFields(true)}
                        >
                            Continue with Email and Password
                        </button>
                    </div>
                    <Link to={'/register'}>
                        <p className="login-link">Create your account</p>
                    </Link>
                </>
            )}
        </div>
    )
}

export default Login;