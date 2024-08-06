import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'

function CountryList({ cities }) {
     if (!cities) return <Message message='Select a city from map' />
     if (!cities.length) return <Message message='Select a city from map' />
     const countries = cities.reduce((arr, city) => {
          if (!arr.map(el => el.city).includes(city.country)) {
               return [...arr, { country: city.country, emoji: city.emoji }]
          }
          else return arr;
     }, [])
     return (
          <ul className={styles.countryList}>
               {countries.map(countryItem =>
                    <CountryItem country={countryItem} key={countryItem.country} />
               )}
          </ul>
     )
}

export default CountryList
