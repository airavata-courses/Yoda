export const response = {
    "data": {
      "forecast": {
        "detailedForecast": "Cloudy, with a low around 30. North wind around 6 mph.",
        "endTime": "2020-02-11T06:00:00-05:00",
        "icon": "https://api.weather.gov/icons/land/night/ovc?size=medium",
        "isDaytime": false,
        "name": "Overnight",
        "number": 1,
        "shortForecast": "Cloudy",
        "startTime": "2020-02-11T00:00:00-05:00",
        "temperature": 30,
        "temperatureTrend": null,
        "temperatureUnit": "F",
        "windDirection": "N",
        "windSpeed": "6 mph"
      }
    },
    "forecast": {
      "@context": [
        "https://raw.githubusercontent.com/geojson/geojson-ld/master/contexts/geojson-base.jsonld",
        {
          "@vocab": "https://api.weather.gov/ontology#",
          "geo": "http://www.opengis.net/ont/geosparql#",
          "unit": "http://codes.wmo.int/common/unit/",
          "wx": "https://api.weather.gov/ontology#"
        }
      ],
      "geometry": {
        "geometries": [
          {
            "coordinates": [
              -86.5231178,
              39.1657889
            ],
            "type": "Point"
          },
          {
            "coordinates": [
              [
                [
                  -86.5364609,
                  39.1775133
                ],
                [
                  -86.5382399,
                  39.1554446
                ],
                [
                  -86.50977769999999,
                  39.1540629
                ],
                [
                  -86.50799259999998,
                  39.1761314
                ],
                [
                  -86.5364609,
                  39.1775133
                ]
              ]
            ],
            "type": "Polygon"
          }
        ],
        "type": "GeometryCollection"
      },
      "properties": {
        "elevation": {
          "unitCode": "unit:m",
          "value": 242.0112
        },
        "forecastGenerator": "BaselineForecastGenerator",
        "generatedAt": "2020-02-11T05:44:31+00:00",
        "periods": [
          {
            "detailedForecast": "Cloudy, with a low around 30. North wind around 6 mph.",
            "endTime": "2020-02-11T06:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/night/ovc?size=medium",
            "isDaytime": false,
            "name": "Overnight",
            "number": 1,
            "shortForecast": "Cloudy",
            "startTime": "2020-02-11T00:00:00-05:00",
            "temperature": 30,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "N",
            "windSpeed": "6 mph"
          },
          {
            "detailedForecast": "Mostly cloudy, with a high near 42. Northwest wind 5 to 8 mph.",
            "endTime": "2020-02-11T18:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/day/bkn?size=medium",
            "isDaytime": true,
            "name": "Tuesday",
            "number": 2,
            "shortForecast": "Mostly Cloudy",
            "startTime": "2020-02-11T06:00:00-05:00",
            "temperature": 42,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "NW",
            "windSpeed": "5 to 8 mph"
          },
          {
            "detailedForecast": "Cloudy, with a low around 30. North wind 1 to 7 mph.",
            "endTime": "2020-02-12T06:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/night/ovc?size=medium",
            "isDaytime": false,
            "name": "Tuesday Night",
            "number": 3,
            "shortForecast": "Cloudy",
            "startTime": "2020-02-11T18:00:00-05:00",
            "temperature": 30,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "N",
            "windSpeed": "1 to 7 mph"
          },
          {
            "detailedForecast": "A chance of snow between 7am and 10am, then rain and snow. Cloudy, with a high near 38. East wind 1 to 5 mph. Chance of precipitation is 90%. New snow accumulation of less than half an inch possible.",
            "endTime": "2020-02-12T18:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/day/snow,40/snow,90?size=medium",
            "isDaytime": true,
            "name": "Wednesday",
            "number": 4,
            "shortForecast": "Chance Light Snow then Rain And Snow",
            "startTime": "2020-02-12T06:00:00-05:00",
            "temperature": 38,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "E",
            "windSpeed": "1 to 5 mph"
          },
          {
            "detailedForecast": "Rain. Cloudy, with a low around 31. Northwest wind 1 to 7 mph. Chance of precipitation is 90%. New rainfall amounts between three quarters and one inch possible.",
            "endTime": "2020-02-13T06:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/night/rain,90?size=medium",
            "isDaytime": false,
            "name": "Wednesday Night",
            "number": 5,
            "shortForecast": "Rain",
            "startTime": "2020-02-12T18:00:00-05:00",
            "temperature": 31,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "NW",
            "windSpeed": "1 to 7 mph"
          },
          {
            "detailedForecast": "A chance of snow before 1pm. Cloudy, with a high near 33. Chance of precipitation is 40%. Little or no snow accumulation expected.",
            "endTime": "2020-02-13T18:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/day/snow,40/snow,20?size=medium",
            "isDaytime": true,
            "name": "Thursday",
            "number": 6,
            "shortForecast": "Chance Light Snow",
            "startTime": "2020-02-13T06:00:00-05:00",
            "temperature": 33,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "W",
            "windSpeed": "7 to 14 mph"
          },
          {
            "detailedForecast": "Mostly cloudy, with a low around 10.",
            "endTime": "2020-02-14T06:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/night/cold?size=medium",
            "isDaytime": false,
            "name": "Thursday Night",
            "number": 7,
            "shortForecast": "Mostly Cloudy",
            "startTime": "2020-02-13T18:00:00-05:00",
            "temperature": 10,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "NW",
            "windSpeed": "7 to 12 mph"
          },
          {
            "detailedForecast": "Sunny, with a high near 25.",
            "endTime": "2020-02-14T18:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
            "isDaytime": true,
            "name": "Friday",
            "number": 8,
            "shortForecast": "Sunny",
            "startTime": "2020-02-14T06:00:00-05:00",
            "temperature": 25,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "NNW",
            "windSpeed": "6 mph"
          },
          {
            "detailedForecast": "Mostly clear, with a low around 18.",
            "endTime": "2020-02-15T06:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
            "isDaytime": false,
            "name": "Friday Night",
            "number": 9,
            "shortForecast": "Mostly Clear",
            "startTime": "2020-02-14T18:00:00-05:00",
            "temperature": 18,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "E",
            "windSpeed": "5 mph"
          },
          {
            "detailedForecast": "Mostly sunny, with a high near 42.",
            "endTime": "2020-02-15T18:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
            "isDaytime": true,
            "name": "Saturday",
            "number": 10,
            "shortForecast": "Mostly Sunny",
            "startTime": "2020-02-15T06:00:00-05:00",
            "temperature": 42,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "S",
            "windSpeed": "6 to 9 mph"
          },
          {
            "detailedForecast": "A chance of rain showers between 7pm and 3am, then a chance of rain and snow showers. Mostly cloudy, with a low around 35. Chance of precipitation is 40%.",
            "endTime": "2020-02-16T06:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/night/rain_showers,20/snow,40?size=medium",
            "isDaytime": false,
            "name": "Saturday Night",
            "number": 11,
            "shortForecast": "Chance Rain Showers then Chance Rain And Snow Showers",
            "startTime": "2020-02-15T18:00:00-05:00",
            "temperature": 35,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "SSW",
            "windSpeed": "9 mph"
          },
          {
            "detailedForecast": "A chance of rain and snow showers. Mostly cloudy, with a high near 48. Chance of precipitation is 40%.",
            "endTime": "2020-02-16T18:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/day/snow,40?size=medium",
            "isDaytime": true,
            "name": "Sunday",
            "number": 12,
            "shortForecast": "Chance Rain And Snow Showers",
            "startTime": "2020-02-16T06:00:00-05:00",
            "temperature": 48,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "SSW",
            "windSpeed": "7 mph"
          },
          {
            "detailedForecast": "A chance of rain showers. Mostly cloudy, with a low around 38. Chance of precipitation is 50%.",
            "endTime": "2020-02-17T06:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/night/rain_showers,50?size=medium",
            "isDaytime": false,
            "name": "Sunday Night",
            "number": 13,
            "shortForecast": "Chance Rain Showers",
            "startTime": "2020-02-16T18:00:00-05:00",
            "temperature": 38,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "S",
            "windSpeed": "5 mph"
          },
          {
            "detailedForecast": "A chance of rain showers. Mostly cloudy, with a high near 52. Chance of precipitation is 40%.",
            "endTime": "2020-02-17T18:00:00-05:00",
            "icon": "https://api.weather.gov/icons/land/day/rain_showers,40?size=medium",
            "isDaytime": true,
            "name": "Washington's Birthday",
            "number": 14,
            "shortForecast": "Chance Rain Showers",
            "startTime": "2020-02-17T06:00:00-05:00",
            "temperature": 52,
            "temperatureTrend": null,
            "temperatureUnit": "F",
            "windDirection": "SW",
            "windSpeed": "6 mph"
          }
        ],
        "units": "us",
        "updateTime": "2020-02-11T05:17:11+00:00",
        "updated": "2020-02-11T05:17:11+00:00",
        "validTimes": "2020-02-10T23:00:00+00:00/P7DT2H"
      },
      "type": "Feature"
    }
  }
export default response;