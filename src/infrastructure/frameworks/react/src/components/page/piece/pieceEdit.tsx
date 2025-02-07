

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Piece {
    id: string;
    name: string;
    type: string;
    cost: number;
    quantity: number;
    alertLimit: number;
}

function PieceEdit() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [piece, setPiece] = useState<Piece>({
        id: '',
        name: '',
        type: '',
        cost: 0,
        quantity: 0,
        alertLimit: 0
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPiece = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                if (!accessToken) {
                    navigate('/login');
                    return;
                }

                const response = await fetch(`http://localhost:5000/pieces/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }

                const data = await response.json();
                setPiece(data);
            } catch (error) {
                console.error('Erreur:', error);
                setError('Erreur lors du chargement de la pièce');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPiece();
    }, [id, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPiece(prev => ({
            ...prev,
            [name]: name === 'cost' || name === 'quantity' || name === 'alertLimit' 
                ? Number(value) 
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const accessToken = localStorage.getItem('token');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            const response = await fetch(`http://localhost:5000/pieces/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(piece)
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            if (response.ok) {
                navigate('/pieces/staff');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erreur lors de la modification de la pièce');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur lors de la modification de la pièce');
        }
    };

    if (isLoading) {
        return <div className="text-center py-4">Chargement...</div>;
    }

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                    <Button 
                        variant="default" 
                        onClick={() => navigate('/pieces')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Retour
                    </Button>
                    <h1 className="text-2xl font-bold">Modifier une Pièce</h1>
                </div>

                {error && (
                    <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nom de la pièce
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={piece.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                            Type de pièce
                        </label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={piece.type}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-2">
                            Prix (€)
                        </label>
                        <input
                            type="number"
                            id="cost"
                            name="cost"
                            value={piece.cost}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                            Quantité en stock
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={piece.quantity}
                            onChange={handleInputChange}
                            min="0"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="alertLimit" className="block text-sm font-medium text-gray-700 mb-2">
                            Limite d'alerte (stock minimum)
                        </label>
                        <input
                            type="number"
                            id="alertLimit"
                            name="alertLimit"
                            value={piece.alertLimit}
                            onChange={handleInputChange}
                            min="0"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button 
                            type="submit" 
                            className="flex items-center gap-2"
                        >
                            <Save size={20} />
                            Enregistrer les modifications
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PieceEdit;