import React, { useEffect } from "react";
import { useState, useCallback, useRef } from "react";

const App = () => {
  const [lenght, setlength] = useState("");
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  //useref hook
  const passwordref = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [lenght, numberallowed, charallowed,]);
  const copypassword = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordgenerator();
  }, [lenght, numberallowed, charallowed, passwordgenerator]);
  
  return (
    <>
      <div className=" w-full max-w-md mx-auto h-[30vh] shadow-md rounded-lg px-4 my-10 text-orange-500 bg-gray-600">
        <h1 className=" text-xl text-center text-white p-5 mt-6">
          Password generator
        </h1>
        <div className=" flex border-2 border-white rounded-md">
          <input
            type="text"
            value={password}
            className="outline-none bg-white w-full py-1 px-3"
            placeholder="password"
            name=""
            id=""
            readOnly
            ref={passwordref}
          
          />
          <button onClick={copypassword} className=" outline-none bg-blue-700 text-white shrink-0 px-3 py-1 rounded-md">
            copy
          </button>
        </div>
        <div className=" flex gap-1.5">
          <div>
            <input
              type="range"
              min={6}
              max={30}
              value={lenght}
              onChange={(e) => setlength(e.target.value)}
              className=" cursor-pointer"
            />
            <label htmlFor="length">length:{lenght}</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberallowed}
              onChange={() => setnumberallowed(!numberallowed)}
              className="cursor-pointer"
            />
            <label htmlFor="number">numbers</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charallowed}
              onChange={() => setcharallowed(!charallowed)}
              className="cursor-pointer"
            />
            <label htmlFor="charInput">characters</label>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default App;
