export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();

  // HTTP 요청했을때 발생하는 에러대처법
  // ok메서드 : 성공(true) - 200~300 / 실패(false) - 400~500
  if(!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return resData.places;
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json();

  // HTTP 요청했을때 발생하는 에러대처법
  // ok메서드 : 성공(true) - 200~300 / 실패(false) - 400~500
  if(!response.ok) {
    throw new Error('Failed to fetch user places');
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places',{
    method: 'PUT',
    body: JSON.stringify({places: places}),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const resData = await response.json();
  if(!response.ok) {
    throw new Error('Failed to update user data.')
  }

  return resData.message;
}