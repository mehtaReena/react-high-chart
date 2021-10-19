
import React, { useRef, useState } from 'react';
import './Styles.css';
import WeatherCard from './WeatherCard';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function Weather(props) {
    const API_key = "e75b39b56e354740aa3102619211504";
    const path = 'https://api.weatherapi.com/v1/forecast.json?key='+ API_key +'&days=5&aqi=yes&alerts=no&q='

    let inputRef = useRef();

    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [weather, setWeather] = useState([]);
    const [labels, setlabel] = useState([]);
    const [temps, setTemp] = useState([])


    let [userLocation, setUserLocation] = useState();
    let [temperature, setTemperature] = useState();
    let [tempIcon, setTempIcon] = useState();
    let [aqiIcon, setAqiIcon] = useState();
    let [aqi, setAqi] = useState();


    function getEmoji(aqi) {
        if (aqi < 50) {
            return '😁';
        }
        else if (aqi < 100) {
            return '😊';
        }
        else if (aqi < 150) {
            return '😐';
        }
        else if (aqi < 200) {
            return '😷';
        }
        else if (aqi < 300) {
            return '🤢';
        }
        else {
            return '💀';
        }

    }




    const search = (e) => {

        let city = 'mumbai';
        let query = inputRef.current.value === '' ? city : inputRef.current.value;
        // let url = REQUESTED_URL + query;
        setLoading(true)
        fetch(path + query)
            .then((res) => res.json())
            .then((result) => {
                setLoading(false);
                setWeather(result.forecast.forecastday);

                console.log(result.forecast.forecastday);

                let labelsData = result.forecast.forecastday.map(function (item) {

                    return item.date;
                });

                let tempData = result.forecast.forecastday.map(function (item) {

                    return item.day.maxtemp_c;
                });
                console.log(tempData)
                setTemp(tempData);
                setlabel(labelsData);
                setShowInfo(true);


                setUserLocation(result.location.name + ',' + result.location.country)
                // eslint-disable-next-line
                setTemperature(result.current.temp_c + 'C' + ' ')
                setTempIcon('https:' + result.current.condition.icon)
                setAqiIcon(getEmoji(result.current.air_quality.pm10.toFixed(2)));
                setAqi(result.current.air_quality.pm10.toFixed(2))
                inputRef.current.value = '';
            });

    };

    const options = {
        chart: {
            backgroundColor: '#000',
            type: 'line'
        },
        xAxis: {
            categories: labels,
            title: {
                text: 'Dates',
                style: {
                    fontSize: '18px',
                    fontFamily: 'sans-serif',
                    color:'#FCFFC5'
                }
             },

            labels: {
                style: {
                    fontSize: '13px',
                    fontFamily: 'sans-serif',
                    color:'#FCFFC5'

                },
            },

        },
        yAxis: {
            title:{
                text:'Temperature',
                style: {
                    fontSize: '18px',
                    fontFamily: 'sans-serif',
                    color:'#FCFFC5'
                },


            },
            labels: {
                format: '{value}\xB0C',
                style: {
                   color: Highcharts.getOptions().colors[5]
                }
             },


        },
        title: {
            text: 'Weather chart',
            style: {
                fontSize: '25px',
                fontFamily: 'sans-serif',
                color:'#FCFFC5'
            },
        },

        legend: {
            layout: 'vertical',

            align: 'top',
             verticalAlign: 'right',
            borderWidth: 0,
            backgroundColor: (
                Highcharts.theme && Highcharts.theme.legendBackgroundColor)
                || '#FFFFFF'
        },

        series: [{
            name: 'Temperature',

            type: 'spline',
            data: temps,
            tooltip: {
                valueSuffix: '\xB0C',
                style: {
                    color: Highcharts.getOptions().colors[5]
                 }
             }
        },


        ]
    }


    return (
        <div className='container'>
            <div className="header">
                <h2>Weather Info </h2>
            </div>
            <div className="location">
                <div> Location</div>
                <div>
                    <input type="text" id="location" ref={inputRef} name="location" onChange={() => { setShowInfo(false); }}></input>
                </div>

            </div>
            <div className="query-btn">

                <button id="query-btn" onClick={search}> Get Info</button>


            </div>

            {
                loading && (<h3>Loading...</h3>)
            }

            <div className={showInfo ? 'show' : 'hidden'}>
                <div className="chart">
                <h3>Next 3 days Weather-forecast </h3>

                     <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    containerProps={{ className: "chart" }}
                />
            </div>
            <div className="">
                <h3>Current Weather </h3>
            <WeatherCard
                    weather={weather}
                    userLocation={userLocation}
                    temperature={temperature}
                    tempIcon={tempIcon}
                    aqiIcon={aqiIcon}
                    aqi={aqi}
                />

                </div>
                </div>


        </div>
    );
}

export default Weather;