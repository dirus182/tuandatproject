import { Card, Col, Row, Steps, Typography } from 'antd'
import { Header, Footer } from '../components'

export function WholesalePage() {
  return (
    <div>
      <Header />
      <div className="container" style={{ padding: '32px 0 48px' }}>
        <Card style={{ marginBottom: 24 }}>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Wholesale
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            Partner with us for cafés, events, and retail orders with flexible quantities.
          </Typography.Paragraph>
        </Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="How wholesale works">
              <Steps
                direction="vertical"
                current={0}
                items={[
                  { title: 'Submit inquiry', description: 'Tell us what products and quantities you need.' },
                  { title: 'Receive quote', description: 'We prepare a tailored quote and timeline.' },
                  { title: 'Production & delivery', description: 'We bake fresh and arrange delivery or pickup.' },
                ]}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Ideal for">
              <Typography.Paragraph>
                Cafés, corporate events, weddings, restaurants, and seasonal gifting programs.
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}


