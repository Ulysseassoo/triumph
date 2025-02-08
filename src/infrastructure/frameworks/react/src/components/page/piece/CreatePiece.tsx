import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import PieceForm from '../../composant/PieceForm';

function CreatePiece() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            navigate('/login');
        }
    }, [navigate]);

    const handlePiece = async (formData: {
        name: string;
        type: string;
        cost: number;
        quantity: number;
        alertLimit: number;
    }) => {
        try {
            setIsLoading(true);
            setError(null);

            const accessToken = localStorage.getItem('token');

            if (!accessToken) {
                navigate('/login');
                return;
            }
            const response = await fetch('http://localhost:5002/pieces', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/login');
                return;
            }
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Échec de la création de la pièce');
            }

            navigate('/pieces/staff');
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
                        Création de Pièce détachée
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                            {error}
                        </div>
                    )}
                    <PieceForm onSubmit={handlePiece} isLoading={isLoading} />
                </CardContent>
            </Card>
        </div>
    );
}

export default CreatePiece;