import React, { createContext, useContext, useState, useEffect } from 'react';


const OnboardingContext = createContext();

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider = ({ children }) => {
    const [runTour, setRunTour] = useState(false);

    useEffect(() => {
        const isTourCompleted = localStorage.getItem('tourCompleted');
        if (!isTourCompleted) {
            setRunTour(true);
        }
    }, []);

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        const finishedStatuses = ['finished', 'skipped'];
        if (finishedStatuses.includes(status)) {
            setRunTour(false);
            localStorage.setItem('tourCompleted', 'true');
        }
    };

    const steps = [
        {
            target: '.navbar-brand',
            content: 'Welcome to Weather Explore, the weather map system',
        },
        {
            target: '.select-option',
            content: 'You can choose your background color so that your eyes are comfortable',
        },
        {
            target: '.tune',
            content: 'You can turn on the music, for relax',
        },
        {
            target: '.link-feedback',
            content: 'And also you can leave a review',
        },
        {
            target: '.card-main-content',
            content: `So let's get started, and enter your first city!`,
        },
   
    ];

    return (
        <OnboardingContext.Provider value={{ runTour, handleJoyrideCallback, steps }}>
            {children}
        </OnboardingContext.Provider>
    );
};
