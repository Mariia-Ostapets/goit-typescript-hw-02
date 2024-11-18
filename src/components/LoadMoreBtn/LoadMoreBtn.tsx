import css from "./LoadMoreBtn.module.css";
import { LoadMoreBtnProps } from "./LoadMoreBtn.types";

export default function LoadMoreBtn({ onClick }:LoadMoreBtnProps) {
  return (
    <div className={css.loadMoreBtnWrapper}>
      <button className={css.loadMoreBtn} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
