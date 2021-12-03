import { PlusCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import CreateBroaForm from "../../broa/components/createBroaForm";
import { useBroasStore } from "../../broa/stores/useBroasStore";
import { CreateBroaValidationParams } from "../../shared/lib/validation";
import { createBroaClient } from "../config/client";
import useApi from "../hooks/use_api";
import Button from "./Button";
import Loading from "./Loading";
import Modal from "./Modal";
import Link from "next/link";
import { links } from "../data/links";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const addBroa = useBroasStore((state) => state.addBroa);

  const createBroaApi = useApi(createBroaClient);

  useEffect(() => {
    if (!createBroaApi.data) return;

    addBroa(createBroaApi.data);
    createBroaApi.reset();
    setIsOpen(false);
  }, [createBroaApi.data]);

  const handleOnSubmit = async (data: CreateBroaValidationParams) => {
    await createBroaApi.request(data);
  };

  return (
    <header className='sticky top-0  bg-white h-24 w-full px-8'>
      <div className='max-w-[102.4rem] mx-auto flex justify-between items-center w-full h-full'>
        <Link href={links.home} passHref>
          <h1 className='text-5xl font-medium logo-font cursor-pointer'>
            Broas
          </h1>
        </Link>
        <Button
          title='criar broa'
          Icon={PlusCircleIcon}
          onClick={() => setIsOpen(true)}
        >
          Criar
        </Button>
        <Modal
          title='criar broa'
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <CreateBroaForm
            onSubmit={handleOnSubmit}
            onCancel={() => setIsOpen(false)}
          />
          <Loading isLoading={createBroaApi.loading} />
        </Modal>
      </div>
    </header>
  );
};

export default Header;
