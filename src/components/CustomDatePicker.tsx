import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  name: string;
  label?: string;
  className?: string;
};

export function CustomDatePicker({
  name,
  label,
  className,
}: Props): JSX.Element {
  const { register } = useFormContext();

  return (
    <div className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      <DatePicker
        id={name}
        className="border border-gray-300 p-1 rounded"
        {...register(name)}
        selected={null} // Coloque o valor pré-selecionado aqui, se desejar
      />
    </div>
  );
}
