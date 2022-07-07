import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Link from 'next/link'
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

import { State } from 'store';
import { useAppDispatch } from 'lib/hook';
import { ISummonerInfo } from 'store/interface/ISummoner';
import { getSummonerInfo, getRecent, deleteRecent, getFavorite, setFavorite, deleteFavorite } from 'store/search';

import styles from '/styles/Banner.module.css'

const Banner = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
	const router = useRouter();

  const searchSummoners = useSelector((state: State) => state.search.searchSummoners);
  const recentSummoners = useSelector((state: State) => state.search.recentSummoners);
  const favoriteSummoners = useSelector((state: State) => state.search.favoriteSummoners);

  const [fouce, setFouce] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [tab, setTab] = useState(0);
  
  useEffect(() => {
    setTab(0);
    setFouce(false);
    setSearchName('');
    dispatch(getRecent());
    dispatch(getFavorite());
  }, [router]);

  useEffect(() => {
    if (!!searchName && searchName !== '') {
      console.log('searchName', searchName)
      dispatch(getSummonerInfo(searchName));
    }
  }, [searchName]);

  const onChangeLocale = (lang: string) => {
    console.log('router', router);
    console.log('router.pathname', router.pathname);
    router.push(router.asPath, router.asPath, { locale: lang });
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFouce(true);
    setSearchName(event.target.value);
  }
  const onFocus = () => {
    setTab(0);
    setFouce(true);
    console.log('onFocus');
  }
  const onBlur = () => {
    setFouce(false);
  }

  const searchSummonerView = () => searchSummoners.map((summoner: ISummonerInfo) => {
    const tierRank = summoner.leagues && summoner.leagues[0].tierRank && summoner.leagues[0].tierRank;

    return (
      <Link href={'/summoners/'+encodeURIComponent(summoner.name)}>
        <a className={styles.summoner} >
          <img src={summoner.profileImageUrl} width={36} height={36} />
          <div>
            <div className={styles.name}>{summoner.name}</div>
            <div className={styles.leagues}>{tierRank.tierDivision} {tierRank.shortString.replace(/[^0-9]/g, "")} - {tierRank.lp}LP</div>
          </div>
        </a>
      </Link>
    )
  })

  const recentSummonerView = () => {
    switch(tab) {
      case 0:
        return recentSummoners.map((summoner) =>
          <Link href={'/summoners/'+encodeURIComponent(summoner)}>
            <a className={styles.summoner}>
              <div className={styles.name}>
                {summoner}
              </div>
              {
                favoriteSummoners.find(_summoner => _summoner===summoner) ?
                  <img 
                    className={styles.favorite} 
                    onClick={(event) => {event.preventDefault();dispatch(deleteFavorite(summoner));}}
                    src={'https://s-lol-web.op.gg/images/icon/icon-bookmark-on-yellow.svg'} 
                    height={24} width={24} />
                  :
                  <img 
                    className={styles.favorite} 
                    onClick={(event) => {event.preventDefault();dispatch(setFavorite(summoner));}}
                    src={'https://s-lol-web.op.gg/images/icon/icon-bookmark.svg'} 
                    height={24} width={24} />
              }
              <img 
                className={styles.remove} 
                onClick={(event) => {event.preventDefault();dispatch(deleteRecent(summoner));}}
                src={'https://s-lol-web.op.gg/images/icon/icon-close-small.svg?v=1657013167069'} 
                width={24} height={24} />
            </a>
          </Link>
        )
      case 1:
        return favoriteSummoners.map((summoner) =>
          <Link href={'/summoners/'+encodeURIComponent(summoner)}>
            <a className={styles.summoner}>
              <div className={styles.name}>
                {summoner}
              </div>
              <img 
                className={styles.remove} 
                onClick={(event) => {event.preventDefault();dispatch(deleteFavorite(summoner));}}
                src={'https://s-lol-web.op.gg/images/icon/icon-close-small.svg?v=1657013167069'} 
                width={24} height={24} />
            </a>
          </Link>
        )
    }
  }

  return (
    <div className={styles.contanier}>
      <div className={styles.contanier_2}>
        <div className={styles.locale}>
          <div onClick={()=>onChangeLocale('ko')}>한국어</div>
          <div onClick={()=>onChangeLocale('en')}>English</div>
          {/* <Link href={router.pathname} locale='ko'>
            <a>한국어</a>
          </Link>
          <Link href={router.pathname} locale='en'>
            <a>English</a>
          </Link> */}
        </div>
        <div className={styles.inputBox}>
          <input placeholder={t('baner_placeholder')} maxLength={20} 
            value={searchName}
            onFocus={onFocus} 
            onBlur={onBlur}
            onChange={onChange}
            onKeyUp={(event) => event.keyCode===13&&router.push('/summoners/'+encodeURIComponent(searchName))}
            />
          <Link href={'/summoners/'+encodeURIComponent(searchName)}>
            <a className={styles.button} >.GG</a>
          </Link>
        </div>
        {
          fouce &&
            <div className={styles.drop} onMouseDown={(event)=>event.preventDefault()}>
              {
                searchName ?
                  <div className={styles.searchSummoner}>
                    {searchSummonerView()}
                  </div>
                  :
                  <div className={styles.recentSummoner}>
                    <div className={styles.tabs}>
                      <div className={clsx(styles.tab, tab===0&&styles.active)}
                        onClick={() => setTab(0)}>
                        {t('recent')}
                      </div>
                      <div className={clsx(styles.tab, tab===1&&styles.active)}
                        onClick={() => setTab(1)}>
                        {t('favorite')}
                      </div>
                    </div>
                    <div className={styles.summoners}>
                      {recentSummonerView()}
                    </div>
                  </div>
              }
            </div>
        }
      </div>
    </div>
  )
}

export default Banner
