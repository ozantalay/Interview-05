import React, { useEffect, useState, useRef } from "react";
import './styles.css'

function App() {
  // KODUNU BURAYA GELECEK
  const [inputValue,setInputValue]=useState('')
  const [text,setText]=useState([])


  const handlesubmit=(e)=>{
    e.preventDefault()
    
  }
  const handlechange=(e)=>{
    setInputValue(e.target.value)
  }
  const handleList=(event)=>{
    if(inputValue){
      setText(prev=>([...prev,inputValue]))
     setInputValue('')
    }
  }
  console.log(text);

  return(
    <div className="App">

      <div className="form">

      <form onSubmit={handlesubmit}>
        <input 
        value={inputValue}
        onChange={handlechange}
        />
        <button onClick={handleList}>ekle</button>
      </form>
      </div>
      <Modal text={text}/>

    </div>
  )
}
function Modal({text}){
  const[expandedIndex,setExpandedIndex]=useState(null)
  const ref=useRef(null)

  const togleExpanded=(index)=>{
    if(expandedIndex===index){  
      setExpandedIndex(null)
    }
    else{
      setExpandedIndex(index)
    }
  }

  const handleClickOutside=(event)=>{
    if(ref.current&&!ref.current.contains(event.target)){
      setExpandedIndex(null)
    }
  }
  useEffect(()=>{
    document.addEventListener('mousedown',handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[])

  return (

    <div className="modal" ref={ref}>
      <ul>
      {text.map((item, index) => (
          <li key={index} onClick={()=>togleExpanded(index)}>
             {expandedIndex === index ? (
              <div   className="expanded-content">
                <span onClick={() => togleExpanded(index)}>
                  Full text: '{item}'
                </span>
              </div>
            ) : expandedIndex === null ? (
              <span onClick={() => togleExpanded(index)}>
                {item.length > 5 ? item.slice(0, 5) + '...' : item}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
