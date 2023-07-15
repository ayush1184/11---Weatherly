export function RHS({ data }) {
  return (
    <div className="rhs">
      <h3>Today's Forecast</h3>
      <TodaysForecastSection currentConditions={data?.currentConditions} />
      <h3>Today At</h3>
      <TodaysHourForecastSection todayData={data.days.at(0)} />
    </div>
  );
}
function TodaysForecastSection({ currentConditions }) {
  return (
    <section className="section today-forecast-section">
      <TodaysPartsTab>
        {[`dust-day`, `uv-index`]}
        <h4>Feels Like & UV Index</h4>
        {[`${currentConditions.feelslike}°C`, currentConditions.uvindex]}
      </TodaysPartsTab>
      <TodaysPartsTab>
        {[`sunrise`, `sunset`]}
        <h4>Sunrise & Sunset</h4>
        {[
          `${currentConditions.sunrise?.slice(0, 5)} h`,
          `${currentConditions.sunset?.slice(0, 5)} h`,
        ]}
      </TodaysPartsTab>
      <TodaysPartsTab>
        {[`humidity`, `pressure-low`]}
        <h4>Humidity & Pressure</h4>
        {[
          `${currentConditions.humidity} %`,
          `${currentConditions.pressure} Pa`,
        ]}
      </TodaysPartsTab>
      <TodaysPartsTab>
        {[`horizon`, `wind`]}
        <h4>Visiblity & Windspeed</h4>
        {[
          `${currentConditions.visibility} km`,
          `${currentConditions.windspeed} km/h`,
        ]}
      </TodaysPartsTab>
    </section>
  );
}
function TodaysPartsTab({ children }) {
  return (
    <div className="today-part">
      {children.at(1)}
      <div className="today-part-container">
        <div>
          <img
            src={`./icons/${children.at(0).at(0)}.svg`}
            alt={`${children.at(0).at(0)} icon`}
          />
          <div>
            <p>{`${children.at(1).props.children.split(`&`).at(0)}`}</p>
            <p>{`${children?.at(2)?.at(0)}`}</p>
          </div>
        </div>
        <div>
          <img
            src={`./icons/${children.at(0).at(1)}.svg`}
            alt={`${children.at(0).at(1)} icon`}
          />
          <div>
            <p>{`${children.at(1).props.children.split(`&`).at(1)}`}</p>
            <p>{`${children?.at(2)?.at(1)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function TodaysHourForecastSection({ todayData }) {
  return (
    <div>
      {todayData.hours.map(hourData => (
        <div className="section" key={hourData.datetimeEpoch}>
          <img
            alt={`${hourData.icon} icon`}
            src={`./icons/${hourData.icon}.svg`}
          />
          <p>{hourData.temp}°C</p>
          <p>{hourData.datetime.slice(0, 5)} h</p>
        </div>
      ))}
    </div>
  );
}
