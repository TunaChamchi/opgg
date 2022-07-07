import '/styles/globals.css';
import type { AppProps } from 'next/app';
import wrapper from 'store/configureStore';
import moment from 'moment';

import Banner from 'containers/Banner';

moment.locale('ko', {
  relativeTime : {
    m : '일 분 전',
    mm : '%d분 전',
    h : '한 시간 전',
    hh : '%d시간 전',
    d : '하루전',
    dd : '%d일 전',
    M : '한 달 전',
    MM : '%d달 전',
    y : '일 년 전',
    yy : '%d년 전'
  }
});
moment.locale('en', {
  relativeTime : {
    m : 'a minute ago',
    mm : '%d minutes ago',
    h : 'a hour ago',
    hh : '%d hours ago',
    d : 'a day ago',
    dd : '%d days ago',
    M : 'a month ago',
    MM : '%d months ago',
    y : 'a year ago',
    yy : '%d years ago'
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Banner />
      <Component {...pageProps} />
    </div>
  )
}

export default wrapper.withRedux(MyApp);
