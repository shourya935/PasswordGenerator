import { useState, useCallback, useEffect, useRef } from "react"


function App() {
  const [length,setlength] = useState(8); // In length cursor/ input"Range" :--  onChange={(e) => {setlength(e.target.value)}} 
  const [numbersAllowed, setnumbersAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password,setpassword] = useState("");//pass

  const passwordref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    

    if(numbersAllowed == true){ //initially false but if user tap the check box it becomes true
      str += "0123456789"
    }
    if(charAllowed == true){ //initially false but if user tap the check box it becomes true
      str += "!@#$%^&*{}[]"
    }

    for(let i=1 ; i<= length ; i++){
      let char = Math.floor(Math.random()* str.length + 1) // gives an random index(char) from the str of length wich is set by user through cursor
       pass += str.charAt(char) // let length given by user be 6 then loop will run till 6th index and gives 6 random values and store it in pass
    }

   setpassword(pass); 

  },[length,numbersAllowed,charAllowed, setpassword])

  const copypasswordtoclipboard = useCallback(() => {
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length,numbersAllowed,charAllowed,passwordGenerator]) //calls passwordGenerator without any re renders whenever length, numbersallowed , charallowed are changed by the users

  

  return (
    <>
    <div className="w-full  flex justify-center items-center mb-3">
      <h1 className="text-4xl font-extrabold text-black mr-4  ">PassWord Generator</h1>
      <button className=" mt-2 p-4 h-6 bg-red-600 text-amber-50 rounded-sm hover:bg-gray-600 flex justify-center items-center"
      onClick={passwordGenerator}
      
      >Generate Password</button>
      </div>
    
      <div className="flex-col items-center justify-center border-8 items-center  bg-gray-400 m-auto w-130 h-26" >
        <div className="flex h-10 justify-center m-auto w-120 rounded-b-xl mt-4 " >
          <input className="border-2 h-8 w-100" type="text" value={password} placeholder="password" readOnly ref = {passwordref}></input>
          <button 
          onClick={copypasswordtoclipboard}
           className="hover:bg-violet-600 p-4 bg-blue-800 h-8 flex justify-center items-center">copy</button>
        </div>
        <div className="flex justify-center items-center mt-1/2" >
          <div className=" ">
            <input 
            type="range"
            min={6}
            max={100}
            className="cursor-pointer"
            onChange={(e) => {setlength(e.target.value)}}
             />
             <label className="mr-5">Length:{length}</label>
          </div>
          <div>
            <input
             type="checkbox"
             checked={numbersAllowed}
             id="numberInput"
             onChange={() => {
              setnumbersAllowed((prev) => (!prev))
             }}
             />
             <label className="mr-3">Numbers</label>
          </div>
          <div>
            <input
             type="checkbox"
             checked={charAllowed}
             id="numberInput"
             onChange={() => {
              setcharAllowed((prev) => (!prev))
             }}
             />
             <label>Characters</label>
          </div>
        </div>
        
      </div>

    </>
  )
}

export default App
