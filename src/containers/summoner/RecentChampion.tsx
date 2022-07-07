import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

import { State } from 'store';

import styles from '/styles/Summoner.module.css'

const RecentChampion = () => {
  const { t } = useTranslation('common');
  const summonerRecent = useSelector((state: State) => state.summoner.summonerRecent);

  // useEffect(() => {
  // }, [summonerInfo]);

  const recentItemView = () => {
    return summonerRecent.map((champion, idx) => 
      <div className={styles.recent_item}>
        <img className={styles.recent_champoin_1} src={champion.imageUrl} width={32} height={32} />
        <div className={styles.recent_champoin_2}>
          <span className={styles.recent_text_1}>{t('champion_name', {...champion})}</span>
        </div>
        <div className={styles.recent_champoin_3}>
          <span className={styles.recent_text_2}>{(champion.wins/(champion.wins+champion.losses)*100).toFixed(0)}%</span>
        </div>
        <div className={styles.recent_champoin_4}>
          <div className={styles.recent_right}>
            <span className={styles.recent_text_3}>{champion.wins}<span className={styles.recent_text_4}>{t('win')}</span></span>
          </div>
          <span className={styles.recent_text_3}>{champion.losses}<span className={styles.recent_text_4}>{t('losse')}</span></span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.recent_list}>
      {recentItemView()}
    </div>
  )
}

export default RecentChampion
