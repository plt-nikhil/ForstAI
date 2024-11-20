export function validateObject(
  schema: {
    validate: (arg0: any, arg1: { abortEarly: boolean }) => Promise<any>;
  },
  object: any
) {
  let hasError = false;
  return schema
    .validate(object, { abortEarly: false }) // Validate all fields
    .then(() => ({ isError: false, errors: undefined }))
    .catch((errors: { inner: any[] }) => {
      hasError = true;
      const errorObject: Record<string, string> = {};
      errors.inner.forEach((error) => {
        errorObject[error.path] = error.message;
      });
      return { isError: hasError, errors: errorObject };
    });
}
