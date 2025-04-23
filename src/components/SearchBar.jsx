function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  }
};


import { useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);


  const handleSelect = (name) => {
    setSearch(name)
  }

  const fetching = useCallback(debounce((search) => {
    const endpoint = `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${search}`
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setFilteredItems(data)
        console.log(data)
      })
      .catch(err => console.log(err))
  }, 300), [])

  useEffect(() => {
    fetching(search)
  }, [search])

  return (
    <>
      <div className="d-flex align-items-center">
        <input
          type="text"
          value={search}
          onChange={(e => setSearch(e.target.value))}
          placeholder='Cerca...'
          className='form-control w-50 mx-auto bg-light border-5 border-warning border-opacity-50 rounded shadow-sm fw-bold'
        />
        <FaSearch className="search-icon" />
      </div>
      {search && filteredItems.length > 0 && (
        <ul className="list-group">
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item.name)} className="list-group-item w-50 mx-auto d-flex align-items-center">
              <IoSearch />
              <p className="px-3 my-2">{item.name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default SearchBar
