import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Button from "../../core/components/Button";
import InputField from "../../core/components/InputField";
import TextAreaField from "../../core/components/TextAreaField";
import {
  createBroaValidation,
  CreateBroaValidationParams,
  ValidationError,
} from "../../shared/lib/validation";

type Props = {
  onSubmit: (data: CreateBroaValidationParams) => void;
  onCancel: () => void;
};

const CreateBroaForm = ({ onSubmit, onCancel }: Props) => {
  const [errors, setErrors] = useState<string[]>([]);

  const createBroaRef = useRef<CreateBroaValidationParams>({
    author: "",
    rightVersion: "",
    wrongVersion: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: keyof CreateBroaValidationParams
  ) => {
    createBroaRef.current[key] = e.currentTarget.value;
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = createBroaValidation(createBroaRef.current);
      onSubmit(validatedData);
    } catch (err) {
      if ((err as ValidationError).errors) {
        const error = err as ValidationError;
        setErrors(error.errors.map((v) => v.message));
        return;
      }
      console.log(err);
    }
  };

  return (
    <form className='grid gap-2' onSubmit={handleOnSubmit}>
      <TextAreaField
        labelText='versão correta'
        maxLength={250}
        onChange={(e) => handleChange(e, "rightVersion")}
      />
      <TextAreaField
        labelText='versão da broa'
        maxLength={250}
        onChange={(e) => handleChange(e, "wrongVersion")}
      />
      <InputField
        labelText='nome do autor'
        maxLength={50}
        onChange={(e) => handleChange(e, "author")}
      />

      {!!errors.length && (
        <ul className='my-2'>
          {errors.map((err) => (
            <li
              className='text-red-400 text-lg list-disc list-inside'
              key={err}
            >
              {err}
            </li>
          ))}
        </ul>
      )}

      <div className='flex items-center mt-4'>
        <Button size='md'>criar</Button>
        <span className='block w-4'></span>
        <Button
          type='button'
          size='md'
          theme='secondary'
          onClick={() => onCancel()}
        >
          voltar
        </Button>
      </div>
    </form>
  );
};

export default CreateBroaForm;
