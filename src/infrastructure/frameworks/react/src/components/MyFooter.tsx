import React from "react";

const MyFooter = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4">
        <div className="space-y-4">
          <h1 className="font-bold text-xl mb-4 text-black block">Motos</h1>
          <div className="space-y-2 hidden tablet:block">
            <p className="hover:text-gray-400 cursor-pointer">Adventure</p>
            <p className="hover:text-gray-400 cursor-pointer">Classic</p>
            <p className="hover:text-gray-400 cursor-pointer">Roadsters</p>
            <p className="hover:text-gray-400 cursor-pointer">Rocket-3</p>
            <p className="hover:text-gray-400 cursor-pointer">Sport</p>
            <p className="hover:text-gray-400 cursor-pointer">Press reviews</p>
            <p className="hover:text-gray-400 cursor-pointer">Offres</p>
            <p className="hover:text-gray-400 cursor-pointer">
              Triumph occasions
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-bold text-xl mb-4">Commencer</h1>
          <div className="space-y-2 hidden tablet:block">
            <p className="hover:text-gray-400 cursor-pointer">
              RÉSERVER UN ESSAI
            </p>
            <p className="hover:text-gray-400 cursor-pointer">Configurateur</p>
            <p className="hover:text-gray-400 cursor-pointer">
              CATALOGUE PIÈCES MX
            </p>
            <p className="hover:text-gray-400 cursor-pointer">
              TROUVER UN CONCESSIONNAIRE
            </p>
            <p className="hover:text-gray-400 cursor-pointer">
              ME TENIR INFORMÉ
            </p>
            <p className="hover:text-gray-400 cursor-pointer">Total care</p>
            <p className="hover:text-gray-400 cursor-pointer">
              Prendre un rendez-vous atelier
            </p>
            <p className="hover:text-gray-400 cursor-pointer">Votre Triumph</p>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-bold text-xl mb-4">For the ride</h1>
          <div className="space-y-2 hidden tablet:block">
            <p className="hover:text-gray-400 cursor-pointer">Brand</p>
            <p className="hover:text-gray-400 cursor-pointer">Racing</p>
            <p className="hover:text-gray-400 cursor-pointer">
              Actualités TRIUMPH
            </p>
            <p className="hover:text-gray-400 cursor-pointer">
              Factory visitor experience
            </p>
            <p className="hover:text-gray-400 cursor-pointer">
              Triumph adventure experience
            </p>
            <p className="hover:text-gray-400 cursor-pointer">Carrière</p>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-bold text-xl mb-4">Vêtements</h1>
          <div className="space-y-2 hidden tablet:block">
            <p className="hover:text-gray-400 cursor-pointer">Shop</p>
            <p className="hover:text-gray-400 cursor-pointer">
              Collection Heritage
            </p>
            <p className="hover:text-gray-400 cursor-pointer">
              Vêtements de moto
            </p>
            <p className="hover:text-gray-400 cursor-pointer">Livraison</p>
            <p className="hover:text-gray-400 cursor-pointer">Retour</p>
            <p className="hover:text-gray-400 cursor-pointer">
              NOS CONDITIONS GENERALES
            </p>
            <p className="hover:text-gray-400 cursor-pointer">FAQs</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;
