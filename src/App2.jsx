import { useState, useEffect } from 'react';
import './App.css';

function App2() {
    const initialTime = 25 * 60; // 25 minutes in seconds
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);

    const [inputMinutes, setInputMinutes] = useState('');
    const [inputSeconds, setInputSeconds] = useState('');

    useEffect(() => {
        let timer = null;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (!isRunning && timer !== null) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(initialTime);
    };

    const handleSetTimer = () => {
        const totalSeconds = parseInt(inputMinutes || 0) * 60 + parseInt(inputSeconds || 0);

        setIsRunning(false)
        setTimeLeft(totalSeconds);
    }

    return (
        <div className="App">
            <h1>Pomodoro Timer ⏳</h1>
            <div id="input-group">
                <div id='inputboxes'>
                    <input
                        type='number'
                        value={inputMinutes}
                        onChange={(e) => setInputMinutes(e.target.value)}
                        placeholder='Minutes'
                    />
                    <input
                        type='number'
                        value={inputSeconds}
                        onChange={(e) => setInputSeconds(e.target.value)}
                        placeholder='Seconds'
                    />
                </div>

                <div id="setbutton">
                    <button onClick={handleSetTimer}>Set Timer</button>
                </div>
            </div>

            <h2 id="timeleft">{formatTime(timeLeft)}</h2>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '20px' }}>
                <button onClick={handleStartPause}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );

}

export default App2;
