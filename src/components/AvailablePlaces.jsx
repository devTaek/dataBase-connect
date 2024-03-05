import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  // HTTP 요청을 보낼땐 대부분 state(상태)와 도착할 데이터만 관리하지 않는다.
  // 1. fetching 하려는 데이터를 저장하는 것 (availablePlaces)
  // 2. 사용자에게 현재 데이터가 fetching 중이라고 알려주는 것 (isFetching)
  // 3. 발생할 수 있을만한 에러를 화면에 띄우는 것 (error)

  const [isFetching, setIsFetching] = useState(false);

  // Todo : Fetch available places from backend API
  // 임시 백엔드 서버로부터 fetch되는 것.
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // 에러가 발생했을 때 나타내는 상태
  const [error, setError] = useState();
  // 데이터가 준비되면 상태를 업데이트 해준다.
  // 그러면 UI가 다시 렌더링되어 업데이트 된다.

  // useEffect는 컴포넌트가 실행되면 즉시 실행한다.
  useEffect(()=>{
    /* 
    .then((response)=> {
      return response.json();
    })
    .then((resData)=> {
      return setAvailablePlaces(resData.places);
    })
    */
    async function fetchPlaces() {
      setIsFetching(true);
      
      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();
  
        // HTTP 요청했을때 발생하는 에러대처법
        // ok메서드 : 성공(true) - 200~300 / 실패(false) - 400~500
        if(!response.ok) {
          throw new Error('Failed to fetch places');
        }

        setAvailablePlaces(resData.places)
      } catch(error) {
        setError({message: error.message || 'Could not fetch places, please try again later.'})
      }
      

      setIsFetching(false);
    }

    fetchPlaces();
  },[]) // 컴포넌트가 실행되고 나서 딱 한번만 실행. 무한루프 방지

  if(error) {
    return <Error title="An error occurred!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
