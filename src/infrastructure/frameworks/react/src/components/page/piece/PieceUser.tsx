import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../ui/Card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

interface AutoPart {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  reference: string;
}

function PieceUser() {
  const navigate = useNavigate();
  useEffect(() => {

    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
        navigate('/login');
    }
}, [navigate]);
  const autoParts: AutoPart[] = [
    {
      id: 1,
      name: "Plaquettes de frein",
      description: "Plaquettes de frein haute performance pour une meilleure adhérence et une durée de vie prolongée",
      price: 49.99,
      category: "Freinage",
      imageUrl: "/api/placeholder/300/200",
      reference: "PB-2024-001"
    },
    {
      id: 2,
      name: "Filtre à huile",
      description: "Filtre à huile premium pour une meilleure filtration et protection du moteur",
      price: 15.99,
      category: "Filtration",
      imageUrl: "/api/placeholder/300/200",
      reference: "FH-2024-002"
    },
    {
      id: 3,
      name: "Amortisseur avant",
      description: "Amortisseur avant haute qualité pour une meilleure tenue de route",
      price: 89.99,
      category: "Suspension",
      imageUrl: "/api/placeholder/300/200",
      reference: "AM-2024-003"
    }
  ];

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-5 text-center">
        Catalogue des Pièces Automobiles
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
        {autoParts.map((part) => (
          <Card key={part.id}>
            <CardHeader>
              <CardTitle>{part.name}</CardTitle>
              <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm mt-2">
                {part.category}
              </span>
            </CardHeader>
            
            <CardContent>
              <div className="w-full h-48 mb-4 overflow-hidden rounded">
                <img
                  src={part.imageUrl}
                  alt={part.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardDescription>{part.description}</CardDescription>
              <div className="text-sm text-gray-600 mt-2">
                Référence: {part.reference}
              </div>
            </CardContent>
            
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <span className="text-xl font-bold">
                  {part.price.toFixed(2)} €
                </span>
                <Button className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors text-sm '>
                  Ajouter au panier
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PieceUser;