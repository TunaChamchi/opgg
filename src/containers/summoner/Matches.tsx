import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Image from 'next/image';
import clsx from 'clsx';
import _ from 'lodash';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import json_item from 'lib/item.json';

import { State } from 'store';

import styles from '/styles/Summoner.module.css'

const Matches = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [games, setGames]: any[] = useState([]);

  const summonerName = useSelector((state: State) => state.summoner.summonerInfo.name);
  const gameType = useSelector((state: State) => state.matches.gameType);
  const store_games = useSelector((state: State) => state.matches.games);
  const store_teams = useSelector((state: State) => state.matches.teams);
  const item_data = json_item.data;

  useEffect(() => {
    if (gameType === 0) {
      setGames(store_games);
    } else if (gameType === 1) {
      const _games = _.filter(store_games, (game) => game.gameType==="솔랭");
      setGames(_games);
    } else if (gameType === 2) {
      const _games = _.filter(store_games, (game) => game.gameType==="자유 5:5 랭크");
      setGames(_games);
    }
  }, [gameType, store_games]);

  //console.log('games', games);
  const matchesView = () => games.map((game: any) => {
    moment.locale(router.locale);
    const fromNow = moment(game.createDate * 1000).fromNow(true);
    const gameTime = moment(game.gameLength * 1000).format(`m[${t('m')}] s[${t('s')}]`);
    const champion = _.replace(_.last(game.champion.imageUrl.split('/'))||'', '.png', '');

    const itemList = game.items.slice(0, -1);
    itemList.splice(game.items.length-1, 0, ...Array.from({length: 6-itemList.length}));
    itemList.splice(3, 0, _.last(game.items));
    const teamList = store_teams.find(team => team.gameId === game.gameId);

    return (
      <div className={clsx(styles.matches_matche, game.isWin&&styles.win)}>
        <div className={styles.matches_matche_data}>
          <div className={styles.matches_matche_data_1}>
            <span className={styles.font_weight_bold}>{t(game.gameType)}</span>
            <span>{fromNow}</span>
            <div className={styles.matches_matche_data_hr}></div>
            <span className={styles.iswin}>{game.isWin?t('winer'):t('losser')}</span>
            <span>{gameTime}</span>
          </div>
          <div className={styles.matches_matche_data_2}>
            <div className={styles.matches_matche_data_2_1} >
              <img className={styles.champoin} src={game.champion.imageUrl} alt={'champion'} width={46} height={46} />
              <div className={styles.spell_runes}>
                {
                  game.spells.map((spell: any) => <img className={styles.spell} src={spell.imageUrl} alt={'spell'} width={22} height={22} />)
                }
                {
                  game.peak.map((url: string) => <img className={styles.champoin} src={url} alt={'spell'} width={22} height={22} />)
                }
              </div>
            </div>
            <span>{champion}</span>
          </div>
          <div className={styles.matches_matche_data_3}>
            <div className={styles.kda}>
              {game.stats.general.kill}
              <span className={styles.slash}> / </span>
              <span className={styles.death}>{game.stats.general.death}</span>
              <span className={styles.slash}> / </span>
              {game.stats.general.assist}
            </div>
            <div className={styles.grade}>{game.stats.general.kdaString} <span className={styles.const_text}>{t('grade')}</span></div>
            {
              game.stats.general.largestMultiKillString &&
                game.stats.general.opScoreBadge &&
                  <div className={styles.badge}>
                    {
                      game.stats.general.largestMultiKillString && 
                        <div className={styles.largestMultiKillString}><span>{game.stats.general.largestMultiKillString}</span></div>
                    }
                    {
                      game.stats.general.opScoreBadge && 
                        <div className={styles.opScoreBadge}><span>{game.stats.general.opScoreBadge}</span></div>
                    }
                  </div>
            }
          </div>
          <div className={styles.matches_matche_data_4}>
            <span>{t('level')}{game.champion.level}</span>
            <span>{game.stats.general.cs} ({game.stats.general.csPerMin}) CS</span>
            <span style={{color:'var(--scarlet)'}}>{t('P/Kill')} {game.stats.general.contributionForKillRate}</span>
          </div>
          <div className={styles.matches_matche_data_5}>
            <div className={styles.items}>
              {
                itemList.map((item:any) => {
                  if (item) {
                    const itemId = _.replace(_.last(item.imageUrl.split('/'))||'', '.png', '');
                    const description = item_data[itemId].description
                                                          .replace(/<br>?/g, '\n')
                                                          .replace(/<[^>]*>?/g, '');
                    return (
                      <div className={styles.item}>
                        <img className={styles.item_img} src={item.imageUrl} alt={'spell'} width={22} height={22} />
                        <div className={styles.item_description_box}>
                          <div className={styles.item_description}>
                            <span className={styles.item_description_name}>{item_data[itemId].name}</span>
                            <span className={styles.item_description_text}>{item_data[itemId].plaintext}</span>
                            <span className={styles.item_description_text}>{description}</span>
                          </div>
                          <div className={styles.item_description_triangle} />
                        </div>
                      </div>
                    )
                  } else {
                    return <div className={styles.blank} />
                  }
                })
              }
              <img src={game.isWin ?
                'https://s-lol-web.op.gg/static/images/icon/common/icon-buildblue-p.png?v=1657006486482' :
                'https://s-lol-web.op.gg/static/images/icon/common/icon-buildred-p.png?v=1656924863511'
                } alt={'none'} width={22} height={22} />
            </div>
            <div className={styles.visionWardsBought}>
              <Image src={game.isWin?'/image/icon-ward-blue.svg':'/image/icon-ward-red.svg'} alt={'ward'} width={16} height={16} />
              <span>{t('control_ward')} {game.stats.ward.visionWardsBought}</span>
            </div>
          </div>
          <div className={styles.matches_matche_data_6}>
            {
              teamList && teamList.teams[0].players.map((player: any) =>
                <div className={styles.team}>
                  <img src={player.champion.imageUrl} alt={'none'} width={16} height={16} />
                  <span className={clsx(player.summonerName === summonerName && styles.summoner)}>{player.summonerName}</span>
                </div>
              )
            }
          </div>
          <div className={styles.matches_matche_data_6}>
            {
              teamList && teamList.teams[1].players.map((player: any) =>
                <div className={styles.team}>
                  <img src={player.champion.imageUrl} alt={'none'} width={16} height={16} />
                  <span className={clsx(player.summonerName === summonerName && styles.summoner)}>{player.summonerName}</span>
                </div>
              )
            }
          </div>
        </div>
        <div className={styles.matches_matche_more_detail}>
          <img src={game.isWin ?
            'https://s-lol-web.op.gg/images/icon/icon-arrow-down-blue.svg?v=1657013167257' :
            'https://s-lol-web.op.gg/images/icon/icon-arrow-down-red.svg?v=1657013167257'
            } />
        </div>
      </div>
    )
  })

  return (
    <div className={styles.matches_contanier}>
      {matchesView()}
    </div>
  )
}

export default Matches
