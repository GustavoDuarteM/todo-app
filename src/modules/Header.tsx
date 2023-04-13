import styles from './Header.module.css'
import rocketImg from '../assets/rocket.svg'

export function Header(){
  return(
    <div className={styles.header}>
      <img src={rocketImg}/>
      <div className={styles.title}>
        <span>to</span>
        <span>do</span>
      </div>
    </div>
  );
}