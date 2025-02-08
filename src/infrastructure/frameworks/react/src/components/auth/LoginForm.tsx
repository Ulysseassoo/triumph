import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 bg-white/80 backdrop-blur-sm animate-fade-in">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Connexion</h1>
        <p className="text-sm text-muted-foreground">
          Entrez vos identifiants pour accéder à votre espace
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="manager@partner.com"
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mot de passe
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-triumph-red hover:bg-triumph-red/90"
          disabled={isLoading}
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
      <div className="text-center">
        <a
          href="#"
          className="text-sm text-muted-foreground hover:text-triumph-red transition-colors"
        >
          Mot de passe oublié ?
        </a>
      </div>
    </Card>
  );
};