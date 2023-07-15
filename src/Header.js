import PosSVG from './Position-svg.svg';

export function Header({ query, setQuery }) {
  return (
    <header className="header">
      <Logo />
      <Options query={query} setQuery={setQuery} />
    </header>
  );
}
function Logo() {
  return (
    <div className="logo">
      <img src="./weather-symbol-1-svgrepo-com.svg" alt="App Logo" />
      <h1>Weatherly</h1>
    </div>
  );
}
function Options({ query, setQuery }) {
  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        (async function () {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          );

          const data = await res.json();

          setQuery(data.display_name.split(`,`).at(0));
          console.log(data);
        })();
      },
      err => console.error(err)
    );
  }

  return (
    <div className="options">
      <input
        type="text"
        value={query}
        placeholder="Search city..."
        onChange={e => setQuery(e.target.value)}
      />
      <button className="btn" onClick={getLocation}>
        <img src={PosSVG} alt="position pin" /> Get Location
      </button>
    </div>
  );
}
