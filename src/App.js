import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div className="container">
      <h1 className="advice-text">"{advice}"</h1>
      <button onClick={getAdvice} className="advice-btn">
        get another advice
      </button>
      <Message count={count - 1} />
    </div>
  );
}

function Message(props) {
  return (
    <p className="num-ad">
      You have read <strong>{props.count}</strong> peices of advice!
    </p>
  );
}
