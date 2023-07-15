import { useEffect, useState } from 'react';
// import testData from './test.json';
import { Loader } from './Loader';
import { Header } from './Header';
import { LHS } from './LHS';
import { RHS } from './RHS';

const API_KEY = `3J6J8DJ7ZRTCFRMYBCYWKJ3FK`;

export default function App() {
  const [query, setQuery] = useState(``);
  const [data, setData] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [city, setCity] = useState();

  useEffect(function () {
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
  }, []);

  useEffect(
    function () {
      if (query) setCity(query);
    },
    [query]
  );

  useEffect(
    function () {
      const controller = new AbortController();
      async function getData() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`,
            { signal: controller.signal }
          );

          if (res.status === 400) {
            throw new Error(`Error Code 400`);
          }

          const data = await res.json();

          setData(data);

          console.log(data);
          // setData(data);
        } catch (err) {
          // console.log(typeof err.message);
          if (!err.message.includes(`400`)) console.error(err);
        } finally {
          setIsLoading(false);
        }
      }

      if (city) getData();

      return function () {
        controller.abort();
      };
    },
    [city]
  );

  return (
    <div className="container">
      <Header query={query} setQuery={setQuery} />

      {!data ? (
        ``
      ) : isloading ? (
        <Loader />
      ) : (
        <div className="main-content">
          <LHS data={data} />
          <RHS data={data} />
        </div>
      )}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; Copyright 2023 aks1184. All rights Reserved.</p>
      <a href="https://github.com/ayush1184">Github</a>
    </footer>
  );
}
