import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { createVenue } from "../../services/api/venues";
import { Button, Input, Checkbox } from "../../components/ui";
import { showSuccess, showError } from "../../utils";
import {
  Container,
  BackButton,
  Title,
  Form,
  Section,
  SectionTitle,
  FieldGroup,
  FieldRow,
  TextareaWrapper,
  Label,
  Textarea,
  ErrorText,
  AmenitiesGrid,
  ImageInputs,
  ImageInputRow,
  ImageInputWrapper,
  RemoveButton,
  AddImageButton,
  ImagePreview,
  PreviewImage,
  ButtonGroup,
} from "./CreateVenuePage.styles";

interface VenueFormData {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  media: Array<{ url: string; alt: string }>;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
  address: string;
  city: string;
  country: string;
}

function CreateVenuePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<VenueFormData>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      maxGuests: 1,
      media: [{ url: "", alt: "" }],
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
      address: "",
      city: "",
      country: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const watchMedia = watch("media");

  const isValidUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const updatePreviews = () => {
    const urls = watchMedia
      .map((m) => m.url)
      .filter((url) => url && isValidUrl(url));
    setPreviewUrls(urls);
  };

  const onSubmit = async (data: VenueFormData) => {
    setIsSubmitting(true);

    try {
      const venueData = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        maxGuests: Number(data.maxGuests),
        media: data.media.filter((m) => m.url).map((m) => ({
          url: m.url,
          alt: m.alt || data.name,
        })),
        meta: {
          wifi: data.wifi,
          parking: data.parking,
          breakfast: data.breakfast,
          pets: data.pets,
        },
        location: {
          address: data.address || undefined,
          city: data.city || undefined,
          country: data.country || undefined,
        },
      };

      await createVenue(venueData);
      showSuccess("Venue created successfully!");
      navigate("/manager/venues");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create venue";
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate("/manager/venues")}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to My Venues
      </BackButton>

      <Title>Create New Venue</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <SectionTitle>Basic Information</SectionTitle>
          <FieldGroup>
            <Input
              id="name"
              label="Venue Name"
              placeholder="Enter venue name"
              error={errors.name?.message}
              {...register("name", {
                required: "Venue name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
            />

            <TextareaWrapper>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your venue..."
                $hasError={!!errors.description}
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 10, message: "Description must be at least 10 characters" },
                })}
              />
              {errors.description && <ErrorText>{errors.description.message}</ErrorText>}
            </TextareaWrapper>

            <FieldRow>
              <Input
                id="price"
                label="Price per Night ($)"
                type="number"
                min="1"
                placeholder="100"
                error={errors.price?.message}
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be at least $1" },
                  valueAsNumber: true,
                })}
              />

              <Input
                id="maxGuests"
                label="Maximum Guests"
                type="number"
                min="1"
                max="100"
                placeholder="4"
                error={errors.maxGuests?.message}
                {...register("maxGuests", {
                  required: "Maximum guests is required",
                  min: { value: 1, message: "Must allow at least 1 guest" },
                  max: { value: 100, message: "Maximum 100 guests" },
                  valueAsNumber: true,
                })}
              />
            </FieldRow>
          </FieldGroup>
        </Section>

        <Section>
          <SectionTitle>Images</SectionTitle>
          <ImageInputs>
            {fields.map((field, index) => (
              <ImageInputRow key={field.id}>
                <ImageInputWrapper>
                  <Input
                    id={`media.${index}.url`}
                    label={index === 0 ? "Image URL" : `Image URL ${index + 1}`}
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    error={errors.media?.[index]?.url?.message}
                    {...register(`media.${index}.url`, {
                      validate: (value) => !value || isValidUrl(value) || "Please enter a valid URL",
                    })}
                    onBlur={updatePreviews}
                  />
                </ImageInputWrapper>
                {fields.length > 1 && (
                  <RemoveButton type="button" onClick={() => remove(index)} aria-label="Remove image">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </RemoveButton>
                )}
              </ImageInputRow>
            ))}

            <AddImageButton type="button" onClick={() => append({ url: "", alt: "" })}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Another Image
            </AddImageButton>

            {previewUrls.length > 0 && (
              <ImagePreview>
                {previewUrls.map((url, index) => (
                  <PreviewImage key={index}>
                    <img src={url} alt={`Preview ${index + 1}`} onError={(e) => e.currentTarget.style.display = "none"} />
                  </PreviewImage>
                ))}
              </ImagePreview>
            )}
          </ImageInputs>
        </Section>

        <Section>
          <SectionTitle>Amenities</SectionTitle>
          <AmenitiesGrid>
            <Checkbox id="wifi" label="WiFi" {...register("wifi")} />
            <Checkbox id="parking" label="Parking" {...register("parking")} />
            <Checkbox id="breakfast" label="Breakfast" {...register("breakfast")} />
            <Checkbox id="pets" label="Pets Allowed" {...register("pets")} />
          </AmenitiesGrid>
        </Section>

        <Section>
          <SectionTitle>Location (Optional)</SectionTitle>
          <FieldGroup>
            <Input
              id="address"
              label="Address"
              placeholder="123 Main Street"
              {...register("address")}
            />
            <FieldRow>
              <Input
                id="city"
                label="City"
                placeholder="New York"
                {...register("city")}
              />
              <Input
                id="country"
                label="Country"
                placeholder="United States"
                {...register("country")}
              />
            </FieldRow>
          </FieldGroup>
        </Section>

        <ButtonGroup>
          <Button type="button" $variant="secondary" onClick={() => navigate("/manager/venues")}>
            Cancel
          </Button>
          <Button type="submit" $variant="cta" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Venue"}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}

export default CreateVenuePage;
