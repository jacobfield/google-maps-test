export default function MapSearch({
  searchLocation,
  setSearchLocation,
  input,
  setInput,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="searchContainer">
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
// create user input form, state to handle changes, and submit
// pass these as props to MapSearch, which will render the form and handle the input
// this will be then be used as a callback function in Map component

// declare state variable for current location
// want to get user's current location, and set this as default search location
