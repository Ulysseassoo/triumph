import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHeader from "./components/MyHeader";
import MyHomePage from "./components/MyHomePage";
import PagePiece from "./components/PagePiece"
import MyFooter from "./components/MyFooter";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MyHeader className="w-full px-4 py-3 shadow-md" />
      <main className="flex-grow">{children}</main>
      <MyFooter />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MyHomePage />} />
          <Route path="/pieces" element={<PagePiece />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    
    
    </BrowserRouter>
  );
}

export default App; 