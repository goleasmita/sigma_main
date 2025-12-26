import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Spinner() {
  const [count, setCount] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((pre) => --pre);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  });
  return (
    <div>
      <h4>Spinner {count} </h4>
    </div>
  );
}
