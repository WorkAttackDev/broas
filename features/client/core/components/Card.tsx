import { Broa } from ".prisma/client";
import {
  CheckIcon,
  EmojiHappyIcon,
  PencilAltIcon,
  XIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";
import React from "react";
import { links } from "../data/links";
import Button from "./Button";
import Link from "next/link";

type Props = {
  broa: Broa;
  className?: string;
  editorMode?: boolean;
};

const Card = ({ broa, className = "", editorMode = false }: Props) => {
  return (
    <section
      className={`grid gap-4 p-8 bg-white rounded-base shadow-sm ${className}`}
    >
      <header className='flex justify-between items-center text-brand-gray-2'>
        <h6 className=' text-base'>{broa.author}</h6>
        {editorMode && (
          <Link
            key={broa.id}
            href={links.broaById(broa.id.toString())}
            passHref
          >
            <a>
              <PencilAltIcon className='w-6 h-6 cursor-pointer duration-200 hover:text-brand-primary' />
            </a>
          </Link>
        )}
      </header>
      <article className='font-bold'>
        <p className='flex items-center text-2xl text-brand-gray-2 mb-2'>
          {broa.rightVersion}
          <CheckIcon className='w-7 h-7 mb-1 ml-4 text-brand-gray-1' />
        </p>
        <p className='flex items-center text-2xl text-brand-gray-3'>
          {broa.wrongVersion}
          <XIcon className='w-6 h-6 ml-4 text-brand-gray-1' />
        </p>
      </article>
      <footer className='flex justify-between items-center'>
        <Button title='dar risada' Icon={EmojiHappyIcon} size='sm'>
          0
        </Button>
        <p className='text-base text-brand-gray-1'>
          {format(new Date(broa.createdAt), "dd/MM/yyyy 'às' HH:mm")}
        </p>
      </footer>
    </section>
  );
};

export default Card;
