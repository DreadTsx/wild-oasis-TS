import React, { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(user?.user_metadata?.fullName ?? "");
  const [avatar, setAvatar] = useState<File | null>(null);

  // Guard clause - if user is not loaded, return null
  if (!user) return null;

  const { email } = user;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
        },
      },
    );
  }

  function handleCancel() {
    setFullName(user?.user_metadata?.fullName ?? "");
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setAvatar(file || null);
          }}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          $variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdating}>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
