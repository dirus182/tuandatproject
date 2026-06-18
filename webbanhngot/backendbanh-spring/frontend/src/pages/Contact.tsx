import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { Header, Footer } from '../components'

export function ContactPage() {
  return (
    <div>
      <Header />
      <div className="container" style={{ padding: '32px 0 48px' }}>
        <Card style={{ marginBottom: 24 }}>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Contact
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            Reach out for product questions, order support, or wholesale requests.
          </Typography.Paragraph>
        </Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <Card title="Store information">
              <p>Email: hello@artisan-boulangerie.local</p>
              <p>Phone: +84 123 456 789</p>
              <p>Hours: 8:00 - 20:00 daily</p>
            </Card>
          </Col>
          <Col xs={24} lg={14}>
            <Card title="Send a message">
              <Form layout="vertical">
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                  <Input placeholder="Your name" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                  <Input placeholder="Your email" />
                </Form.Item>
                <Form.Item label="Message" name="message" rules={[{ required: true }]}>
                  <Input.TextArea rows={5} placeholder="How can we help?" />
                </Form.Item>
                <Button type="primary">Send message</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}


