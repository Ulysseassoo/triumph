import MyHeader from './components/MyHeader'
import './App.css'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <MyHeader className="w-full px-4 py-3 shadow-md" />
        </div>
        <h1 className='text-red-500'> test </h1>
      </BrowserRouter>
    </>
  )
}

export default App
