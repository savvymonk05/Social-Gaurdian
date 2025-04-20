import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useNavigate } from 'react-router-dom';
import "./Css/Graph.css"
import MyChart from './charts';

Chart.register(...registerables);

function EmotionGraph() {
    const [emotionsData, setEmotionsData] = useState({ dates: [], emotions: [] });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const chartRef = useRef(null);

    const generateGraph = async () => {
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
            const dates = data.map(entry => new Date(entry.date).toLocaleDateString());
            console.log(dates)
            const emotions = data.map(entry => entry.emotion);
            console.log(emotions)

            setEmotionsData({ dates, emotions });

            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const ctx = document.getElementById('emotionChart').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Emotions',
                        data: emotions,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    day: 'MMM dd'
                                }
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching or rendering graph:', error);
        }
    };
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/v1/journal/addjournal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authtoken')
                },
                body: JSON.stringify({ text: message })
            });

            if (!response.ok) {
                console.error('Error adding journal:', response.statusText);
                return;
            }

            navigate('/');
        } catch (error) {
            console.error('Error adding journal:', error);
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        generateGraph();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Journal YourSelf <span className="inline-block animate-bounce">✍️</span> </h1>
            <div className="mb-6">
                <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-white-900 bg-white-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    value={message}
                    onChange={handleChange}
                ></textarea>
                <div className='container d-flex justify-content-between'>
                    <button className="acceptButton text-white" onClick={generateGraph}>Analysis</button>
                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleSubmit}>Submit</button>
                </div>
                <MyChart values={emotionsData?.emotions} dates={emotionsData?.dates} />
            </div>
        </div>
    );
}

export default EmotionGraph;
