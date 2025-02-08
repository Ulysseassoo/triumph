import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import OrderForm from '../../composant/OrderForm';

function CreateOrder() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            navigate('/login');
        }
    }, [navigate]);

    const handleOrder = async (formData: {
        pieces: { id: string; quantity: number }[];
        orderDate: string;
        deliveryDate: string;
        status: string;
    }) => {
        try {
            setIsLoading(true);
            setError(null);

            const accessToken = localStorage.getItem('token');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:5002/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (response.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/login');
                return;
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Échec de la création de la commande');
            }

            navigate('/orders/staff');
        } catch (error) {
            console.error('Erreur de création:', error);
            setError(error instanceof Error ? error.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold">
                        Création de Commande
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                            {error}
                        </div>
                    )}
                    <OrderForm onSubmit={handleOrder} isLoading={isLoading} />
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateOrder;