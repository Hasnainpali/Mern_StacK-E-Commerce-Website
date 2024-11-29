import { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { fetchDataFormApi } from "./utility/Api";
import { UserContext } from "./Context Api/UserAuthContext";
import "./TopBar.css";

const SearchBar = () => {
  const [searchField, setSerchField] = useState("");
  const { setSearchData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const debounceSearch = useCallback(
    _.debounce((query) => {
      fetchDataFormApi(`/api/search?q=${query}`)
        .then((res) => console.log(res)) // Handle as required
        .catch((error) => console.error(error));
    }, 500),
    []
  );

  const onChangeValue = (e) => {
    const value = e.target.value;
    setSerchField(value);
    debounceSearch(value);
  };

  const searchProduct = () => {
    if (!searchField.trim()) return;
    setIsLoading(true);
    fetchDataFormApi(`/api/search?q=${searchField}`)
      .then((res) => {
        setIsLoading(false);
        setSearchData(res);
        setSerchField("");
        navigate(`/product?search=${encodeURIComponent(searchField)}`);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={searchField}
        onChange={onChangeValue}
        placeholder="Search for products..."
      />
      <div
        className="input-group-append"
        onClick={searchProduct}
        disabled={isLoading}
      >
        <span className="input-group-text bg-transparent text-primary">
          <i className="fa fa-search"></i>
        </span>
      </div>
      {/* <button onClick={searchProduct} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button> */}
    </div>
  );
};
export default SearchBar;
