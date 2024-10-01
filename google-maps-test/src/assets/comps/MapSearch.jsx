export default function MapSearch({
  searchLocation,
  setSearchLocation,
  input,
  setInput,
  handleChange,
  handleSubmit,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30hv",
        padding: "10px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        label="mapLocationSearchForm"
        id="mapLocationSearchForm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input type="text" value={input} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
