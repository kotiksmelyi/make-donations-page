import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const ws = useRef();

  useEffect(() => {
      ws.current = new WebSocket("ws://78.140.241.21:8300/ws/donations/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5ODE5MTY4LCJqdGkiOiIxYzNlYzg5MDAyODM0NDVmOTk4MTgwMmIyODViZTk3ZiIsInVzZXJfaWQiOjF9.yVXnp1clGX9wTQuC0b6P1IrXULKa6uBte4Z6LJHYDt4"); 
      gettingData();
  }, [ws]);

  const gettingData = useCallback(() => {
    ws.current.onmessage = e => {   
      const message = JSON.parse(e.data);
      setData(message);
      setTimeout(()=> {
        setData(null)
      }, 5000)
    };
  }, []);

  return (
    <div className="flex flex-col items-center bg-transparent">
      <img src="./imgs/qr-code.svg" className='w-36 h-36' />
      {!!data &&
        <div className="flex flex-col items-center border-solid border-red-400 bg-transparent">
          <div className="w-2/5">
            <h1 className="text-orange-400 text-2xl font-bold text-center">{data?.author_name}</h1>
            <p className="text-black text-center text-xl">{data?.message}</p>
          </div>

          <div className="flex text-orange-400 text-4xl font-bold">
            <h3> {data?.amount}</h3>
            <p className='ml-2'> {data?.currency}</p>
          </div>
        </div>
      }
    </div>
  )
}


export default App;
