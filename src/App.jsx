import notes from "./notes.json"
import './App.css'

import { useEffect, useState } from "react";

function PianoKey({ note, type, frequency, bind_key}) {
  const [isActive, setIsActive] = useState(false)

  function playNote() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

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

    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);

    // Зупиняємо осцилятори через 0.5 секунди
    oscillator1.stop(audioContext.currentTime + 1);
  }

  // Обробник події для клавіатури
  function handleKeyDown(event) {
    if (event.key === bind_key) {
      playNote();
      setIsActive(true);
    }
  }

  function handleKeyUp(event) {
    if (event.key === bind_key) {
      setIsActive(false)
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
          className={`key ${type} ${isActive ? 'active' : ''}`}
          onClick={playNote}
      >
          {note}
      </div>
  );
};

function App() {
  return (
    <>
    <div>
      {notes.map((n) => (
          <PianoKey note={n.note} type={n.type} frequency={n.frequency} bind_key={n.bind_button}></PianoKey>
      ))
      }
    </div>
    </>
  )
}

export default App
