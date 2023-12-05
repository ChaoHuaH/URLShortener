import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartContext = chartRef.current.getContext('2d');
        new Chart(chartContext, {
            type: 'line',
            data: {
                labels: data.dailyVisitCounts.map(item => item.date),
                datasets: [{
                    label: 'Daily Visit Counts',
                    data: data.dailyVisitCounts.map(item => item.viewCount),
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, [data]); // Re-run when data changes

    return <canvas ref={chartRef}></canvas>;
};

export default LineChart;