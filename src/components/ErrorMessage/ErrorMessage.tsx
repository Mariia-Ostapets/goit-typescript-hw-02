import css from "./ErrorMessage";
import { ErrorMessageProps } from "./ErrorMessage.types";

export default function ErrorMessage({ errorMessage }:ErrorMessageProps) {
  return <p>{errorMessage}</p>;
}
