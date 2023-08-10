import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { ResponsiveLine } from '@nivo/line';

// Eine zweite Komponente, welche später das Wetter für den gewählten Ort anzeigt

export default function Weather() {
    const { lat, lng } = useParams();

    const latitude = lat.replace('_', '.');
    const longitude = lng.replace('_', '.');
    const chartData = {
        id: 'Temperatur',
        data: [],
      };
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState("");

    useEffect(
        () => {
          async function loadData() {
            try {
              setLoading(true);
              const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
              const data = await response.json();
              setWeatherData(data);
              setLoading(false);
            } catch (err) {
              console.error(err);
              setLoading(false);
            }
          }
      
          loadData();
        },
        [latitude, longitude]
      );
    
    
      if (loading) {
        return (
          <CircularProgress />
        );
      }
      
      if (
        weatherData && weatherData.hourly &&
        Array.isArray(weatherData.hourly.time) &&
        Array.isArray(weatherData.hourly.temperature_2m)
      ) {
        const chartEntries = weatherData.hourly.time.map((time, i) => ({
          x: new Date(time),
          y: weatherData.hourly.temperature_2m[i],
        }));
      
        chartData.data = chartEntries;
      }

    //   Die nivo-Library benötigt zur Anzeige von Charts einen Container mit einer fix gesetzten Größe, daher umschließe ich sie mit einem div mit entsprechendem Stil. 
    //   Die Chart Daten müssen als Array übergeben werden (da die Komponente mehrere Linien gleichzeitig anzeigen könnte):

      return (
        <div
          style={{
            padding: 10,
            width: '80vw',
            height: '80vh',
            boxSizing: 'border-box',
          }}
        >
          <ResponsiveLine
  data={[chartData]}
  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
  xScale={{
    type: 'time',
  }}
  xFormat={(time) => {
    return time.toLocaleString('de-DE');
  }}
  yScale={{
    type: 'linear',
    min: -30,
    max: 50,
    stacked: true,
    reverse: false
  }}
  yFormat=" >-.2f"
  axisTop={null}
  axisRight={null}
  axisBottom={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 30,
    tickValues: 'every day',
    format: (time) => time.toLocaleDateString('de-DE'),
    legend: 'Zeit',
    legendOffset: 36,
    legendPosition: 'left'
  }}
  axisLeft={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Temperatur',
    legendOffset: -40,
    legendPosition: 'start'
  }}
  pointSize={10}
  pointColor={{ theme: 'background' }}
  pointBorderWidth={2}
  pointBorderColor={{ from: 'serieColor' }}
  pointLabelYOffset={-12}
  useMesh={true}
  legends={[
    {
      anchor: 'bottom-right',
      direction: 'column',
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: 'left-to-right',
      itemWidth: 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 12,
      symbolShape: 'circle',
      symbolBorderColor: 'rgba(0, 0, 0, .5)',
      effects: [
        {
          on: 'hover',
          style: {
            itemBackground: 'rgba(0, 0, 0, .03)',
            itemOpacity: 1
          }
        }
      ]
    }
  ]}
/>
        </div>
      );
    
    
      }