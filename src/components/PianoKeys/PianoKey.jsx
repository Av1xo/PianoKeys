import { useEffect, useState } from "react";
import './PianoKeys.css'

function PianoKey({ note, type, frequency, bind_key}) {
    const [isPressed, setIsPressed] = useState(false)

    async function playNote() {
        let audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Створення осциляторів
        const oscillator1 = audioContext.createOscillator();
    
        oscillator1.type = 'sine'; // Основний тон
        oscillator1.frequency.setValueAtTime(frequency * 3.5 , audioContext.currentTime);

        const gainNode = audioContext.createGain();
    
        // Налаштування амплітуди
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);

        oscillator1.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator1.start();

        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

        await new Promise(resolve => {
            oscillator1.stop(audioContext.currentTime + 0.5);
            oscillator1.onended = resolve;
        })
    }

    // Обробник події для клавіатури
    function handleKeyDown(event) {
        if (event.key === bind_key) {
            console.log(event)
            playNote();
            setIsPressed(true);
        }
        console.log(event.key)
    }

    function handleKeyUp(event) {
        if (event.key === bind_key) {
        setIsPressed(false)
        }
    }

    useEffect(() => {
        // Додаємо обробник події при монтуванні компонента
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Видаляємо обробник події при демонтажі компонента
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [bind_key]); 

    return (
        <div 
            className={`key ${type} ${isPressed ? 'active' : ''}`}
            onClick={playNote}
        >
            {bind_key}
        </div>
    );
};

export default PianoKey;