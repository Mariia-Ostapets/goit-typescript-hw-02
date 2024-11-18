import css from "./SearchBar.module.css";
import toast from "react-hot-toast";
import { SearchBarProps } from "./SearchBar.types";
import { FormEvent } from "react";

export default function SearchBar({ onSearch }:SearchBarProps) {
  function handleSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const query = form.elements.namedItem("query") as HTMLInputElement;
    if (query.value.trim() === "") {
      toast.error("Please enter search term!", { position: "top-right" });
      return;
    }   
    onSearch(query.value.trim());
    form.reset();
  }

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.formInput}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.formInput} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
