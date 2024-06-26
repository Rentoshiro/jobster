import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, clearFilters } from "../features/allJobs/allJobsSlice";
import { useState, useMemo } from "react";

function SearchContainer() {
  const [localSearch, setLocalSearch] = useState("");
  const { isLoading, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  };

  const optimizedDebounce = useMemo(() => {
    const debounceFunction = () => {
      let timeoutID;
      return (e) => {
        setLocalSearch(e.target.value);
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          dispatch(
            handleChange({ name: e.target.name, value: e.target.value })
          );
        }, 1000);
      };
    };
    return debounceFunction();
  }, [dispatch, setLocalSearch]);

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            handleChange={handleSearch}
            value={searchStatus}
            list={["all", ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer;
