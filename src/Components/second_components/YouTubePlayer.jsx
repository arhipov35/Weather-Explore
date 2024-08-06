import React, { useState, useRef } from 'react';
import WaveAnimation from './WaveAnimation';
import ReactPlayer from 'react-player/youtube';
import './YouTubePlayer.css';

const YouTubePlayer = () => {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);

    const onTogglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const onVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
    };

    return (<>
        <ReactPlayer
            ref={playerRef}
            url="https://youtu.be/jfKfPfyJRdk"
            playing={isPlaying}
            controls={true}
            width="0"
            height="0"
            volume={volume / 100}
        />
        <div className='music-elements'>
            <div className='range'>
                <input
                    className="sound-size"
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={onVolumeChange}
                    style={{ background: `linear-gradient(to right, grey ${volume}%, lightgrey ${volume}%)` }}
                />
            </div>
            <div style={{ display: 'inline-block', cursor: 'pointer' }} onClick={onTogglePlay}>
                <WaveAnimation isPlaying={isPlaying} />
            </div>
        </div>
    </>
    );
};

export default YouTubePlayer;
