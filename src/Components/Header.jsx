import React, { useState, useEffect } from 'react';
import './Header.css';
import Joyride from 'react-joyride';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useSelector, useDispatch } from "react-redux";
import { setBackgrnd } from '../store/colorSet';
import { changeLang } from '../store/Language';
import YouTubePlayer from './second_components/YouTubePlayer';
import SelectColor from './second_components/SelectColor';
import { useOnboarding } from '../OnboardingContext';
function Header() {
    //Зміна мови
    const language = useSelector((state) => state.specificLanguage.language)
    const selectedBackgrnd = useSelector((state) => state.ui.backgrnd); // Перевірте, чи використовуєте правильний ключ
    const dispatch = useDispatch();
    const { runTour, handleJoyrideCallback, steps } = useOnboarding();
    const handleLanguageChange = (lang) => {
        dispatch(changeLang(lang));
    };
    // Кроки для онбордингу

    return (
        <>
            <Joyride
                steps={steps}
                run={runTour}
                continuous={true}
                showSkipButton={true}
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        zIndex: 10000,
                        arrowColor: '#fff',
                        backgroundColor: '#fff',
                        overlayColor: 'rgba(0, 0, 0, 0.4)',
                        primaryColor: '#6c757d',
                        textColor: '#333',
                        spotlightShadow: '0 0 0 3px rgba(0, 0, 0, 0.5)',
                        beaconSize: 26,
                        beaconColor: 'var(--Black-4, rgba(0, 0, 0, 0.04))',
                        borderRadius: '8px',
                    },
                    button: {
                        borderRadius: '8px', // Додаємо заокруглення до кнопки
                    }
                }}
            />
            <nav className="navbar navbar-expand-lg" style={{ background: selectedBackgrnd, padding: '16px 0 8px 0' }}>
                <div className="container">
                    <div className='select-option'>
                        <SelectColor></SelectColor>
                    </div>
                    <a className="navbar-brand" href="#">Weather Explore</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto d-flex" style={{ gap: '16px' }}>
                            {/* прибрав d-flex */}
                            <li className="align-items-center tune">
                                <YouTubePlayer></YouTubePlayer>
                            </li>
                            <li className='link-feedback'>
                                <a href="https://forms.gle/ZJNZLTFfMFjzg45V9" target="_blank"><img src="/img/feedback.svg" alt="" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
