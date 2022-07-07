import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { getCookie , setCookie } from 'cookies-next';

import * as api from 'lib/api';
import { ISummonerInfo } from 'store/interface/ISummoner';
import { ISearch } from 'store/interface/ISearch';

// Action Types
const name = "SEARCH";

// Action Creators
export const getSummonerInfo = createAsyncThunk<ISearch, string | string[]>(
  `${name}/summonerInfo`,
  async (summonerName: string | string[]) => {
    const response = await api.summonerInfo(summonerName);
    return response.data
  }
)

// Initial
const summonerInfo: ISummonerInfo = {
  name: '',
  level: 0,
  profileImageUrl: '',
  profileBorderImageUrl: '',

  previousTiers: [],
  ladderRank: {tierRank:[]},
  leagues: [],
}
const initialState: ISearch = {
  loading: false,
  error: false,
  message: '',

  searchSummoners: [],
  recentSummoners: [],
  favoriteSummoners: [],
};

// Reducer
const searchSlice = createSlice({
  name,
  initialState,
  reducers: {
    getRecent: (state) => {
      const recent = JSON.parse(getCookie('recent')?.toString() ?? '[]');
      state.recentSummoners = recent;
    },
    setRecent: (state, action) => {
      if (!state.recentSummoners.find((summoner) => summoner === action.payload)) {
        state.recentSummoners.push(action.payload);
      }

      setCookie('recent', JSON.stringify(state.recentSummoners));
    },
    deleteRecent: (state, action) => {
      _.remove(state.recentSummoners, (summoner) => summoner === action.payload);

      setCookie('recent', JSON.stringify(state.recentSummoners));
    },
    getFavorite: (state) => {
      const favorite = JSON.parse(getCookie('favorite')?.toString() ?? '[]');
      state.favoriteSummoners = favorite;
    },
    setFavorite: (state, action) => {
      if (!state.favoriteSummoners.find((summoner) => summoner === action.payload)) {
        state.favoriteSummoners.push(action.payload);
      }

      setCookie('favorite', JSON.stringify(state.favoriteSummoners));
    },
    deleteFavorite: (state, action) => {
      _.remove(state.favoriteSummoners, (summoner) => summoner === action.payload);

      setCookie('favorite', JSON.stringify(state.favoriteSummoners));
    },
  },
  extraReducers: {
    [getSummonerInfo.pending.type]: (state, action) => { // 호출 전
      // console.log(getSummonerInfo.pending.type, action);
      state.loading = true;
    },
    [getSummonerInfo.fulfilled.type]: (state, action) => { // 성공
      console.log(getSummonerInfo.fulfilled.type, action);
      state.loading = false;
      
      state.searchSummoners = [action.payload.summoner];
      
      // console.log('summonerInfo', state.summonerInfo);
    },
    [getSummonerInfo.rejected.type]: (state, action) => {  // 실패
      // console.log(getSummonerInfo.rejected.type, action);
      state.error = true;
      state.message = '';
      state.loading = false;
    },
  }
});

export const { 
  getRecent, setRecent, deleteRecent, 
  getFavorite, setFavorite, deleteFavorite
} = searchSlice.actions;

export default searchSlice.reducer;