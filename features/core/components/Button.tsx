import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  Icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  size?: "md" | "sm";
};

const Button: React.FC<Props> = ({ children, Icon, size, ...props }) => {
  const buttonSizeClass =
    size === "md" ? "px-6 py-3 text-xl" : "px-4 py-2 text-base";
  const iconSizeClass = size === "md" ? "w-7 h-7" : "w-6 h-6";

  return (
    <button
      className={`${buttonSizeClass} flex justify-between items-center rounded-full bg-brand-primary text-white   shadow-sm leading-none hover:bg-brand-primary-dark`}
      {...props}
    >
      {Icon && <Icon className={`${iconSizeClass} mr-2`} />}
      {children}
    </button>
  );
};

export default Button;
