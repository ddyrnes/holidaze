import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, getUserBookings } from "../../services/api/profiles";
import type { Booking } from "../../types/api.types";
import { Button, Input, SkeletonBox } from "../../components/ui";
import { showSuccess, showError } from "../../utils";
import * as S from "./ProfilePage.styles";

interface AvatarFormData {
  url: string;
  alt: string;
}

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

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

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const response = await getUserBookings(user.name);
        setBookings(response.data);
      } catch {
        showError("Failed to load bookings");
      } finally {
        setIsLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [user]);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isPastBooking = (dateTo: string) => {
    return new Date(dateTo) < new Date();
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    const aIsPast = isPastBooking(a.dateTo);
    const bIsPast = isPastBooking(b.dateTo);
    if (aIsPast !== bIsPast) return aIsPast ? 1 : -1;
    return new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime();
  });

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

      <S.Section>
        <S.SectionTitle>My Bookings</S.SectionTitle>
        {isLoadingBookings ? (
          <S.LoadingState>
            {[1, 2, 3].map((i) => (
              <SkeletonBox key={i} height="96px" />
            ))}
          </S.LoadingState>
        ) : sortedBookings.length === 0 ? (
          <S.EmptyState>
            <p>You haven't made any bookings yet.</p>
            <S.ViewButton onClick={() => navigate("/")}>
              Browse venues
            </S.ViewButton>
          </S.EmptyState>
        ) : (
          <S.BookingsList>
            {sortedBookings.map((booking) => (
              <S.BookingCard key={booking.id}>
                {booking.venue?.media?.[0]?.url ? (
                  <S.BookingImage
                    src={booking.venue.media[0].url}
                    alt={booking.venue.media[0].alt || booking.venue.name}
                  />
                ) : (
                  <S.BookingImagePlaceholder>No image</S.BookingImagePlaceholder>
                )}
                <S.BookingDetails>
                  <S.BookingVenueName>
                    {booking.venue?.name || "Unknown venue"}
                  </S.BookingVenueName>
                  <S.BookingDates>
                    {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                  </S.BookingDates>
                  <S.BookingGuests>
                    {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                  </S.BookingGuests>
                  <S.BookingStatus $isPast={isPastBooking(booking.dateTo)}>
                    {isPastBooking(booking.dateTo) ? "Completed" : "Upcoming"}
                  </S.BookingStatus>
                </S.BookingDetails>
                <S.ViewButton onClick={() => navigate(`/venues/${booking.venue?.id}`)}>
                  View venue
                </S.ViewButton>
              </S.BookingCard>
            ))}
          </S.BookingsList>
        )}
      </S.Section>
    </S.Container>
  );
}

export default ProfilePage;
