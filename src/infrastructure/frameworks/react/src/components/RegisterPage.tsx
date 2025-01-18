
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  RegisterForm  from './RegisterForm';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

function RegisterPage () {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (formData: {
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => {
    if (formData.password !== formData.confirmPassword) {
     
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'inscription');
      }

      
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          <div className="mt-4 text-center">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Déjà un compte ? Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default RegisterPage ;