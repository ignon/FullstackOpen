export const assertNever = ({ value }: { value: never }): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(value)}`
  );
};