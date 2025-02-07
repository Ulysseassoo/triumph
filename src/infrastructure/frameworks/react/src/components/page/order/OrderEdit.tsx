import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Piece {
    id: string;
    name: string;
    type: string;
    cost: number;
    quantity: number;
}

interface Order {
    id: string;
    pieces: Record<string, number>;
    orderDate: string;
    deliveryDate: string;
    status: string;
    totalAmount: number;
    previousQuantity: Record<string, number>;
}

function OrderEdit() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order>({
        id: '',
        pieces: {},
        orderDate: '',
        deliveryDate: '',
        status: '',
        totalAmount: 0,
        previousQuantity: {}
    });
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                if (!accessToken) {
                    navigate('/login');
                    return;
                }

                
                const orderResponse = await fetch(`http://localhost:5000/orders/${id}`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });

                
                const piecesResponse = await fetch('http://localhost:5000/pieces', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });

                if (orderResponse.status === 401 || piecesResponse.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }

                const orderData = await orderResponse.json();
                const piecesData = await piecesResponse.json();

                setOrder(orderData);
                setPieces(piecesData);
            } catch (error) {
                console.error('Erreur:', error);
                setError('Erreur lors du chargement des données');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: name === 'totalAmount' ? Number(value) : value
        }));
    };

    const addPieceToOrder = () => {
        setOrder(prev => ({
            ...prev,
            pieces: { ...prev.pieces, '': 0 }
        }));
    };

    const updateOrderPiece = (oldPieceId: string, newPieceId: string, quantity: number) => {
        const updatedPieces = { ...order.pieces };
        delete updatedPieces[oldPieceId];
        updatedPieces[newPieceId] = quantity;

        setOrder(prev => ({
            ...prev,
            pieces: updatedPieces
        }));
    };

    const removePieceFromOrder = (pieceId: string) => {
        const updatedPieces = { ...order.pieces };
        delete updatedPieces[pieceId];

        setOrder(prev => ({
            ...prev,
            pieces: updatedPieces
        }));
    };

    const calculateTotalAmount = () => {
        return Object.entries(order.pieces).reduce((total, [pieceId, quantity]) => {
            const piece = pieces.find(p => p.id === pieceId);
            return total + (piece ? piece.cost * quantity : 0);
        }, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        
        const invalidPieces = Object.entries(order.pieces).some(([pieceId]) => !pieceId);
        if (invalidPieces) {
            setError('Veuillez sélectionner des pièces valides');
            return;
        }

        try {
            const accessToken = localStorage.getItem('token');
            if (!accessToken) {
                navigate('/login');
                return;
            }

      
            const updatedOrder = {
                ...order,
                totalAmount: calculateTotalAmount()
            };

            const response = await fetch(`http://localhost:5000/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(updatedOrder)
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            if (response.ok) {
                navigate('/orders/staff');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erreur lors de la modification de la commande');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur lors de la modification de la commande');
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
                        onClick={() => navigate('/orders/staff')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Retour
                    </Button>
                    <h1 className="text-2xl font-bold">Modifier une Commande</h1>
                </div>

                {error && (
                    <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pièces
                        </label>
                        {Object.entries(order.pieces).map(([pieceId, quantity]) => (
                            <div key={pieceId} className="flex items-center gap-2 mb-2">
                                <select
                                    value={pieceId}
                                    onChange={(e) => updateOrderPiece(pieceId, e.target.value, quantity)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Sélectionner une pièce</option>
                                    {pieces.map((piece) => (
                                        <option key={piece.id} value={piece.id}>
                                            {piece.name} - {piece.type} ({piece.cost}€)
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => updateOrderPiece(pieceId, pieceId, Number(e.target.value))}
                                    placeholder="Quantité"
                                    min="1"
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Button
                                    type="button"
                                    variant="default"
                                    size="sm"
                                    onClick={() => removePieceFromOrder(pieceId)}
                                >
                                    <Trash2 size={16} className="text-red-500" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addPieceToOrder}
                            className="flex items-center gap-2 mt-2"
                        >
                            <Plus size={16} />
                            Ajouter une pièce
                        </Button>
                    </div>

                    <div>
                        <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Date de Commande
                        </label>
                        <input
                            type="date"
                            id="orderDate"
                            name="orderDate"
                            value={order.orderDate}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Date de Livraison
                        </label>
                        <input
                            type="date"
                            id="deliveryDate"
                            name="deliveryDate"
                            value={order.deliveryDate}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                            Statut
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={order.status}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Sélectionner un statut</option>
                            <option value="en_attente">En Attente</option>
                            <option value="en_cours">En Cours</option>
                            <option value="livree">Livrée</option>
                            <option value="annulee">Annulée</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Montant Total
                        </label>
                        <input
                            type="number"
                            readOnly
                            value={calculateTotalAmount().toFixed(2)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
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

export default OrderEdit;




