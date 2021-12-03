import { z, ZodError } from "zod";

const BroaValidate = z.object({
  author: z
    .string({
      required_error: "campo autor é obrigatório",
      invalid_type_error: "author must be a string",
    })
    .max(50, "O campo autor precisa ter até 50 caracteres")
    .min(1, "O campo autor precisa ter mais de 1 caracteres"),
  wrongVersion: z
    .string({
      required_error: "campo versão da broa é obrigatório",
      invalid_type_error: "wrongVersion must be a string",
    })
    .max(250, "O campo versão da broa precisa ter até 250 caracteres")
    .min(1, "O campo versão da broa precisa ter mais de 1 caracteres"),
  rightVersion: z
    .string({
      required_error: "campo versão correta é obrigatório",
      invalid_type_error: "rightVersion must be a string",
    })
    .max(250, "O campo versão correta precisa ter até 250 caracteres")
    .min(1, "O campo versão correta precisa ter mais de 1 caracteres"),
});

export type CreateBroaValidationParams = z.infer<typeof BroaValidate>;

export type ValidationError = ZodError;

export const createBroaValidation = (param: CreateBroaValidationParams) => {
  return BroaValidate.parse(param);
};
