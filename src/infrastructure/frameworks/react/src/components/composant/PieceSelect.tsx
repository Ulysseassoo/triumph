import React, { useState, useEffect } from 'react';

interface Piece {
  id: string;
  name: string;
}

interface PieceSelectProps {
  onPieceSelect: (pieceId: string) => void;
}

function PieceSelect({ onPieceSelect }: PieceSelectProps) {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        setIsLoading(true);
        const accessToken = localStorage.getItem('token');

        if (!accessToken) {
          throw new Error('No access token');
        }

        const response = await fetch('http://localhost:5002/pieces', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch pieces');
        }

        const data = await response.json();
        setPieces(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPieces();
  }, []);

  const handlePieceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPieceSelect(e.target.value);
  };

  if (isLoading) return <div>Loading pieces...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <select
      onChange={handlePieceSelect}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="">Select a piece</option>
      {pieces.map((piece) => (
        <option key={piece.id} value={piece.id}>
          {piece.name}
        </option>
      ))}
    </select>
  );
};
export default PieceSelect;