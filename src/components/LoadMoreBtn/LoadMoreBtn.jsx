import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.loadMoreBtnWrapper}>
      <button className={css.loadMoreBtn} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
