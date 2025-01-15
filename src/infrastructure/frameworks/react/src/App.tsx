import MyHeader from "./components/MyHeader";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MyFooter from "./components/MyFooter";
import MyHomePage from "./components/MyHomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <MyHeader className="w-full px-4 py-3 shadow-md" />
          <MyHomePage />
          <MyFooter />
        </div>
        <h1 className="text-red-500"> test </h1>
      </BrowserRouter>
    </>
  );
}

export default App;
