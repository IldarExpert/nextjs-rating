import {useRouter} from 'next/router';
import React, {useState, KeyboardEvent} from 'react';
import Button from '../button/button';
import Input from '../input/input';
import styles from './search.module.css';
import {SearchProps} from './search.props';
import SearchIcon from './search.svg';

const Search = ({className, ...props}: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSendSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendSearch();
    }
  };

  return (
    <form
      className={`${className? className: ''} ${styles.search}`}
      {...props}
    >
      <Input
        className={styles.input}
        placeholder={'Поиск...'}
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <Button
        appearance={'primary'}
        className={styles.button}
        onClick={handleSendSearch}
      >
        <SearchIcon/>
      </Button>
    </form>
  );
};

export default Search;
