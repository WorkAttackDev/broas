import Button from "./Button";
import { PlusCircleIcon } from "@heroicons/react/outline";

const Header = () => {
  return (
    <header className='sticky top-0 flex bg-white h-24 justify-between items-center w-full px-8'>
      <h1 className='text-5xl font-medium logo-font'>Broas</h1>
      <Button title='criar broa' Icon={PlusCircleIcon}>
        Criar
      </Button>
    </header>
  );
};

export default Header;
