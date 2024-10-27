import { useId } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

import css from "./SearchBox.module.css";
import "./SearchWithClear.css";

const SearchBox = () => {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const value = e.target.value;

    dispatch(changeFilter(value));
  };

  const searchTextId = `searchTextId:${useId()}`;

  return (
    <form className={css.form} id="searchBox">
      <label className={css.label} htmlFor={searchTextId}>
        Search Contacts (by name)
      </label>
      <div className={css["input-container"]}>
        <input
          type="text"
          value={filter}
          id={searchTextId}
          onChange={handleFilterChange}
          placeholder="Enter name ..."
        />
      </div>
    </form>
  );
};

export default SearchBox;
