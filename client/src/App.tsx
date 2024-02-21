import { useEffect, useState, useRef } from "react";

function App() {

  const [ data, setData ] = useState(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     const resp = await fetch('http://localhost:3000/users/', { 
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ name: 'Andres', email: 'andresa@email.com'})
  //     });
  //     if(resp.ok){
  //       const result = await resp.json();
  //       setData(result);
  //     }

  //     setData();
  //   }

  //   getData();
  // }, []);

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [ gData, setGdata ] = useState(null);

  const getGraphql = async () => {
    const resp = await fetch('http://localhost:4000/graphql', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: `query { users { name } }` })
    });
    if(resp.ok){
      const result = await resp.json();
      console.log('GDATA ', result)
      setGdata(result);
    } else {
      setGData(null);
    }
  }

 
  const getData = async () => {
    const resp = await fetch('http://localhost:3000/users/', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: nameRef.current.value, email: emailRef.current.value})
    });
    if(resp.ok){
      const result = await resp.json();
      setData(result);
    } else {
      setData(null);
    }
  }

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
    getGraphql();
  }


  return (
    <>{ !data ?
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px'}}>
        Name: <input id='name' type='text' ref={nameRef} />
        Email: <input id='email' type='text' ref={emailRef} />
        <button type='submit' onClick={handleClick}>Enviar</button>
      </div>
      : 
      <div>
        <div>Id: {data.id}</div>
        <div>Name: {data.name}</div>
        <div>Email: {data.email}</div>
        <div>GData: { gData.data.users[0].name }</div>
      </div>
      }
    </>
  )
}

export default App
