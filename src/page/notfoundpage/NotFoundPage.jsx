import React from 'react';
import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src={ process.env.PUBLIC_URL + `./images/pokemon.png` } alt="" />
      </div>
      <div className={styles.title}>
        <h1>4</h1>
        <img src={ process.env.PUBLIC_URL + `./images/404.png` } alt="" />
        <h1>4</h1>
      </div>
      <p className={`${styles.desc} black`}>
        <strong className="primary">Sorry!</strong> Pokemon Not Found
      </p>
      <Link to="/">
        <button type="button" className={styles.button}>BACK HOME</button>
      </Link>
    </div>
  )
}

export default NotFoundPage;
