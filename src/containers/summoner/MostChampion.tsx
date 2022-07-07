import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

import { State } from 'store';

import styles from '/styles/Summoner.module.css'

const MostChampion = () => {
  const { t } = useTranslation('common');
  const summonerMost = useSelector((state: State) => state.summoner.summonerMost);

  // useEffect(() => {
  // }, [summonerInfo]);

  const mostItemView = () => {
    return summonerMost.map((champion, idx) =>{
      const cs = champion.cs/champion.games;
      const grade = (champion.kills+champion.assists)/champion.deaths;
      const kills = champion.kills/champion.games;
      const assists = champion.assists/champion.games;
      const deaths = champion.deaths/champion.games;
      const rate = champion.wins/champion.games*100;

      const gradeColor = grade>=6 ? '#e19205' :
        grade>=5 ? '#e19205' :
        grade>=4 ? '#1f8ecd' :
        grade>=3 ? '#2daf7f' : '';

      return (
        <div className={styles.most_item} key={idx}>
          <img className={styles.most_champoin_1} src={champion.imageUrl} width={45} height={45} />
          <div className={styles.most_champoin_2}>
            <span className={styles.most_text_1}>{t('champion_name', {...champion})}</span><br />
            <span className={styles.most_text_2}>CS {champion.cs} ({cs.toFixed(1)})</span>
          </div>
          <div className={styles.most_champoin_3}>
            <span style={{ color: gradeColor }} className={styles.most_text_1}><span className={styles.most_text_1_1}>{grade.toFixed(2)}:1</span> {t('grade')}</span><br />
            <span className={styles.most_text_2}>{kills.toFixed(1)} / {deaths.toFixed(1)} / {assists.toFixed(1)}</span>
          </div>
          <div className={styles.most_champoin_4}>
            <span className={clsx(styles.most_text_1, styles.most_text_1_1, rate>=60&&styles.rate60)}>{rate.toFixed(0)}%</span><br />
            <span className={styles.most_text_2}>{champion.games}<span className={styles.most_text_2_1}>{t('played')}</span></span>
          </div>
        </div>
      )
    })
  }

  return (
    <div className={styles.most_list}>
      {mostItemView()}
    </div>
  )
}

export default MostChampion
