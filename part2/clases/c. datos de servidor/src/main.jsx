import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import axios from 'axios'

// const promise = axios.get('http://localhost:3001/notes')

// promise.then(response => {
//     console.log(response)
//   })

// axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data
// //   console.log(notes)
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <App notes={notes}/>
//   )
// })

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)


ReactDOM.createRoot(document.getElementById('root')).render(<App />)
