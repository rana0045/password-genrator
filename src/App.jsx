import { useState, useCallback, useEffect, useRef } from 'react'
import 'tailwindcss/tailwind.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(true)
  const [password, setPassword] = useState("")
  const passref = useRef(null)
  const passwordGenrator = useCallback(() => {

    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllow) str += "0123456789"
    if (charAllow) str += "!@#$%^&*-_+= [] {}~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
      console.log(pass);

    }
    setPassword(pass)
  }, [length, numberAllow, charAllow, password, setPassword])
  useEffect(() => {

    passwordGenrator()

  }, [length, charAllow, setPassword])

  const passwordCopy = useCallback(() => {
    passref.current?.select()
    window.navigator.clipboard.writeText(password)

  }, [password])


  return (
    <>

      <div
        className='w-full max-w-md mx-auto shadow-sm 
        rounded-lg py-3 px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-center text-white font-bold my-3'>Password Genrator</h1>
        <div className=" flex shadow
          rounded-lg overflow-hidden mb-4">
          <input
            type='text'
            value={password}
            className=' outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passref}
          />
          <button onClick={passwordCopy} className='hover:bg-blue-600 bg-blue-400 text-white outline-none px-3 py-3 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className=' cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}

            />
            <labwl>length:{length}</labwl>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllow}
              id='numberInput'
              onChange={() => {
                setCharAllow((per) => !per)
              }}
              className=''
            />
            <label>character</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllow}
              id='numberInput'
              onChange={() => {
                setNumberAllow((per) => !per)
              }}
              className=''
            />
            <label>number</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
