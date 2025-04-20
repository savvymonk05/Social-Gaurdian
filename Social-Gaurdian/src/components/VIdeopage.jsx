import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const VIdeopage = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = () => {
        if (input.trim()) {
            navigate(`/videocall/${input}`);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f4f8'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                gap: '20px'
            }}>
                <h2 style={{ margin: 0, color: '#333' }}>Join a Video Call</h2>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder='Enter your name'
                    style={{
                        padding: '10px 16px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        width: '250px',
                        outline: 'none'
                    }}
                />
                <button
                    onClick={submitHandler}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Join
                </button>
            </div>
        </div>
    );
};

export default VIdeopage;
