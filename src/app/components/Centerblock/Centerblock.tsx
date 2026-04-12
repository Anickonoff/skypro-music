import classNames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import { data } from '@/data';
import { Track } from '../Track/Track';
import { Filter } from '../Filter/Filter';
import { getUnicValuesByKey } from '@/utils/helper';
import { FilterListItems } from '@/sharedFilters/types';

export default function Centerblock() {
  const FilterListItems: FilterListItems = {
    genre: getUnicValuesByKey(data, 'genre'),
    author: getUnicValuesByKey(data, 'author'),
    year: ['По умолчанию', 'Сначала новые', 'Сначала старые'],
  };

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter filterListItems={FilterListItems} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {data.map((item) => (
            <Track key={item._id} track={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
