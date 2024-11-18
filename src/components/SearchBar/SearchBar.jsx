import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

export default function SearchBar({ onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const query = form.elements.query.value;
    if (form.elements.query.value.trim() === "") {
      toast.error("Please enter search term!", { position: "top-right" });
      return;
    }
    onSearch(query);
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
