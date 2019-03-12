import { put, takeEvery, all, call } from 'redux-saga/effects'
export function* helloSaga() {
	console.log('Hello Sagas!')
}

// Test redux-saga fetech data
const url = 'http://localhost:5000/commodityList';
function* fetechTest() {
    const payload = yield fetch(url).then( res => res.json() )
    yield put({type: 'TEST_INIT_SUCCESS', payload: payload })
}

function* watchFetechTest() {
    yield takeEvery('TEST_INIT', fetechTest)
}


export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchFetechTest()
  ])
}