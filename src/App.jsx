import notes from "./notes.json"
import './App.css'

function PianoKey({ note, type, frequency}) {
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

  return (
      <div 
          className={`key ${type}`}
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
          <PianoKey note={n.note} type={n.type} frequency={n.frequency}></PianoKey>
      ))
      }
    </div>
    </>
  )
}

export default App
