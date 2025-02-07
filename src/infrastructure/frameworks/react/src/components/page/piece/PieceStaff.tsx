import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Piece {
    id: string;
    name: string;
    type: string;
    cost: number;
    quantity: number;
    alertLimit: number;
}

function PieceStaff() {
    const navigate = useNavigate();
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPieces = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:5000/pieces', {
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
            setPieces(data);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPieces();
    }, [navigate]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette pièce ?')) {
            return;
        }

        try {
            const accessToken = localStorage.getItem('token');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            const response = await fetch(`http://localhost:5000/pieces/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            if (response.ok) {
                setPieces(pieces.filter(piece => piece.id !== id));
            } else {
                throw new Error('Erreur lors de la suppression');
            }
        } catch (error) {
            setError('Erreur lors de la suppression de la pièce');
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Gestion des Pièces Détachées</h1>
                    <Button
                        onClick={() => navigate('/create/piece')}
                        className="flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Ajouter une pièce
                    </Button>
                </div>

                {error && (
                    <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-4">Chargement...</div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nom</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Prix</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Quantité</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Limite d'alerte</th>
                                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {pieces.map((piece) => (
                                        <tr 
                                            key={piece.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    {piece.name}
                                                    {piece.quantity <= piece.alertLimit && (
                                                        <AlertCircle className="text-red-500" size={16} />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{piece.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{piece.cost}€</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{piece.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{piece.alertLimit}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => navigate(`/pieces/edit/${piece.id}`)}
                                                        className="flex items-center gap-1 hover:bg-gray-100"
                                                    >
                                                        <Edit size={14} />
                                                        Modifier
                                                    </Button>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleDelete(piece.id)}
                                                        className="flex items-center gap-1 hover:bg-red-50 hover:text-red-600"
                                                    >
                                                        <Trash2 size={14} />
                                                        Supprimer
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {pieces.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    Aucune pièce détachée n'a été trouvée.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PieceStaff;