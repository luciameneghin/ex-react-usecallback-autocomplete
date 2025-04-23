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
    <div>
      <input
        type="text"
        value={search}
        onChange={(e => setSearch(e.target.value))}
        placeholder='Cerca...'
        className='form-control w-50 mx-auto bg-light'
      />
      {search && filteredItems.length > 0 && (
        <ul className="list-group">
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item.name)} className="list-group-item w-50 mx-auto">
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
