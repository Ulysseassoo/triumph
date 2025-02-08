import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Order {
    id: string;
    pieces: Record<string, number>;
    orderDate: string;
    deliveryDate: string;
    status: string;
    totalAmount: number;
    previousQuantity: Record<string, number>;
}

function OrderStaff() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:5002/orders', {
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
            setOrders(data);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [navigate]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette commande ?')) {
            return;
        }

        try {
            const accessToken = localStorage.getItem('token');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            const response = await fetch(`http://localhost:5002/orders/${id}`, {
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
                setOrders(orders.filter(order => order.id !== id));
            } else {
                throw new Error('Erreur lors de la suppression');
            }
        } catch (error) {
            setError('Erreur lors de la suppression de la commande');
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
                    <Button
                        onClick={() => navigate('/create/order')}
                        className="flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Ajouter une commande
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
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date de Commande</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date de Livraison</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Statut</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Montant Total</th>
                                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">{order.orderDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.deliveryDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.totalAmount}€</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => navigate(`/orders/edit/${order.id}`)}
                                                        className="flex items-center gap-1 hover:bg-gray-100"
                                                    >
                                                        <Edit size={14} />
                                                        Modifier
                                                    </Button>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleDelete(order.id)}
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

                            {orders.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    Aucune commande n'a été trouvée.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderStaff;