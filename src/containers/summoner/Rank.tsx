import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { State } from 'store';

import styles from '/styles/Summoner.module.css'

interface RetailerInfoRTNameTabProps {
  rank: number;
}

const Rank: React.FunctionComponent<RetailerInfoRTNameTabProps> = props => {
  const { t } = useTranslation('common');
  const { rank } = props;
  const summonerInfo = useSelector((state: State) => state.summoner.summonerInfo);
  const league = summonerInfo.leagues && summonerInfo.leagues[rank];

  const tierRank = league && league.tierRank;
  const games = league && league.wins+league.losses;
  const rate = league && league.wins/games*100;

  return (
    <div className={styles.rank_contanier}>
      {
        league ? 
          <img src={tierRank.imageUrl} width={104} height={104} />
          :
          <div style={{marginLeft: 20}}><Image src={'/image/unranked.png'} width={64} height={64} /></div>
      }
      
      {
        league ? 
          <div className={styles.rank_info}>
            <span className={styles.name}>{t(`rank_${rank}`)}</span>
            <span className={styles.rank_line}>
              <Trans i18nKey='common:line_played' 
                components={{ 
                  span1: <span className={styles.font_weight_bold}/>, 
                  span2: <span className={styles.font_Helvetica}/>, 
                }}
                values={{ line: t('Top').toLowerCase(), games: games}} />
            </span>
            <span className={styles.tier}>{tierRank.tierDivision} {tierRank.shortString.replace(/[^0-9]/g, "")}</span>
            <div className={styles.rank_LP_record}>
              <span className={styles.rank_LP}>{tierRank.lp} LP</span>
              <span className={styles.rank_record}>/ {league.wins}{t('win')} {league.losses}{t('losse')}</span>
            </div>
            <span className={styles.rank_rate}><span className={styles.font_AppleSDGothicNeo}>{t('rate')}</span> {rate.toFixed(0)}%</span>
          </div>
          :
          <div className={styles.rank_info2}>
            <span className={styles.name}>{t(`rank_${rank}`)}</span>
            <span className={styles.unranked}>Unranked</span>
          </div>
      }
    </div>
  )
}

export default Rank
