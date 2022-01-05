import { BroaSortBy } from "../../../shared/broas.types";
import { useBroasStore } from "../stores/useBroasStore";

type Props = {
  className?: string;
  onChange?: (value: BroaSortBy) => void;
};

type Filter = {
  title: string;
  options: {
    label: string;
    value: BroaSortBy;
  }[];
};

const filters: Filter[] = [
  {
    title: "Organizar por",
    options: [
      {
        label: "Mais recentes",
        value: "recent",
      },
      {
        label: "Mais antigas",
        value: "oldest",
      },
      {
        label: "Mais risadas",
        value: "smiles",
      },
    ],
  },
];

export const BroasFilter = ({ className = "", onChange }: Props) => {
  const broaFilter = useBroasStore((s) => s.broaFilter);
  return (
    <section
      className={`grid gap-4 p-8 bg-white rounded-base shadow-sm text-xl ${className}`}
    >
      {filters.map((filter) => (
        <article key={filter.title}>
          <h2 className='font-bold text-2xl mb-4 text-brand-gray-2'>
            {filter.title}
          </h2>
          <ul className='grid gap-4'>
            {filter.options.map((option) => (
              <li key={option.value} className='flex items-center'>
                <input
                  type='radio'
                  id={option.value}
                  name='filter'
                  checked={broaFilter.sortBy === option.value}
                  onChange={(e) => onChange?.(option.value)}
                  className='peer mr-4 accent-[#8f7900]'
                />
                <label
                  htmlFor={option.value}
                  className='peer-checked:text-brand-primary-dark peer-checked:font-semibold'
                >
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
};
