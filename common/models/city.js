import {
  getCity
} from '../services/city';

export default {
  namespace: 'city',
  state: {
  	city_list:[],
  	status:"-1"
  },
  reducers: {
    getCitySuccess(state, { payload }) {
    	console.log("getCitySuccess")
      return payload;
    },
  },
  effects: {
    *getCity({payload}, { call, put }) {
    	console.dir(payload)
      const result = yield call(getCity,payload);
      yield put({
        type: 'getCitySuccess',
        payload: result,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/city') {
          dispatch({ type: 'getCity', payload: {query_type:0} });
        }
      });
    },
  }
}
