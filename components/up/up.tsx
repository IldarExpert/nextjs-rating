import {motion, useAnimation} from 'framer-motion';
import React, {useEffect} from 'react';
import ButtonIcon from '../button-icon/button-icon';
import {useScrollY} from '../hooks/useScrollY';
import styles from './up.module.css';

const Up = (): JSX.Element => {
  const positionY = useScrollY();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({opacity: positionY > 200 ? positionY / 400 : 0});
  }, [controls, positionY]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{opacity: 0}}
    >
      <ButtonIcon icon={'up'} appearance={'primary'} onClick={handleClick}/>
    </motion.div>
  );
};

export default Up;
