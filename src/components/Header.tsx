import React from "react";
import logo from '../assets/logo.svg'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const [city, setCity] = useState<string>('');
    const navigate = useNavigate()

    const search = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if ((event.key === 'Enter' || event.keyCode === 13) && city !== '') {
            navigate(`/city/${city}`);
            setCity('');
        }
    };

    return (
        <header className='header'>
            <div className="header__container">
                <div className="header__logo"><img src={logo} alt="logo"/> Weather</div>
                <div className="header__search">
                    <input
                        type="text"
                        placeholder='Search'
                        value={city}
                        onKeyUp={search}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCity(event.target.value)}
                    />
                </div>
            </div>
        </header>
    );
};
