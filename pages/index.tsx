import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from "next/router";
import useTranslation from 'next-translate/useTranslation';
import styles from '/styles/Summoner.module.css'

import SummonerProfile from 'containers/summoner/SummonerProfile';
import Rank from 'containers/summoner/Rank';
import RecentChampion from 'containers/summoner/RecentChampion';
import MostChampion from 'containers/summoner/MostChampion';
import MatchesTop from 'containers/summoner/MatchesTop';
import Matches from 'containers/summoner/Matches';

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <div className={styles.container}>
      <Head>
        <title>OPGG TEST</title>
      </Head>

      <main style={{height:'calc(100vh - 112px)', justifyContent: 'center'}} className={styles.main}>
        <span style={{fontSize: 30}}>{t('index_text')}</span>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
