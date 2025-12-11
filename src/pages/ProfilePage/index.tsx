import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../services/api/profiles";
import { Button, Input } from "../../components/ui";
import { showSuccess, showError } from "../../utils";
import * as S from "./ProfilePage.styles";

interface AvatarFormData {
  url: string;
  alt: string;
}

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AvatarFormData>({
    defaultValues: {
      url: "",
      alt: "",
    },
  });

  const watchUrl = watch("url");

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (watchUrl && isValidUrl(watchUrl)) {
      setPreviewUrl(watchUrl);
    } else {
      setPreviewUrl("");
    }
  }, [watchUrl]);

  const onSubmit = async (data: AvatarFormData) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const response = await updateProfile(user.name, {
        avatar: {
          url: data.url,
          alt: data.alt || `${user.name}'s avatar`,
        },
      });

      updateUser({
        ...user,
        avatar: response.data.avatar,
      });

      showSuccess("Avatar updated successfully");
      reset();
      setPreviewUrl("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update avatar";
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <S.Container>
      <S.ProfileHeader>
        <S.AvatarWrapper>
          {user.avatar?.url ? (
            <S.Avatar src={user.avatar.url} alt={user.avatar.alt || `${user.name}'s avatar`} />
          ) : (
            <S.AvatarPlaceholder>{getInitial(user.name)}</S.AvatarPlaceholder>
          )}
        </S.AvatarWrapper>
        <S.UserName>{user.name}</S.UserName>
        <S.UserEmail>{user.email}</S.UserEmail>
        {user.venueManager && <S.Badge>Venue Manager</S.Badge>}
      </S.ProfileHeader>

      <S.Section>
        <S.SectionTitle>Update Avatar</S.SectionTitle>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="avatar-url"
            label="Avatar URL"
            type="url"
            placeholder="https://example.com/image.jpg"
            error={errors.url?.message}
            {...register("url", {
              required: "Avatar URL is required",
              validate: (value) => isValidUrl(value) || "Please enter a valid URL",
            })}
          />

          <Input
            id="avatar-alt"
            label="Alt Text (optional)"
            type="text"
            placeholder="Description of your avatar"
            {...register("alt")}
          />

          {previewUrl && (
            <S.AvatarPreview>
              <S.PreviewImage
                src={previewUrl}
                alt="Preview"
                onError={() => setPreviewUrl("")}
              />
              <S.PreviewText>Preview</S.PreviewText>
            </S.AvatarPreview>
          )}

          <S.ButtonGroup>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Avatar"}
            </Button>
            <Button
              type="button"
              $variant="secondary"
              onClick={() => {
                reset();
                setPreviewUrl("");
              }}
            >
              Cancel
            </Button>
          </S.ButtonGroup>
        </S.Form>
      </S.Section>
    </S.Container>
  );
}

export default ProfilePage;
