import styles from './search.module.css';

type SearchProps = {
  onInputChange: (query: string) => void;
  inputValue: string;
};

export default function Search({ onInputChange, inputValue }: SearchProps) {
  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };
  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={inputValue}
        onChange={onSearchInput}
      />
    </div>
  );
}
