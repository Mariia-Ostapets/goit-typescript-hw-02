import css from "./Loader.module.css";
import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#0000ff"
        radius="16"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}
