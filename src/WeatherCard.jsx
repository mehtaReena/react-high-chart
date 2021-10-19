
import './Styles.css';

function WeatherCard(props) {

    return (

            <div className="weather-container" id="weather-container">
                <div id="loaction-name">{props.userLocation} </div>
                <div id="temperature">Temperature:{props.temperature}
                 <img src={props.tempIcon} alt='' className='icon'></img>
                </div>
                <div id="aqi">Air Quality Index: {props.aqi} {props.aqiIcon} </div>
            </div>


    );
}

export default WeatherCard;