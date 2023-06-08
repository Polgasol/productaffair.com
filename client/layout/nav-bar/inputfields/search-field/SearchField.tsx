import React, { FC, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import SearchBtn from "../../buttons/search-btn/SearchBtn";
import styles from "./SearchField.module.scss";

export const SearchField: FC = () => {
  const searchRef: any = useRef(null);
  const router = useRouter();
  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      router.push(`/search?query=${searchRef.current.value}`); 
    },
    [searchRef]
  );
  return (
    <form
      className={styles["search-form"]}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
    >
      <input
        type="text"
        className={styles["search-form__input"]}
        placeholder="Search here..."
        ref={searchRef}
      />
      <SearchBtn />
    </form>
  );
};

export default SearchField;
