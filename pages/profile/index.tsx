import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBroasByUserIdClient } from "../../features/client/broa/client";
import ListBroas from "../../features/client/broa/components/ListBroas";
import Button from "../../features/client/core/components/Button";
import InputField from "../../features/client/core/components/InputField";
import MainLayout from "../../features/client/core/components/MainLayout";
import Modal from "../../features/client/core/components/Modal";
import Popup from "../../features/client/core/components/Popup";
import { links } from "../../features/client/core/data/links";
import useApi from "../../features/client/core/hooks/use_api";
import useForm from "../../features/client/core/hooks/use_form";
import { useAuthStore } from "../../features/client/core/stores/authStore";
import { handleClientValidationError } from "../../features/client/core/utils/client_errors";
import {
  editUserClient,
  logoutClient,
} from "../../features/client/user/client";
import {
  editUserValidate,
  EditUserValidationParams,
} from "../../features/shared/lib/validation/edit_user_validator";
import { MyUser } from "../../features/shared/models/my_user";

const Avatar = ({ user }: { user: MyUser | null }) => {
  return (
    <div className='relative flex justify-center items-center overflow-hidden z-10 rounded-full w-32 h-32 bg-brand-gray-1 text-white text-2xl leading-none border-2 border-brand-gray-1 mb-2'>
      {user?.picture ? (
        <Image
          width={192}
          height={192}
          layout='intrinsic'
          objectFit='cover'
          alt='user image'
          src={user.picture}
        />
      ) : (
        user?.userName.substring(0, 3) || "broa"
      )}
    </div>
  );
};

type EditUserFormProps = {
  isLoading?: boolean;
  user: MyUser | null;
  onSubmit: (formData: Omit<EditUserValidationParams, "id">) => void;
};

const EditUserForm = ({ user, onSubmit, isLoading }: EditUserFormProps) => {
  const { formValues, handleChange } = useForm<
    Omit<EditUserValidationParams, "id">
  >({
    userName: user?.userName || "",
    name: user?.name || "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form className='grid gap-8' onSubmit={handleSubmit}>
      <InputField
        labelText='nome completo'
        defaultValue={formValues.name}
        onChange={(e) => handleChange(e, "name")}
        maxLength={200}
      />
      <InputField
        labelText='nome de usuário'
        defaultValue={formValues.userName}
        onChange={(e) => handleChange(e, "userName")}
        maxLength={200}
      />
      <Button className='mr-0' isLoading={isLoading}>
        editar usuário
      </Button>
    </form>
  );
};

const ProfilePage: NextPage = ({}) => {
  const { user, setUser } = useAuthStore();

  const { replace } = useRouter();

  const [showPopup, setShowPopup] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const { data, loading, request, error } =
    useApi<typeof getBroasByUserIdClient>();

  const logoutQuery = useApi<typeof logoutClient>();
  const editUserMutation = useApi<typeof editUserClient>();

  useEffect(() => {
    if (!user) return;

    request(getBroasByUserIdClient(user.id));
  }, [request, user]);

  useEffect(() => {
    if (error || logoutQuery.error || editUserMutation.error)
      setShowPopup(true);
  }, [error, logoutQuery.error, editUserMutation.error]);

  const handleLogout = async () => {
    const res = await logoutQuery.request(logoutClient());

    if (!res) return;
    replace(links.login);
  };

  const handleSubmit = async (
    formValues: Omit<EditUserValidationParams, "id">
  ) => {
    try {
      const validatedData = editUserValidate({ ...formValues, id: user?.id });
      const res = await editUserMutation.request(editUserClient(validatedData));

      if (!res) return;

      setUser(res);
      setShowModal(false);
    } catch (error) {
      handleClientValidationError(error);
    }
  };

  return (
    <MainLayout className='grid gap-12'>
      <section className='mx-auto grid gap-2 justify-items-center justify-center bg-white rounded-base shadow-sm px-4 py-8 md:px-8'>
        <Avatar user={user}></Avatar>
        <p className='text-2xl'>{user?.name}</p>
        <p className='text-lg'>@{user?.userName}</p>
        <p className='text-xl'>{user?.email}</p>
        <div className='flex flex-wrap justify-center mt-4'>
          <Button
            theme='secondary'
            className='m-2'
            onClick={() => setShowModal(true)}
          >
            editar perfil
          </Button>
          <Button
            theme='secondary'
            className='m-2'
            onClick={handleLogout}
            isLoading={logoutQuery.loading}
          >
            terminar sessão
          </Button>
          <Button theme='secondary' className='m-2 hover:bg-red-500'>
            apagar perfil
          </Button>
        </div>
      </section>
      <ListBroas broas={data || []} user={user} isLoading={loading} />

      <Popup
        isOpen={showPopup}
        texts={error || logoutQuery.error || editUserMutation.error || []}
        onClose={() => setShowPopup(false)}
      />
      <Modal
        isOpen={showModal}
        title='editar usuário'
        onClose={() => setShowModal(false)}
      >
        <EditUserForm
          user={user}
          onSubmit={handleSubmit}
          isLoading={editUserMutation.loading}
        />
      </Modal>
    </MainLayout>
  );
};

export default ProfilePage;
