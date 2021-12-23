import { RefreshIcon } from "@heroicons/react/outline";
import { Broa, BroaReaction } from "@prisma/client";
import { MyUser } from "../../../shared/models/my_user";
import Card from "../../core/components/Card";

type Props = {
  broas: Array<
    Broa & {
      reactions?: BroaReaction[] | undefined;
    }
  >;
  user: MyUser | null;
  isLoading?: boolean;
};

const ListBroas = ({ broas, user, isLoading = false }: Props) => {
  return (
    <ul className='max-w-[102.4rem] mx-auto flex flex-wrap -m-4'>
      {broas.length ? (
        broas.map((broa) => (
          <li
            key={broa.id}
            className='flex-auto m-4  min-w-[23rem] md:min-w-[30rem] max-w-[40rem]'
          >
            <Card broa={broa} user={user} />
          </li>
        ))
      ) : (
        <li
          className={`flex items-center text-2xl text-brand-gray-3 p-8 bg-white rounded-2xl  w-full`}
        >
          {!isLoading ? (
            "Crie agora a sua broa!"
          ) : (
            <RefreshIcon className='w-8 h-8 md:w-12 md:h-12 animate-spin' />
          )}
        </li>
      )}
    </ul>
  );
};

export default ListBroas;
