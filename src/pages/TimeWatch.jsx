import { useRef } from "react";
import Button from "../components/Buttons/Button";
import { useState } from "react";
import { useEffect } from "react";
import "./Timewatch.css";

const TimeWatch = () => {
  // Skapa ref för intervallen, så vi kan referera till och kontrollera intervallet.
  const intervalRef = useRef(null);
  // UseState för varje sekund, minut och timme.
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  // State för att hantera om timern är igång eller pausad.
  const [isRunning, setIsRunning] = useState(false);
  // State för att hantera start och stopp knapp.
  const [isStarted, setIsStarted] = useState(false);

  /* UseEffect som startar intervallet om isRunning är true, och stoppar intervallet om det är false.
  Använder intervalRef för att hålla referens till intervallet. */
  useEffect(() => {
    isRunning
      ? (intervalRef.current = setInterval(() => {
          setSeconds((t) => t + 1);
        }, 1000))
      : // Stoppar intervallet om isRunning inte är true.
        clearInterval(intervalRef.current);
    // Rensar intervallet när komponenten tas bort från DOM
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
  /* UseEffect som uppdaterar minuter och timmar när sekunder eller minuter når 60.
  Den körs varje gång seconds eller minutes ändras.*/
  useEffect(() => {
    if (seconds === 60) {
      setMinutes((m) => m + 1);
      setSeconds(0);
    } else if (minutes === 60) {
      setHours((h) => h + 1);
      setMinutes(0);
    }
  }, [seconds, minutes]);

  /* Funktion som körs när man klickar på "Stop"-knappen.
  Stoppar timern och återställer alla värden till 0. */
  const handleStop = () => {
    setIsRunning(false);
    setIsStarted(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };
  /* Funktion som körs när man klickar på "Start"-knappen.
  Kollar om timern redan är igång, och om inte, startar den. */
  const handleStart = () => {
    if (!isRunning) {
      togglePlayPause();
      setIsRunning(true);
    }
  };
  // Funktion för att kunna pausa och ändra knappen till start.
  const handlePause = () => {
    setIsRunning(false);
    setIsStarted(false);
  };
  // timePad för att lägga till en nolla om siffrran är mindre än 10, så det alltid är 2 sifforr.
  const timePad = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };
  // För att toggla mellan true och false för att skifta mellan start och paus knapp.
  const togglePlayPause = () => {
    setIsStarted(!isStarted);
  };

  return (
    <main className="main-container">
      <h3 className="timer">{`${timePad(hours)}:${timePad(minutes)}:${timePad(
        seconds
      )}`}</h3>
      <section className="button-container">
        {!isStarted ? (
          <Button
            name={"Start"}
            styleName={"Start"}
            onClick={() => handleStart()}
          />
        ) : (
          <Button
            name={"Pause"}
            styleName={"Pause"}
            onClick={() => handlePause()}
          />
        )}

        <Button name={"Stop"} styleName={"Stop"} onClick={() => handleStop()} />
      </section>
    </main>
  );
};
export default TimeWatch;
