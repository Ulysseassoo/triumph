import { useState } from "react";
import Button from "../ui/Button";
interface PieceFormProps {
    onSubmit: (data:{
        name: string;
        type: string;
        cost: number;
        quantity: number;
        alertLimit: number;
    }) => void;
    isLoading?: boolean;
}
function PieceForm ({onSubmit,isLoading}: PieceFormProps) {
    
        const [formData, setFormData] = useState({
          name: '',
          type: '',
          cost: '',
          quantity: '',
          alertLimit: ''
        });
      
        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          onSubmit({
            ...formData,
            cost: Number(formData.cost),
            quantity: Number(formData.quantity),
            alertLimit: Number(formData.alertLimit)
          });
        };
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className='space-y-2'>
            <label htmlFor="name" className='block text-sm font-medium text-gray-700'> 
              nom de la pièce
            </label>
            <input 
              id="name"
              type="string"
              value={formData.name}
              onChange={(e) => setFormData({...formData,name:e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type de Pièce
            </label>
            <input
              id="type"
              type="string"
              value={formData.type}
              onChange={(e) => setFormData({...formData,type:e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
    
          <div className="space-y-2">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
             Quantité
            </label>
            <input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData,quantity:e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
    
          <div className="space-y-2">
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
              Prix de la Pièce
            </label>
            <input
              id="cost"
              type="number"
              value={formData.cost}
              onChange={(e) => setFormData({...formData,cost:e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="alertLimit" className="block text-sm font-medium text-gray-700">
              Seuil Limit 
            </label>
            <input
              id="alertLimit"
              type="number"
              value={formData.alertLimit}
              onChange={(e) => setFormData({...formData,alertLimit:e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
            <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
            >
            {isLoading ? 'création de la pièce detachée ...' : 'crée la pièce détachée'}
            </Button>
        </form>
      );
}
export default PieceForm;