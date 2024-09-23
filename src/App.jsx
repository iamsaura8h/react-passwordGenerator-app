import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [len, setLen] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

//   use ref hook
const passwordRef=useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*+<>?/|";

    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }

    setPassword(pass);
  }, [setPassword, len, numAllowed, charAllowed]);

  const copyToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  })

  useEffect(()=>{passwordGenerator()},[len,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passwordRef}
            readOnly
        />
        <button className="bg-orange-600  text-white px-3 py-0.5 shrink-0 outline-none"
        onClick={copyToClipboard} >Copy</button>
        </div >
        <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
                <input type="range" min={6} max={100} value={len} 
                className="cursor-pointer" 
                onChange={(e) => {setLen(e.target.value)}} />
                <label >Length : {len}</label>
                </div>

                <div className="flex items-center gap-x-1" >
                    <input type="checkbox"
                    id="numberInput"
                    defaultChecked={numAllowed} 
                    onChange={() => {setNumAllowed((prev)=> !prev);}}/>
                    <label>Numbers</label>
                </div>

                <div className="flex items-center gap-x-1" >
                    <input type="checkbox"
                    id="symbolInput"
                    defaultChecked={charAllowed} 
                    onChange={() => {setCharAllowed((prev)=> !prev);}}/>
                    <label>Symbols</label>
                </div>
        </div>
        </div>
    </>
  );
}

export default App;
