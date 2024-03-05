import { useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  // Todo : Fetch available places from backend API
  // 임시 백엔드 서버로부터 fetch되는 것.

  const [availablePlaces, setAvailablePlaces] = useState([]);

  // 데이터가 준비되면 상태를 업데이트 해준다.
  // 그러면 UI가 다시 렌더링되어 업데이트 된다.
  

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
