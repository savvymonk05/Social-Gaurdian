import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Css/Graph.css';
import MyChart from './charts';

function EmotionChart() {
  const [emotionsData, setEmotionsData] = useState({ dates: [], emotions: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const response = await fetch('/api/v1/journal/fetchalljournals', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authtoken')
          }
        });

        if (!response.ok) {
          console.error('Error fetching journal entries:', response.statusText);
          return;
        }

        const data = await response.json();
        
        const dates = data.map(entry => new Date(entry.date).toLocaleDateString('en-GB'));
        const emotions = data.map(entry => entry.emotion);

        setEmotionsData({ dates, emotions });
      } catch (error) {
        console.error('Error fetching emotions:', error);
      }
    };

    fetchEmotions();
  }, []);

  return (
    <div className='container'>
      <MyChart values={emotionsData.emotions} dates={emotionsData.dates} />
    </div>
  );
}

export default EmotionChart;
