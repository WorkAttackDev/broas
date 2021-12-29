import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { Broa } from "@prisma/client";
import { FormEvent, useRef, useState } from "react";
import { MyBroaReactions } from "../../../shared/models/my_broa_reactions";
import { MyUser } from "../../../shared/models/my_user";
import { PaginationType } from "../../../shared/types";
import Button from "../../core/components/Button";
import Card from "../../core/components/Card";

type Props = {
  broas: Broa[] | MyBroaReactions[];
  pagination?: PaginationType;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  user: MyUser | null;
  isLoading?: boolean;
  onSearch?: (search: string) => void;
};

const SearchForm = ({ onSearch }: { onSearch?: (search: string) => void }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(searchInputRef.current?.value || "");
  };

  return (
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
        <button className='absolute right-4 ml-auto hover:text-brand-primary'>
          <SearchIcon role='button' className='w-8 h-8 ' />
        </button>
      </span>
    </form>
  );
};

const ListBroas = ({
  broas,
  user,
  isLoading = false,
  pagination,
  onSearch,
  onNextPage,
  onPrevPage,
}: Props) => {
  const [hasText, setHasText] = useState(false);

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit) || 1
    : 1;

  return (
    <>
      {onSearch && (
        <SearchForm
          onSearch={(text) => {
            setHasText(!!text);
            onSearch(text);
          }}
        />
      )}

      <ul className='max-w-[102.4rem] mx-auto h-full flex flex-wrap -m-4'>
        {broas.length && !isLoading ? (
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
            className={`flex items-center text-center justify-center text-2xl text-brand-gray-3 p-8 bg-white rounded-2xl h-full  w-full`}
          >
            {!isLoading ? (
              hasText ? (
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
      {pagination && (
        <section className='bg-white p-4 mt-12 flex items-center rounded-lg justify-between text-xl max-w-xl mx-auto sm:px-6'>
          <div className='flex-1 flex justify-between'>
            <Button
              size='sm'
              disabled={pagination.page === 0}
              onClick={onPrevPage}
            >
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              <p>anterior</p>
            </Button>
            <div className='flex items-center font-semibold'>
              <p className='sm:hidden'>
                {pagination.page + 1} / {totalPages}
              </p>
              <p className='hidden sm:flex'>
                {pagination.page + 1} de {totalPages} página(s)
              </p>
            </div>
            <Button
              size='sm'
              disabled={pagination.page + 1 >= totalPages}
              onClick={onNextPage}
            >
              <p>proximo</p>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default ListBroas;
