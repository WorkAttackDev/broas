import { Transition } from "@headlessui/react";
import { Fragment } from "react";

const Loading = ({ isLoading }: { isLoading: boolean }) => (
  <Transition
    show={isLoading}
    as={Fragment}
    enter='ease-out duration-300'
    enterFrom='opacity-0'
    enterTo='opacity-100'
    leave='ease-in duration-200'
    leaveFrom='opacity-100'
    leaveTo='opacity-0'
  >
    <div className='absolute inset-0 flex flex-col justify-center items-center bg-white'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary'></div>
      <p className='mt-8 text-xl text-brand-primary-dark'>Carregando...</p>
    </div>
  </Transition>
);

export default Loading;
