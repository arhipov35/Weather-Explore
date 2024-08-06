import React, { useEffect, useRef } from 'react';
import './WaveAnimation.css';

const WaveAnimation = ({ isPlaying }) => {
    const waveRef1 = useRef(null);
    const waveRef2 = useRef(null);
    const waveRef3 = useRef(null);

    useEffect(() => {
        const waves = [waveRef1.current, waveRef2.current, waveRef3.current];
        const colors = ['rgba(0, 0, 0, 0.05)', 'black', 'rgba(0, 0, 0, 0.10)']; // Red, Steel Blue, Lime Green
        waves.forEach((wavesh, index) => {
            const wavePath = wavesh.querySelector('.wave-path');
            if (isPlaying) {
                wavePath.setAttribute('d', 'M0 3.5C1.74648 3.5 2.25352 0.5 4 0.5C5.74648 0.5 6.25352 3.5 8 3.5C9.74648 3.5 10.2535 0.5 12 0.5C13.7465 0.5 14.2535 3.5 16 3.5C17.7465 3.5 18.2535 0.5 20 0.5C21.7465 0.5 22.2535 3.5 24 3.5C25.7465 3.5 26.2535 0.5 28 0.5C29.7465 0.5 30.2535 3.5 32 3.5C33.7465 3.5 34.2535 0.5 36 0.5C37.7465 0.5 38.2535 3.5 40 3.5C41.7465 3.5 42.2535 0.5 44 0.5C45.7465 0.5 46.2535 3.5 48 3.5');
                wavePath.style.stroke = colors[index];
            } else {
                wavePath.setAttribute('d', 'M0 2C0.873239 2 1.12676 2 2 2C2.87324 2 3.12676 2 4 2C4.87324 2 5.12676 2 6 2C6.87324 2 7.12676 2 8 2C8.87324 2 9.12676 2 10 2C10.8732 2 11.1268 2 12 2C12.8732 2 13.1268 2 14 2C14.8732 2 15.1268 2 16 2C16.8732 2 17.1268 2 18 2C18.8732 2 19.1268 2 20 2C20.8732 2 21.1268 2 22 2C22.8732 2 23.1268 2 24 2');
                wavePath.style.stroke = colors[index];
            }
        });
    }, [isPlaying]);

    return (
        <div className={`wave-container ${isPlaying ? 'playing' : 'paused'}`}>
            <div className="wave-second">
                <WaveSVG ref={waveRef1} />
                <WaveSVG ref={waveRef2} />
                <WaveSVG ref={waveRef3} />
            </div>
        </div>
    );
};

const WaveSVG = React.forwardRef((props, ref) => (
    <svg ref={ref} className="wave" xmlns="http://www.w3.org/2000/svg" width="48" height="5" viewBox="0 0 48 5" fill="none">
        <path className="wave-path" d="M0 4C1.74648 4 2.25352 1 4 1C5.74648 1 6.25352 4 8 4C9.74648 4 10.2535 1 12 1C13.7465 1 14.2535 4 16 4C17.7465 4 18.2535 1 20 1C21.7465 1 22.2535 4 24 4C25.7465 4 26.2535 1 28 1C29.7465 1 30.2535 4 32 4C33.7465 4 34.2535 1 36 1C37.7465 1 38.2535 4 40 4C41.7465 4 42.2535 1 44 1C45.7465 1 46.2535 4 48 4" stroke="black" />
    </svg>
));

export default WaveAnimation;
