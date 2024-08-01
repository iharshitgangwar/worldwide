import { Outlet } from 'react-router-dom'
import AppNav from './AppNav'
import Logo from './Logo'
import styles from './Sidebar.module.css'

function Sidebar() {
     return <div className={styles.sidebar}>
          <Logo />
          <AppNav />
          <p>List Of Cities</p>
          <Outlet />

     </div>
}


export default Sidebar