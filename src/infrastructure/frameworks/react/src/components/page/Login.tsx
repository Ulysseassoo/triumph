import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  LoginForm from '../composable/LoginForm';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';


function Login () {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  
  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Échec de la connexion');
      }

      const data = await response.json();
      console.log("error data" , data)
      localStorage.setItem('token', data.accessToken);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Connexion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            <div className="mt-4 text-center">
              <Link 
                to="/register" 
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Pas encore de compte ? S'inscrire
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;