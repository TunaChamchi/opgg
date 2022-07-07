import { Action, AnyAction, AsyncThunk,  } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import summoner from 'store/summoner';
import matches from 'store/matches';
import search from 'store/search';

import { ISummoner } from 'store/interface/ISummoner';
import { IMatches } from 'store/interface/IMatches';
import { ISearch } from 'store/interface/ISearch';

export interface State {
  summoner: ISummoner;
  matches: IMatches;
  search: ISearch;
}

const rootReducer = (state: State | undefined, action: Action | any) => {
  switch (action.type) {
    case HYDRATE:
      return action.type;


    default:
      return combineReducers({ summoner, matches, search })(state, action);
  }
};

export default rootReducer;