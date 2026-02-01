import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Input, Checkbox } from "../../components/ui";
import { showSuccess, showError } from "../../utils/toast";
import { ApiError } from "../../utils/ApiError";
import * as S from "./RegisterPage.styles";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  venueManager: boolean;
}

function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      venueManager: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      await registerUser(data.name, data.email, data.password, data.venueManager);
      showSuccess("Account created! Please log in.");
      navigate("/login");
    } catch (error) {
      if (error instanceof ApiError) {
        showError(error.message);
      } else {
        showError("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <S.FormCard>
        <S.Title>Create Account</S.Title>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            type="text"
            label="Username"
            placeholder="your_username"
            error={errors.name?.message}
            {...register("name", {
              required: "Username is required",
              pattern: {
                value: /^[\w]+$/,
                message: "Only letters, numbers, and underscores allowed",
              },
            })}
          />
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
            placeholder="Minimum 8 characters"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <Input
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Repeat your password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            })}
          />
          <S.CheckboxWrapper>
            <Checkbox
              id="venueManager"
              label="I want to register as a venue manager"
              {...register("venueManager")}
            />
          </S.CheckboxWrapper>
          <Button type="submit" $variant="cta" $fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </S.Form>
        <S.Footer>
          Already have an account? <Link to="/login">Login</Link>
        </S.Footer>
      </S.FormCard>
    </S.Container>
  );
}

export default RegisterPage;
