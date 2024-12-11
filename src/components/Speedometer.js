import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CircularGaugeComponent,
    AxesDirective,
    AxisDirective,
    PointersDirective,
    PointerDirective,
    Inject,
    Annotations,
    AnnotationsDirective,
    AnnotationDirective,
} from '@syncfusion/ej2-react-circulargauge';   // import statements of the speedometer components

const Speedometer = () => {
    const [speed, setSpeed] = useState(0);
    const [, setPrevSpeed] = useState(0);
    const [speedChange, setSpeedChange] = useState(null); // "up" for increase, "down" for decrease
    const [signalStrength, setSignalStrength] = useState('green'); // signal strength color

    useEffect(() => {
        let lastRecordedTime = 0;

        const fetchGPSSpeed = () => {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(
                    (position) => {
                        const currentTime = Date.now();
                        if (currentTime - lastRecordedTime >= 1000) {
                            const gpsSpeed = position.coords.speed; // Speed in m/s
                            const speedKph = gpsSpeed ? gpsSpeed * 3.6 : 0; // Convert to km/h

                            // Update speed and determine change direction
                            setSpeed((prev) => {
                                const changeDirection = speedKph > prev ? "up" : speedKph < prev ? "down" : null;
                                setSpeedChange(changeDirection);
                                return speedKph;
                            });
                            setPrevSpeed(speedKph); // Always update prevSpeed with current speed value
                            lastRecordedTime = currentTime;

                            // Determine signal strength based on accuracy
                            const accuracy = position.coords.accuracy;
                            if (accuracy <= 20) {
                                setSignalStrength('green'); // Excellent accuracy
                            } else if (accuracy <= 100) {
                                setSignalStrength('yellow'); // Moderate accuracy
                            } else {
                                setSignalStrength('red'); // Poor accuracy
                            }

                            // Send speed to the backend
                            try {
                                axios.post('http://localhost:3001/send-gps-speed', { speed: speedKph });
                            } catch (error) {
                                console.error('Error sending GPS speed to backend:', error);
                            }
                        }
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    },
                    { enableHighAccuracy: true }
                );
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        };

        fetchGPSSpeed();
    }, []);

    const speedMph = (speed * 0.621371).toFixed(2); // Convertion  km/h to mph

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">GPS Speedometer</h2>

            {/* Signal Strength Indicator */}
            <div
                className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white font-bold ${signalStrength === 'green' ? 'bg-green-500' : signalStrength === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`}
            >
                {signalStrength === 'green' && 'Strong Signal'}
                {signalStrength === 'yellow' && 'Moderate Signal'}
                {signalStrength === 'red' && 'Weak Signal'}
            </div>

            <div className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px]">
                <CircularGaugeComponent>
                    <Inject services={[Annotations]} />
                    <AxesDirective>
                        <AxisDirective
                            startAngle={270}
                            endAngle={90}
                            labelStyle={{
                                font: { color: 'black', size: '16px', fontWeight: 'Bold' },
                            }}
                        >
                            <PointersDirective>
                                <PointerDirective
                                    value={speed}
                                    pointerWidth={2}
                                    needleStartWidth={4}
                                    needleEndWidth={4}
                                    radius="80%"
                                    color="maroon"
                                    cap={{
                                        radius: 8,
                                        color: 'gray',
                                        border: { color: '#007DD1', width: 5 },
                                    }}
                                    needleTail={{ length: '0%' }}
                                />
                            </PointersDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective
                                    angle={180}
                                    radius="20%"
                                    zIndex="1"
                                    content='<div style="color:#757575; font-family:Roboto; font-size:14px;padding-top: 26px">Speedometer</div>'
                                />
                            </AnnotationsDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>
            </div>
            <div className="mt-6 bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 text-center w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px]">
                <div className="text-4xl sm:text-5xl font-extrabold text-gray-700 flex items-center justify-center">
                    {speed.toFixed(2)} <span className="text-lg sm:text-xl font-medium">km/h</span>
                    {speedChange === "up" && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-500 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                        </svg>
                    )}
                    {speedChange === "down" && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-red-500 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    )}
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-gray-600 mt-2">
                    {speedMph} <span className="text-sm sm:text-base font-medium">mph</span>
                </div>
            </div>
        </div>
    );
};

export default Speedometer;
