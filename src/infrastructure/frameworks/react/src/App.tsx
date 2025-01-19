import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/page/Home";
import Piece from "./components/page/Piece"
import Footer from "./components/Footer";
import Login from "./components/page/Login";
import Register from "./components/page/Register";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header className="w-full px-4 py-3 shadow-md" />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pieces" element={<Piece />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Layout>
    
    
    </BrowserRouter>
  );
}

export default App; 