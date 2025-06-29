import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Try to parse JSON

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      return true; // Success
    } catch (err) {
      setError(err.message);
      return false; // Failure
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
