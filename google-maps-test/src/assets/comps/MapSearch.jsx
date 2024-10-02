export default function MapSearch({
  input,

  handleChange,
  handleSubmit,
  handleEnter,
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
        <input
          className="formInputBox"
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
