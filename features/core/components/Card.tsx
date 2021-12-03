import { Broa } from ".prisma/client";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { format } from "date-fns";
import Button from "./Button";

type Props = {
  broa: Broa;
  className?: string;
};

const Card = ({ broa, className = "" }: Props) => {
  return (
    <section
      className={`grid gap-4 p-8 bg-white rounded-base shadow-sm ${className}`}
    >
      <h6 className='text-brand-gray-2 text-base'>{broa.author}</h6>
      <article className='font-bold'>
        <p className='text-2xl text-brand-gray-2 mb-2'>{broa.rightVersion}</p>
        <p className='text-2xl text-brand-gray-3'>{broa.wrongVersion}</p>
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
