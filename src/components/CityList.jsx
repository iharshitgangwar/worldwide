import CityItem from './CityItem'
import styles from './CityList.module.css'
import Message from './Message'

function CityList({ citiesData }) {

     if (!citiesData) return <Message message="Add your city by clicking on a city on the map" />
     if (!citiesData.length) return <Message message="Add your city by clicking on a city on the map" />
     return (
          <ul className={styles.cityList}>
               {citiesData?.map(city =>
                    (<CityItem city={city} key={city.id} />)
               )}
          </ul>
     )
}
export default CityList
