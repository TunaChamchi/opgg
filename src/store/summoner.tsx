import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as api from 'lib/api';
import { ISummoner } from 'store/interface/ISummoner';

// Action Types
const name = "SUMMONER";

// Action Creators
export const getSummonerInfo = createAsyncThunk<ISummoner, string | string[]>(
  `${name}/summonerInfo`,
  async (summonerName: string | string[]) => {
    const response = await api.summonerInfo(summonerName);
    return response.data
  }
)
export const getSummonerMost = createAsyncThunk<ISummoner, string | string[]>(
  `${name}/summonerMost`,
  async (summonerName: string | string[]) => {
    const response = await api.summonerMost(summonerName);
    return response.data
  }
)

// Initial
const initialState: ISummoner = {
  loading: false,
  error: false,
  message: '',

  name: '',
  summonerInfo: {
    name: '',
    level: 0,
    profileImageUrl: '',
    profileBorderImageUrl: '',
  
    previousTiers: [],
    ladderRank: {tierRank:[]},
    leagues: [],
  },
  summonerMost: [],
  summonerRecent: [],
};

// Reducer
const summonerSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getSummonerInfo.pending.type]: (state, action) => { // 호출 전
      // console.log(getSummonerInfo.pending.type, action);
      state.loading = true;
    },
    [getSummonerInfo.fulfilled.type]: (state, action) => { // 성공
      // console.log(getSummonerInfo.fulfilled.type, action);
      state.loading = false;
      
      state.summonerInfo = action.payload.summoner;
      
      // console.log('summonerInfo', state.summonerInfo);
    },
    [getSummonerInfo.rejected.type]: (state, action) => {  // 실패
      // console.log(getSummonerInfo.rejected.type, action);
      state.error = true;
      state.message = '';
      state.loading = false;
    },

    [getSummonerMost.pending.type]: (state, action) => { // 호출 전
      // console.log(getSummonerInfo.pending.type, action);
      state.loading = true;
    },
    [getSummonerMost.fulfilled.type]: (state, action) => { // 성공
      // console.log(getSummonerInfo.fulfilled.type, action);
      state.loading = false;
      
      state.summonerMost = _.sortBy(action.payload.champions, (c) => (c.games));
      state.summonerRecent = _.sortBy(action.payload.recentWinRate, (r) => r.wins + r.losses);

      // console.log('summonerMost', state.summonerMost);
      // console.log('summonerRecent', state.summonerRecent);
    },
    [getSummonerMost.rejected.type]: (state, action) => {  // 실패
      // console.log(getSummonerInfo.rejected.type, action);
      state.error = true;
      state.message = '';
      state.loading = false;
    },
  }
});



export default summonerSlice.reducer;