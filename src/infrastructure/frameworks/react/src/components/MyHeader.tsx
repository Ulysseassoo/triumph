import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";

interface HeaderProps {
  className?: string;
}

function MyHeader({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`${className} bg-black text-white`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="w-12 tablet:w-16">
            <img src={logo} alt="Triumph Logo" className="w-full h-auto" />
          </div>
          <button
            className="tablet:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-16 6h16"
              />
            </svg>
          </button>
          <div className="hidden tablet:flex tablet:items-center laptop:space-x-6">
            <Link to="#" className="text-white hover:text-gray-400">
              Moto
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              ACCESSOIRES
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              Vêtements
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              Propriétaires
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              LA MARQUE
            </Link>
          </div>
          <div className="hidden tablet:flex tablet:items-center laptop:space-x-6 desktop:space-x-3">
            <Link to="#" className="text-white hover:text-gray-400">
              Propriétaires
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              Concessionnaire
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              Configurateur
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              Offres
            </Link>
            <Link
              to="#"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Demande d'essai
            </Link>
          </div>
        </div>
        <div
          className={`${isMenuOpen ? "block" : "hidden"} tablet:hidden mt-4`}
        >
          <div className="flex flex-col space-y-3 pb-3 border-b">
            <Link to="#" className="text-white hover:text-gray-400">
              Moto
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              ACCESSOIRES
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              Vêtements
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              Propriétaires
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              LA MARQUE
            </Link>
          </div>
          <div className="flex flex-col space-y-3 pt-3">
            <Link to="#" className="text-white hover:text-gray-400">
              Propriétaires
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              Concessionnaire
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              Configurateur
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              Offres
            </Link>
            <Link
              to="#"
              className="bg-red-600 text-white px-4 py-2 rounded text-center hover:bg-red-700"
            >
              Demande d'essai
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
export default MyHeader;
