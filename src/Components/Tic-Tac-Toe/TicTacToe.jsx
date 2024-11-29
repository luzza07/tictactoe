import React, { useRef, useState } from "react";
import circle_icon from "../../assets/circle.png";
import cross_icon from "../../assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winLine, setWinLine] = useState(null); // Stores the winning line details
  const TitleRef = useRef(null);
  const box_array = Array.from({ length: 9 }, () => useRef(null));

  const toggle = (e, num) => {
    if (lock || e.target.innerHTML !== "") return;
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' class='w-10 h-10 mx-auto transition-transform transform scale-110' />`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' class='w-10 h-10 mx-auto transition-transform transform scale-110' />`;
      data[num] = "o";
    }
    setCount((prev) => prev + 1);
    checkWin();
  };

  const checkWin = () => {
    const winCombos = [
      [0, 1, 2, "top-[16.6%] left-0 w-full"], // Top horizontal
      [3, 4, 5, "top-[50%] left-0 w-full"], // Middle horizontal
      [6, 7, 8, "top-[83.4%] left-0 w-full"], // Bottom horizontal
      [0, 3, 6, "top-0 left-[16.6%] h-full"], // Left vertical
      [1, 4, 7, "top-0 left-[50%] h-full"], // Middle vertical
      [2, 5, 8, "top-0 left-[83.4%] h-full"], // Right vertical
      [0, 4, 8, "top-0 left-0 w-[140%] h-2 rotate-45 origin-top-left"], // Main diagonal
      [2, 4, 6, "top-0 right-0 w-[140%] h-2 -rotate-45 origin-top-right"], // Anti-diagonal
    ];

    winCombos.forEach(([a, b, c, classes]) => {
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a], classes);
      }
    });
  };

  const reset = () => {
    setLock(false);
    setWinLine(null);
    data = ["", "", "", "", "", "", "", "", ""];
    TitleRef.current.innerHTML = "Tic Tac Toe Game in <span>React</span>";
    box_array.forEach((box) => (box.current.innerHTML = ""));
    setCount(0);
  };

  const won = (winner, classes) => {
    setLock(true);
    setWinLine(classes); // Set the winning line classes
    TitleRef.current.innerHTML = `Congratulations: <img src='${
      winner === "x" ? cross_icon : circle_icon
    }' class='w-10 h-10 inline-block' />`;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <h1
        className="text-4xl md:text-6xl font-extrabold text-white mt-8 mb-6 drop-shadow-md animate-pulse"
        ref={TitleRef}
        dangerouslySetInnerHTML={{
          __html: "Tic Tac Toe Game in <span class='text-yellow-300'>React</span>",
        }}
      ></h1>
      <div
        id="board"
        className="relative grid grid-cols-3 gap-4 bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg shadow-2xl border-4 border-gray-200"
      >
        {box_array.map((ref, index) => (
          <div
            key={index}
            id="boxes"
            ref={ref}
            onClick={(e) => toggle(e, index)}
            className="relative w-28 h-28 md:w-32 md:h-32 bg-gradient-to-tr from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 flex items-center justify-center cursor-pointer text-3xl font-bold border-2 border-gray-400 rounded-xl transform hover:scale-105 transition-transform"
          ></div>
        ))}
        {winLine && (
          <div
            className={`absolute bg-yellow-400 h-2 md:h-3 rounded-lg z-20 animate-pulse shadow-lg ${winLine}`}
          ></div>
        )}
      </div>
      <button
        onClick={reset}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 hover:from-pink-500 hover:to-yellow-400 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
