import { Puff } from 'react-loader-spinner';

export function Loader() {
  return (
    <Puff
      wrapperStyle={{
        height: `80vh`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
      }}
      color="#4f88df"
    />
  );
}
