export function LHS({ data }) {
  return (
    <div className="lhs">
      <CurrentSummarySection
        currentConditions={data.currentConditions}
        resolvedAddress={data.resolvedAddress}
      />
      <h4>7 Days Forecast</h4>
      <Forcast7Days daysData={data.days} />
    </div>
  );
}
function CurrentSummarySection({ currentConditions, resolvedAddress }) {
  return (
    <section className="section current-summary-section">
      <main>
        <div>
          <p>Current</p>
          <h1>{currentConditions.temp}°C</h1>
          <p>{currentConditions.conditions}</p>
        </div>
        <img
          className="icon"
          src={`./icons/${currentConditions.icon}.svg`}
          alt={`${currentConditions.icon}`}
        />
      </main>
      <div>
        <p>📍 {resolvedAddress?.split(`,`).join(` /  `)}</p>
        <p>
          🗓️{' '}
          {new Intl.DateTimeFormat(`en-US`, { dateStyle: `full` }).format(
            new Date(Date.now())
          )}
        </p>
      </div>
    </section>
  );
}
function Forcast7Days({ daysData }) {
  // prettier-ignore
  const weekdays = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];

  return (
    <section className="section forcast-7-days-section">
      <div>
        {daysData.slice(1, 8).map(data => (
          <div className="day-summary" key={data.datetimeEpoch}>
            <div>{weekdays[new Date(data.datetimeEpoch * 1000).getDay()]}</div>
            <img
              className="icon"
              src={`./icons/${data.icon}.svg`}
              alt={`${data.icon}'s icon`}
            />
            <div>
              <span>{Math.round(data.tempmax)}°C</span>/{' '}
              {Math.round(data.tempmin)}°C
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
