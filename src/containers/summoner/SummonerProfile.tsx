import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { State } from 'store';

import styles from '/styles/Summoner.module.css'

const SummonerProfile = () => {
  const { t } = useTranslation('common');
  const summonerInfo = useSelector((state: State) => state.summoner.summonerInfo);

  useEffect(() => {
    //console.log('summonerInfo', summonerInfo);
  }, [summonerInfo]);
  
  const previousTiersView = () => {
    const previousTiers = summonerInfo.previousTiers;
    
    return previousTiers.map((tier, idx) => 
      <div className={styles.summoner_season}>
        <span className='Text-Style-5'>S{tier.season}</span><span className='Text-Style-6'> {tier.tier}</span>
      </div>
    )
  }

  //console.log('summonerInfo', summonerInfo);
  return (
    <div className={styles.summoner_contanier}>
      <div className={styles.summoner_seasons}>
        {previousTiersView()}
      </div>
      <div className={styles.summoner_profile}>
        <div className={styles.summoner_thumnail}>
          <img className={styles.summoner_thumnail_img} src={summonerInfo.profileImageUrl} alt="profileImageUrl" width={100} height={100} />
          <img className={styles.summoner_thumnail_border} src={summonerInfo.profileBorderImageUrl} alt="profileBorderImageUrl" width={120} height={120} />
          <div className={styles.summoner_thumnail_levelBox}><span>{summonerInfo.level}</span></div>
        </div>
        <div className={styles.summoner_info}>
          <span className='Text-Style-3'>{summonerInfo.name}</span>
          <br />
          {
            summonerInfo.ladderRank ?
              <span className='Text-Style-4'>
                <Trans i18nKey='common:ladder_rank' components={{ span: <span className='Text-Style-5'/>, }} values={{ rank: summonerInfo.ladderRank.rank }} />
                (<Trans i18nKey='common:of_top' components={{ span: <span className='Text-Style-6'/>, }} values={{ percent: summonerInfo.ladderRank.rankPercentOfTop }} />)
              </span>
              :
              ''
          }
        </div>
      </div>
    </div>
  )
}

export default SummonerProfile
