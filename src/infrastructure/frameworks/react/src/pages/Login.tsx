import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-triumph-light">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/logo-moto.png"
            alt="Triumph"
            className="h-12 mx-auto mb-6"
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;