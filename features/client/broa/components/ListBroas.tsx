import { RefreshIcon, SearchIcon } from "@heroicons/react/outline";
import { Broa } from "@prisma/client";
import { FormEvent, useRef } from "react";
import { MyBroaReactions } from "../../../shared/models/my_broa_reactions";
import { MyUser } from "../../../shared/models/my_user";
import Card from "../../core/components/Card";

type Props = {
  broas: Broa[] | MyBroaReactions[];
  user: MyUser | null;
  isLoading?: boolean;
  onSearch?: (search: string) => void;
};

const ListBroas = ({ broas, user, isLoading = false, onSearch }: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(searchInputRef.current?.value || "");
  };

  return (
    <>
      {onSearch && (
        <form
          className='relative max-w-lg text-xl mx-auto mb-12 bg-white rounded-lg'
          onSubmit={handleSearch}
        >
          <span className='flex items-center'>
            <input
              ref={searchInputRef}
              type='text'
              placeholder='pesquisar broa'
              className=' py-4 pl-4 pr-14 w-full rounded-lg'
            />
            <SearchIcon
              role='button'
              className='absolute right-4 ml-auto w-8 h-8 hover:text-brand-primary'
            />
          </span>
        </form>
      )}

      <ul className='max-w-[102.4rem] mx-auto flex flex-wrap -m-4'>
        {broas.length ? (
          broas.map((broa) => (
            <li
              key={broa.id}
              className='flex-auto m-4  min-w-[23rem] md:min-w-[30rem] max-w-[40rem] animate-fadeIn'
            >
              <Card broa={broa} user={user} />
            </li>
          ))
        ) : (
          <li
            className={`flex items-center text-center justify-center text-2xl text-brand-gray-3 p-8 bg-white rounded-2xl  w-full`}
          >
            {!isLoading ? (
              searchInputRef.current?.value ? (
                "Nenhum resultado encontrado!"
              ) : (
                "Crie agora a sua broa!"
              )
            ) : (
              <RefreshIcon className='w-8 h-8 md:w-12 md:h-12 animate-spin' />
            )}
          </li>
        )}
      </ul>
    </>
  );
};

export default ListBroas;
