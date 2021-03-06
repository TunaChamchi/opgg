import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import styles from '/styles/Summoner.module.css'

import { State } from 'store';

import SummonerProfile from 'containers/summoner/SummonerProfile';
import Rank from 'containers/summoner/Rank';
import ChampionList from 'containers/summoner/ChampionList';
import MatchesTop from 'containers/summoner/MatchesTop';
import Matches from 'containers/summoner/Matches';

import { useAppDispatch } from 'lib/hook';
import { getSummonerInfo, getSummonerMost } from 'store/summoner';
import { getSummonerMatch, getSummonerMatchDetail } from 'store/matches';
import { setRecent } from 'store/search';

const Summoner: NextPage = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale = useRouter().query.locale;
  const summonerName = useRouter().query.summonerName;
  const summonerMatches = useSelector((state: State) => state.matches.games);
  
  useEffect(() => {
    dispatch(setRecent(summonerName));
  }, []);

  useEffect(() => {
    if (!summonerName) return;
    // console.log(summonerName);
    dispatch(getSummonerInfo(summonerName));
    dispatch(getSummonerMost(summonerName));
    dispatch(getSummonerMatch(summonerName));
  }, [summonerName]);

  useEffect(() => {
    if (summonerMatches.length > 0) {
      summonerMatches.forEach(game => {
        dispatch(getSummonerMatchDetail({summonerName, gameId: game.gameId}))
      }
        // summonerMatchDetail(summonerName, game.gameId)
        //   .then(response => {
        //     const teams = response.data.teams;
        //     // game = {
        //     //   ...game,
        //     //   teams
        //     // };
        //     dispatch(getSummonerMatchDetail({
        //       gameId: game.gameId,
        //       teams
        //     }));
        //   })
      )
    }
  }, [summonerMatches]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{summonerName} - {t('summoner_title')}</title>
      </Head>

      <main className={styles.main}>
        <SummonerProfile />
        <div className={styles.hr} />
        <div className={styles.layout}>
          <div className={styles.layout_sub}>
            <Rank rank={0} />
            <Rank rank={1} />
            <ChampionList />
          </div>
          <div className={styles.layout_sub}>
            <MatchesTop />
            <Matches />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Summoner
