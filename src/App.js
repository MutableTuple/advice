import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
      <motion.h1
        className="advice-text"
        key={advice} // Ensure animation triggers on text change
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        "{advice}"
      </motion.h1>
      <button onClick={getAdvice} className="advice-btn">
        Get another advice
      </button>
      <Message count={count - 1} />
    </div>
  );
}

function Message(props) {
  return (
    <p className="num-ad">
      You have read <strong>{props.count}</strong> pieces of advice!
    </p>
  );
}
