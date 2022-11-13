import axios from 'axios';
import React, { Component, useEffect, useRef, useState, setStatus, useCallback } from 'react';
import './App.css';
import { MainPage } from './component';

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState(null);
  const ws = useRef();

  useEffect(() => {
    if (!isPaused) {
      ws.current = new WebSocket("ws://78.140.241.21:8300/ws/donations/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5ODE5MTY4LCJqdGkiOiIxYzNlYzg5MDAyODM0NDVmOTk4MTgwMmIyODViZTk3ZiIsInVzZXJfaWQiOjF9.yVXnp1clGX9wTQuC0b6P1IrXULKa6uBte4Z6LJHYDt4"); // создаем ws соединение
      ws.current.onopen = () => setStatus("Соединение открыто");  // callback на ивент открытия соединения
      ws.current.onclose = () => setStatus("Соединение закрыто"); // callback на ивент закрытия соединения

      gettingData();
    }

    return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
  }, [ws, isPaused]);

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
      if (isPaused) return;
      const message = JSON.parse(e.data);
      setData(message);
    };
  }, [isPaused]);

  return (
    <div className="flex flex-col items-center bg-transparent">
      <img src="./imgs/qr-code.svg" className='w-36 h-36' />
      {!!data &&
        <div className="flex flex-col items-center border-solid border-red-400 bg-transparent">
            <div className="w-2/5">
                <h1 className="text-black text-xl font-bold">{data?.author_name}</h1>
                <p className="text-black text-sm">{data?.message}</p>
            </div>

            <div className="flex text-orange-400 text-3xl font-bold">
                <h3> {data?.amount}</h3>
                <p className='ml-2'> {data?.currency}</p>
            </div>
        </div>
      }
    </div>
  )
}


export default App;
