import { put, takeEvery, all, call, take } from 'redux-saga/effects'
import { theUrl, tokenHeaders } from 'selfConfig'


// Fetch data generate list
function* fetechHome() {
  const url = 'http://localhost:5000/commodityList';
  const payload = yield fetch(url).then( res => res.json() )
  yield put({type: 'HOME_INIT_SUCCESS', payload: payload })
}
function* watchFetechHome() {
    yield takeEvery('HOME_INIT', fetechHome)
}

// Fetch data for userProfile
function* watchFetchProfile() {
  yield takeEvery('GET_PROFILE', fetchProfile)
}

function* fetchProfile(action) {
  const url = theUrl + '/userProfile'
  const payload = yield fetch(url, {
    headers: tokenHeaders(localStorage.getItem("token")),
    method: 'POST',
    body: JSON.stringify({
      username: action.username
    })
  }).then( res => res.json() )
  
  // case res will return an ArrayBuffer, so the first item in array is what I WebAuthentication
  // payload: payload[0]
  yield put({ type: 'GET_PROFILE_SUCCESS', payload: payload[0] })
}

export default function* rootSaga() {
  yield all([
    watchFetechHome(),
    watchFetchProfile()
  ])
}