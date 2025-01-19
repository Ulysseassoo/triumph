import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useState } from 'react';
import Button from './ui/Button';

interface HeaderProps {
  className?: string,
}

function MyHeader({className}: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5001/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Échec de la connexion');
      }
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menuName: string) => {
    if (activeSubmenu === menuName) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(menuName);
      setIsMenuOpen(false);
    }
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  };

  return (
    <>
      <header className={`${className} bg-black text-white fixed w-full top-0 z-50`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between py-4 px-4">
            <div className="w-12 tablet:w-16">
              <img src={logo} alt="Triumph Logo" className="w-full h-auto"/>
            </div>
            <Button
              className="tablet:hidden p-2 z-50"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setActiveSubmenu(null);
              }}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
                </svg>
              )}
            </Button>

            <div className="hidden tablet:flex tablet:items-center laptop:space-x-6">
              <Button onClick={() => toggleSubmenu('moto')} className="text-white hover:text-gray-400">Moto</Button>
              <Button onClick={() => toggleSubmenu('accessoires')} className="text-white hover:text-gray-400">Accessoires</Button>
              <Button onClick={() => toggleSubmenu('vetements')} className="text-white hover:text-gray-400">Vêtements</Button>
              <Button onClick={() => toggleSubmenu('proprietaires')} className="text-white hover:text-gray-400">Propriétaires</Button>
              <Button onClick={() => toggleSubmenu('marque')} className="text-white hover:text-gray-400">LA MARQUE</Button>
            </div>

            <div className="hidden tablet:flex tablet:items-center laptop:space-x-6 desktop:space-x-3">
              <Link to="#" className="text-white hover:text-gray-400">Propriétaires</Link>
              <Link to="#" className="text-white hover:text-gray-400">Concessionnaire</Link>
              <Link to="#" className="text-white hover:text-gray-400">Configurateur</Link>
              <Link to="#" className="text-white hover:text-gray-400">Offres</Link>
              <Link to="#" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Demande d'essai
              </Link>
              <Button 
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 w-full h-screen bg-black transform transition-transform duration-300 ease-in-out z-40 tablet:hidden`}
      >
        <div className="flex flex-col justify-center h-full px-8 pt-20">
          <nav className="space-y-8">
            <div className="flex flex-col space-y-6 text-center text-lg">
              <Button className="text-white hover:text-gray-400" onClick={() => toggleSubmenu('moto')}>Moto</Button>
              <Button className="text-white hover:text-gray-400" onClick={() => toggleSubmenu('accessoires')}>Accessoires</Button>
              <Button className="text-white hover:text-gray-400" onClick={() => toggleSubmenu('vetements')}>Vêtements</Button>
              <Button className="text-white hover:text-gray-400" onClick={() => toggleSubmenu('proprietaires')}>Propriétaires</Button>
              <Button className="text-white hover:text-gray-400" onClick={() => toggleSubmenu('marque')}>LA MARQUE</Button>
            </div>
            <div className="flex flex-col space-y-6 text-center text-lg pt-8 border-t border-gray-800">
              <Link to="#" className="text-white hover:text-gray-400" onClick={closeAll}>Propriétaires</Link>
              <Link to="#" className="text-white hover:text-gray-400" onClick={closeAll}>Concessionnaire</Link>
              <Link to="#" className="text-white hover:text-gray-400" onClick={closeAll}>Configurateur</Link>
              <Link to="#" className="text-white hover:text-gray-400" onClick={closeAll}>Offres</Link>
              <Link to="#" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 inline-block mx-auto" onClick={closeAll}>
                Demande d'essai
              </Link>
              <Button 
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Déconnexion
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {['moto', 'accessoires', 'vetements', 'proprietaires', 'marque'].map((menu) => (
        <div
          key={menu}
          className={`${
            activeSubmenu === menu ? 'translate-y-0' : '-translate-y-full'
          } fixed top-0 left-0 w-full h-screen ${menu === 'accessoires' ? 'bg-white text-black' : 'bg-black text-white'} transform transition-transform duration-300 ease-in-out z-30 pt-20`}
        >
          <div className="container mx-auto px-4 pt-16">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">
                Bienvenue dans {menu.charAt(0).toUpperCase() + menu.slice(1)}
              </h1>
              <Button
                onClick={() => setActiveSubmenu(null)}
                className="hover:text-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MyHeader;