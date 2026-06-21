import supabase, { supabaseUrl } from "./supabase";

interface SignUpProps {
  email: string;
  password: string;
  fullName: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface UpdateUserProps {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}
export async function signup({ email, password, fullName }: SignUpProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }: LoginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  //
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UpdateUserProps) {
  //? 1 Update password or fullname
  const updateData: { password?: string; data?: { fullName?: string } } = {};
  if (password) updateData.password = password;
  if (fullName) {
    updateData.data = { ...updateData.data, fullName };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  //? 2 Upload the avatar image
  // ✅ Null-check user before accessing .id
  if (!data.user) throw new Error("User not found after update");
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //? 3 Update the avatar of the user

  const { data: updatedUser, error: userError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (userError) throw new Error(userError.message);

  return updatedUser;
}
