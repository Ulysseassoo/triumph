import React, { useState } from 'react';
import PieceSelect from './PieceSelect';
import Button from '../ui/Button';

interface OrderFormProps {
 onSubmit: (formData: {
   pieces: { id: string; quantity: number }[];
   orderDate: string;
   deliveryDate: string;
   status: string;
 }) => void;
 isLoading: boolean;
}

function OrderForm({ onSubmit, isLoading }: OrderFormProps) {
 const [formData, setFormData] = useState({
   pieces: [{ id: '', quantity: '1' }],
   orderDate: new Date().toISOString().split('T')[0],
   deliveryDate: '',
   status: 'PENDING'
 });

 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   onSubmit({
     ...formData,
     pieces: formData.pieces.map(piece => ({
       id: piece.id,
       quantity: Number(piece.quantity)
     }))
   });
 };

 const updatePiece = (index: number, field: string, value: string) => {
   const newPieces = [...formData.pieces];
   newPieces[index] = { ...newPieces[index], [field]: value };
   setFormData(prev => ({ ...prev, pieces: newPieces }));
 };

 const addPiece = () => {
   setFormData(prev => ({
     ...prev,
     pieces: [...prev.pieces, { id: '', quantity: '1' }]
   }));
 };

 return (
   <form onSubmit={handleSubmit} className="space-y-6">
     {formData.pieces.map((piece, index) => (
       <div key={index} className="space-y-4">
         <div className="space-y-2">
           <label className="block text-sm font-medium text-gray-700">Pièce</label>
           <PieceSelect
             onPieceSelect={(pieceId) => updatePiece(index, 'id', pieceId)}
           />
         </div>
         <div className="space-y-2">
           <label className="block text-sm font-medium text-gray-700">Quantité</label>
           <input
             type="number"
             value={piece.quantity}
             onChange={(e) => updatePiece(index, 'quantity', e.target.value)}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
             required
             min="1"
           />
         </div>
       </div>
     ))}

     <button 
       type="button" 
       onClick={addPiece}
       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
     >
       Ajouter une pièce
     </button>

     <div className="space-y-2">
       <label className="block text-sm font-medium text-gray-700">Date de Commande</label>
       <input
         type="date"
         value={formData.orderDate}
         onChange={(e) => setFormData(prev => ({ ...prev, orderDate: e.target.value }))}
         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
         required
       />
     </div>

     <div className="space-y-2">
       <label className="block text-sm font-medium text-gray-700">Date de Livraison</label>
       <input
         type="date"
         value={formData.deliveryDate}
         onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))}
         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
       />
     </div>

     <div className="space-y-2">
       <label className="block text-sm font-medium text-gray-700">Statut</label>
       <select
         value={formData.status}
         onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
       >
         <option value="PENDING">En attente</option>
         <option value="CONFIRMED">Confirmé</option>
       </select>
     </div>

     <Button
       type="submit"
       disabled={isLoading}
       className="w-full"
     >
       {isLoading ? 'Création de la commande...' : 'Créer la commande'}
     </Button>
   </form>
 );
}

export default OrderForm;