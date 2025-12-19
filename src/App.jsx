import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}[];'<>,.?/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-6 text-white">

        <h1 className="text-2xl font-bold text-center mb-6 text-orange-400">
          🔐 Password Generator
        </h1>

        {/* Password box */}
        <div className="flex rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full px-4 py-2 text-black outline-none"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClip}
            className="bg-blue-600 hover:bg-blue-700 px-4 font-semibold"
          >
            Copy
          </button>
        </div>

        {/* Length */}
        <div className="mb-4">
          <label className="flex justify-between text-sm mb-1">
            <span>Password Length</span>
            <span className="text-orange-400 font-semibold">{length}</span>
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-full cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        {/* Options */}
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            Numbers
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            Special Characters
          </label>
        </div>

      </div>
    </div>
  );
}

export default App;


// 5:12