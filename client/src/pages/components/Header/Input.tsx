import { InputField } from "@/pages/hooks/useFiltersTabsData";

interface Props {
  field: InputField;
  min?: number;
  max?: number;
}

export function Input({ field, min, max }: Props) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
  };
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {field.label}
      </label>
      <input
        value={field.value}
        onChange={handleOnChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={field.type}
        placeholder={field.placeholder}
        min={min}
        max={max}
      />
    </>
  );
}
