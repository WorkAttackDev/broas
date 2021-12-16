import { z, ZodError } from "zod";

//* UTILS
const errorMessages = {
  email: `campo e-mail inválido`,
  required: (fieldName: string) => `campo ${fieldName} é obrigatório`,
  invalidType: (fieldName: string, type: string) =>
    `campo ${fieldName} precisa ser do tipo ${type}`,
  max: (fieldName: string, max: number) =>
    `O campo ${fieldName} precisa ter até ${max} caracteres`,
  min: (fieldName: string, min: number) =>
    `O campo ${fieldName} precisa ter mais de ${min} caracteres`,
};

export type ValidationError = ZodError;

//* BROAS VALIDATION
const EditBroaValidate = z.object({
  id: z
    .number({
      invalid_type_error: errorMessages.invalidType("id", "number"),
    })
    .optional(),
  author: z
    .string({
      required_error: errorMessages.required("autor"),
      invalid_type_error: errorMessages.invalidType("autor", "string"),
    })
    .max(50, errorMessages.max("autor", 50))
    .min(1, errorMessages.min("autor", 1)),
  wrongVersion: z
    .string({
      required_error: errorMessages.required("versão da broa"),
      invalid_type_error: errorMessages.invalidType("versão da broa", "string"),
    })
    .max(250, errorMessages.max("versão da broa", 250))
    .min(1, errorMessages.min("versão da broa", 1)),
  rightVersion: z
    .string({
      required_error: errorMessages.required("versão correta"),
      invalid_type_error: errorMessages.invalidType("versão correta", "string"),
    })
    .max(250, errorMessages.max("versão correta", 250))
    .min(1, errorMessages.min("versão correta", 1)),
});

export type EditBroaValidationParams = Omit<
  z.infer<typeof EditBroaValidate>,
  "id"
>;

export const editBroaValidation = (param: EditBroaValidationParams) => {
  return EditBroaValidate.parse(param);
};

//* AUTH VALIDATION
//* Auth login validation

const LoginValidate = z.object({
  email: z
    .string({
      required_error: errorMessages.required("e-mail"),
      invalid_type_error: errorMessages.invalidType("e-mail", "string"),
    })
    .email(errorMessages.email)
    .max(200, errorMessages.max("e-mail", 200))
    .min(5, errorMessages.min("e-mail", 5)),
  password: z
    .string({
      required_error: errorMessages.required("password"),
      invalid_type_error: errorMessages.invalidType("password", "string"),
    })
    .max(250, errorMessages.max("password", 250))
    .min(8, errorMessages.min("password", 8)),
});

export type LoginValidationParams = z.infer<typeof LoginValidate>;

export const loginValidation = (param: LoginValidationParams) => {
  return LoginValidate.parse(param);
};

//* Auth login with google

const LoginWithGoogleValidate = z.object({
  sub: z
    .string({
      required_error: errorMessages.required("sub id"),
      invalid_type_error: errorMessages.invalidType("sub id", "string"),
    })
    .max(100, errorMessages.max("sub id", 100))
    .min(10, errorMessages.min("sub id", 10)),
  picture: z
    .string({
      required_error: errorMessages.required("imagem"),
      invalid_type_error: errorMessages.invalidType("imagem", "string"),
    })
    .max(300, errorMessages.max("imagem", 300))
    .min(10, errorMessages.min("imagem", 10)),
  name: z
    .string({
      required_error: errorMessages.required("name"),
      invalid_type_error: errorMessages.invalidType("name", "string"),
    })
    .max(100, errorMessages.max("name", 100))
    .min(2, errorMessages.min("name", 2)),
  email: z
    .string({
      required_error: errorMessages.required("e-mail"),
      invalid_type_error: errorMessages.invalidType("e-mail", "string"),
    })
    .email(errorMessages.email)
    .max(200, errorMessages.max("e-mail", 200))
    .min(5, errorMessages.min("e-mail", 5)),
  email_verified: z.boolean({
    required_error: errorMessages.required("e-mail verificado"),
    invalid_type_error: errorMessages.invalidType(
      "e-mail verificado",
      "boolean"
    ),
  }),
});

export type LoginWithGoogleValidationParams = z.infer<
  typeof LoginWithGoogleValidate
>;

export const loginWithGoogleValidation = (
  param: LoginWithGoogleValidationParams
) => {
  return LoginWithGoogleValidate.parse(param);
};

//* Auth forget password validation
const forgetPasswordValidator = z.object({
  email: z
    .string({
      required_error: errorMessages.required("e-mail"),
      invalid_type_error: errorMessages.invalidType("e-mail", "string"),
    })
    .email(errorMessages.email)
    .max(200, errorMessages.max("e-mail", 200))
    .min(5, errorMessages.min("e-mail", 5)),
});

export type ForgetPasswordParams = z.infer<typeof forgetPasswordValidator>;

export const forgetPasswordValidate = (param: ForgetPasswordParams) => {
  return forgetPasswordValidator.parse(param);
};

//* Auth reset password validation
const resetPasswordValidator = z.object({
  token: z
    .string({
      required_error: errorMessages.required("token"),
      invalid_type_error: errorMessages.invalidType("token", "string"),
    })
    .max(190, errorMessages.max("token", 190))
    .min(5, errorMessages.min("token", 5)),

  password: z
    .string({
      required_error: errorMessages.required("password"),
      invalid_type_error: errorMessages.invalidType("password", "string"),
    })
    .max(250, errorMessages.max("password", 250))
    .min(8, errorMessages.min("password", 8)),
});

export type ResetPasswordParams = z.infer<typeof resetPasswordValidator>;

export const resetPasswordValidate = (param: ResetPasswordParams) => {
  return resetPasswordValidator.parse(param);
};
