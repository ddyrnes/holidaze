import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Input } from "../../components/ui";
import { showSuccess, showError } from "../../utils/toast";
import { ApiError } from "../../utils/ApiError";
import * as S from "./LoginPage.styles";

interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      showSuccess("Welcome back!");
      navigate("/");
    } catch (error) {
      if (error instanceof ApiError) {
        showError(error.message);
      } else {
        showError("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <S.FormCard>
        <S.Title>Login</S.Title>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="your.name@stud.noroff.no"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@stud\.noroff\.no$/,
                message: "Must be a valid @stud.noroff.no email",
              },
            })}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </S.Form>
        <S.Footer>
          Don't have an account? <Link to="/register">Register</Link>
        </S.Footer>
      </S.FormCard>
    </S.Container>
  );
}

export default LoginPage;
