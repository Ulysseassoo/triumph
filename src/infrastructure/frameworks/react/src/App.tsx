import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/page/Home";
import PieceUser from "./components/page/PieceUser"
import Footer from "./components/Footer";
import Login from "./components/page/Login";
import Register from "./components/page/Register";
import CreatePiece from "./components/page/CreatePiece";
import PieceStaff from "./components/page/PieceStaff";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header className="w-full px-4 py-3 shadow-md mt-0" />
      <main className="mt-36 flex-grow">{children}</main>
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
          <Route path="/pieces/user" element={<PieceUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/create/piece" element={<CreatePiece />} />
          <Route path="/pieces/staff" element={<PieceStaff />} />
        </Routes>
      </Layout>
    
    
    </BrowserRouter>
  );
}

export default App; 