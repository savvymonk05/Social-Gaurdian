import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const JournalPage = () => {
  const [journalText, setJournalText] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    // You can process the journal text here as needed
    // For simplicity, let's just split it into sentences and count the length of each sentence
    const sentences = journalText.split('.').filter(Boolean).map(sentence => ({
      sentence,
      length: sentence.trim().split(/\s+/).length
    }));
    setData(sentences);
  };

  const handleAnalysis = () => {
    // Perform analysis here if needed
    // For simplicity, let's just show the length of each sentence
    console.log(data);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Journaling Page</h2>
          <Form>
            <Form.Group controlId="journalTextArea">
              <Form.Label>Enter Your Journal Text:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}
            <Button variant="info" onClick={handleAnalysis}>Analysis</Button>
          </Form>
        </Col>
      </Row>
      {data.length > 0 && (
        <Row className="mt-5">
          <Col>
            <h2>Analysis Result</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sentence" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="length" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default JournalPage;
