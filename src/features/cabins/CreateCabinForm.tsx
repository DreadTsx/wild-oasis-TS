import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import type {
  CabinFormData,
  CabinTypes,
  NewCabin,
} from "../../types/cabinTypes";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useUpdateCabin";

interface EditCabinFormProps {
  cabinToEdit?: CabinTypes;
  onCloseModal?: () => void;
}

function CreateCabinForm({ cabinToEdit, onCloseModal }: EditCabinFormProps) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValue } = cabinToEdit || {};
  const isEditedSession = Boolean(editId);
  //
  const { register, handleSubmit, reset, formState, getValues } =
    useForm<CabinFormData>({
      defaultValues: isEditedSession ? editValue : {},
    });
  const { errors } = formState;

  //
  const Onsubmit = (data: CabinFormData) => {
    // Handle image - could be FileList or existing string URL
    const image = typeof data.image === "string" ? data.image : data.image[0];
    //
    const cabinData: NewCabin = {
      name: data.name,
      maxCapacity: Number(data.maxCapacity),
      regularPrice: Number(data.regularPrice),
      discount: Number(data.discount),
      description: data.description,
      image: image,
    };

    if (isEditedSession) {
      editCabin(
        { newCabinData: cabinData, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(cabinData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  };
  // const OnError = (errors: FieldErrors) => {
  //
  //   console.log(errors);
  // };
  const OnError = () => {
    // console.log(errors);
  };
  return (
    <Form
      onSubmit={handleSubmit(Onsubmit, OnError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" id="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        id="maxCapacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at be 1" },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        id="regularPrice"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at be 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" id="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            valueAsNumber: true,
            validate: (value: number | string) => {
              return (
                getValues().regularPrice >= value ||
                "Discount should be less than the regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        id="description"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" id="image" error={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditedSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditedSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
