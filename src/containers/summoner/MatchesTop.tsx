import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import clsx from 'clsx';
import _ from 'lodash';
import useTranslation from 'next-translate/useTranslation';

import { State } from 'store';
import { setGameType } from 'store/matches';

import styles from '/styles/Summoner.module.css'

const MatchesTop = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  
  const [tab, setTab] = useState(0);
  const [games, setGames]: any[] = useState([]);
  const [summary, setSummary]: any = useState({});
  const [champions, setChampions]: any[] = useState([]);
  const [positions, setPositions]: any[] = useState([]);

  const store_games = useSelector((state: State) => state.matches.games);
  const store_summary = useSelector((state: State) => state.matches.summary);
  const store_champions = useSelector((state: State) => state.matches.champions);
  const store_positions = useSelector((state: State) => state.matches.positions);

  useEffect(() => {
    dispatch(setGameType(tab));

    setPositions(store_positions);
    if (tab === 0) {
      setGames(store_games);
      setSummary(store_summary);
      setChampions(store_champions);
    } else if (tab === 1) {
      const _games = _.filter(store_games, (game) => game.gameType==="솔랭");
      const _summary = {
        wins: _.filter(_games, (game) => game.isWin).length,
        losses: _.filter(_games, (game) => !game.isWin).length,
        kills: _.reduce(_games, (sum, game) => sum+game.stats.general.kill, 0),
        deaths: _.reduce(_games, (sum, game) => sum+game.stats.general.death, 0),
        assists: _.reduce(_games, (sum, game) => sum+game.stats.general.assist, 0),
      }
      setSummary(_summary);
    } else if (tab === 2) {
      const _games = _.filter(store_games, (game) => game.gameType==="자유 5:5 랭크");
      const _summary = {
        wins: _.filter(_games, (game) => game.isWin).length,
        losses: _.filter(_games, (game) => !game.isWin).length,
        kills: _.reduce(_games, (sum, game) => sum+game.stats.general.kill, 0),
        deaths: _.reduce(_games, (sum, game) => sum+game.stats.general.death, 0),
        assists: _.reduce(_games, (sum, game) => sum+game.stats.general.assist, 0),
      }
      setSummary(_summary);
    }
  }, [tab, store_games]);

  const summaryView = () => {
    const games = summary.wins+summary.losses;
    const grade = (summary.kills+summary.assists)/summary.deaths;
    const kills = summary.kills/games;
    const assists = summary.assists/games;
    const deaths = summary.deaths/games;
    const rate = summary.wins/games*100;
  
    const gradeColor = grade>=6 ? '#e19205' :
      grade>=5 ? '#e19205' :
      grade>=4 ? '#1f8ecd' :
      grade>=3 ? '#2daf7f' : '#353a3a';

    return (
      <div className={styles.matches_top_stats_1}>
        <div className={styles.matches_top_summary_1}>
          {games}{t('game')} {summary.wins}{t('win')} {summary.losses}{t('losse')}
        </div>
        <div className={styles.matches_top_summary_2}>
          <div style={{background: 'conic-gradient(var(--coral) 0% '+(100-rate)+'%, var(--bluish) '+(100-rate)+'% 100%)'}}
            className={styles.matches_top_summary_chart}>
            <div className={styles.matches_top_summary_chart_inner}>
              <div className={styles.matches_top_summary_chart_text}>
                {rate.toFixed(0)}<span className={styles.font_weight_normal}>% </span>
              </div>
            </div>
          </div>
          <div className={styles.matches_top_summary_detail}>
            <div className={styles.matches_top_summary_detail_1}>
              <span>{kills.toFixed(1)}</span>
              <span className={styles.matches_top_summary_detail_1_dash}> / </span>
              <span className={styles.matches_top_summary_detail_1_death}>{deaths.toFixed(1)}</span>
              <span className={styles.matches_top_summary_detail_1_dash}> / </span>
              <span>{assists.toFixed(1)}</span>
            </div>
            <div className={styles.matches_top_summary_detail_2}>
              <span style={{ color: gradeColor }} className={styles.matches_top_summary_detail_2_grade}>{grade.toFixed(2)}</span>
              <span style={{ color: gradeColor }} >:1</span>
              <span className={styles.matches_top_summary_detail_2_rate}> ({rate.toFixed(0)}%)</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const championsView = () => [0, 1, 2].map((_, index) => {
    const champion = champions[index];
    if (champion) {
      const rate = champion.wins/champion.games*100;
      const grade = (champion.kills+champion.assists)/champion.deaths;
  
      const rateColor = rate>=60 ? '#c6443e' : '';
      const gradeColor = grade>=6 ? '#e19205' :
        grade>=5 ? '#e19205' :
        grade>=4 ? '#1f8ecd' :
        grade>=3 ? '#2daf7f' : '';

      return (
        <div className={styles.matches_top_champon}>
          <img className={styles.matches_top_champon_logo} src={champion.imageUrl} alt={champion.key} width={34} height={34} />
          <div className={styles.matches_top_champon_right}>
            <div className={styles.matches_top_champon_name}>{t('champion_name', {...champion})}</div>
            <div className={styles.matches_top_champon_stats}>
              <div style={{ color: rateColor }}>
                {rate.toFixed(0)}<span className={styles.font_weight_normal}>% </span>
                <span className={styles.matches_top_champon_text}>
                  ({champion.wins}<span className={styles.font_AppleSDGothicNeo}>{t('win')}</span> 
                  {champion.losses}<span className={styles.font_AppleSDGothicNeo}>{t('losse')}</span>)
                </span>
              </div>
              <div className={styles.matches_top_champon_stats_hr}></div>
              <span style={{ color: gradeColor }}>{grade.toFixed(2)} {t('grade')}</span>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={styles.matches_top_champon}>
          <Image className={styles.matches_top_champon_logo} src={'/image/group.svg'} alt={'none'} width={34} height={34} />
          <div className={styles.matches_top_champon_right}>{t('not_champion')}</div>
        </div>
      )
    }
  })
  const positionsView = () => positions.map((position: any) => {
    const playRate = position.games/games.length*100;
    const rate = position.wins/position.games*100;

    if (position.games) {
      return (
        <div className={styles.matches_top_position}>
          <Image src={'/image/icon-mostposition-'+position.position+'.svg'} width={28} height={28} />
          <div className={styles.matches_top_position_right}>
            <div className={styles.matches_top_position_name}>{t(position.positionName)}</div>
              <div className={styles.matches_top_position_stats}>
                <span className={styles.matches_top_position_stats_playRate}>
                  {playRate.toFixed(0)}<span className={styles.font_weight_normal}>%</span>
                </span>
                <div className={styles.matches_top_position_stats_hr}></div>
                <span className={styles.matches_top_position_stats_rate}>
                  <span className={styles.font_weight_normal}>Win Rate </span>
                  <span className={styles.matches_top_position_stats_rate_2}>
                    {rate.toFixed(0)}
                    <span className={styles.font_weight_normal}>%</span>
                  </span>
                </span>
              </div>
          </div>
        </div>
      )
    }
  })

  return (
    <div className={styles.matches_top_contanier}>
      <div className={styles.matches_top_tabs}>
        <div className={clsx(styles.matches_top_tab, tab===0&&styles.matches_top_tab_active)}
          onClick={() => setTab(0)}>
          <span>{t('total')}</span>
        </div>
        <div className={clsx(styles.matches_top_tab, tab===1&&styles.matches_top_tab_active)}
          onClick={() => setTab(1)}>
          <span>{t('ranked_solo')}</span>
        </div>
        <div className={clsx(styles.matches_top_tab, tab===2&&styles.matches_top_tab_active)}
          onClick={() => setTab(2)}>
          <span>{t('ranked_flex')}</span>
        </div>
      </div>
      <div className={styles.matches_top_stats}>
        {summaryView()}
        <div className={styles.matches_top_stats_2}>
          {championsView()}
        </div>
        <div className={styles.matches_top_stats_3}>
          <div className={styles.matches_top_positionTitle}>{t('preferred_position')}</div>
          {positionsView()}
        </div>
      </div>
    </div>
  )
}

export default MatchesTop
