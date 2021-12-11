import {useEffect,useReducer,useState} from 'react'
import Gun from 'gun'

const gun = Gun({
  peers:["http://localhost:3300/gun"]
})

const initialState={
  messages:[]
}
const reducer=(state,message)=>{
   return {
     messages:[message,...state.messages]
   }
}

function App() {
  const [formState, setFormState] = useState({
    name:'',
    message:''
  })
  const [state, dispatch] = useReducer(reducer, initialState)
  
  useEffect(() => {
     const messages = gun.get('messages')
     messages.map().on((m,key)=>{
       dispatch({
         name:m.name,
         message:m.message,
        //  createdAt:m.createdAt
       })
     })
  }, [])

  const onChange=(field)=>(event)=> {
    setFormState({...formState,[field]:event.target.value})
  }
  const onSubmitMessage=(e)=>{
     e.preventDefault()
     console.log(formState)
     const messages = gun.get('messages')
     messages.set({
      name:formState.name,
      message:formState.message,
      // createdAt: new Date()
     })
     setFormState({name:'',message:''})
  }
  return (
    <form onSubmit={onSubmitMessage} style={{ padding: 30 }}>
    <input
      onChange={onChange('name')}
      placeholder="Name"
      name="name"
      value={formState.name}
    />
    <input
      onChange={onChange('message')}
      placeholder="Message"
      name="message"
      value={formState.message}
    />
    <button type='submit' >Send Message</button>
    {
      state.messages.map(message => (
        <div key={message.createdAt}>
          <h2>{message.message}</h2>
          <h3>From: {message.name}</h3>
          {/* <p>Date: {message.createdAt}</p> */}
        </div>
      ))
    }
  </form>
  );
}

export default App;
