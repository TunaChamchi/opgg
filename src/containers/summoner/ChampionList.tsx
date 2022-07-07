import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

import { State } from 'store';
import MostChampion from './MostChampion';
import RecentChampion from './RecentChampion';

import styles from '/styles/Summoner.module.css'

const ChampionList = () => {
  const { t } = useTranslation('common');
  const [tab, setTab] = useState(0);

  // useEffect(() => {
  // }, [tab]);

  return (
    <div className={styles.most_contanier}>
      <div className={styles.most_tabs}>
        <div className={clsx(styles.most_tab, tab===0 &&styles.most_tab_active)}
          onClick={() => setTab(0)}>
          <span>{t('Champion_Win_Ratio')}</span>
        </div>
        <div className={styles.most_tabs_hr}></div>
        <div className={clsx(styles.most_tab, tab===1 && styles.most_tab_active)}
          onClick={() => setTab(1)}>
          <span>{t('Rank_per_week')}</span>
        </div>
      </div>
      
      {
        tab === 0 ?
          <MostChampion />
          :
          <RecentChampion />
      }

    </div>
  )
}

export default ChampionList
