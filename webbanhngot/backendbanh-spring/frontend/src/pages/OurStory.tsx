import { Card, Col, Row, Timeline, Typography } from 'antd'
import { Header, Footer } from '../components'

export function OurStoryPage() {
  return (
    <div>
      <Header />
      <div className="container" style={{ padding: '32px 0 48px' }}>
        <Card style={{ marginBottom: 24 }}>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Our Story
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            A small bakery brand focused on handcrafted breads, cakes, and pastries made fresh daily.
          </Typography.Paragraph>
        </Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <Card title="How we started">
              <Typography.Paragraph>
                We began with a single oven and a commitment to premium ingredients, honest recipes,
                and warm service. Today we still bake with the same care.
              </Typography.Paragraph>
              <Timeline
                items={[
                  { children: 'Started with classic cakes and croissants.' },
                  { children: 'Expanded into seasonal pastry collections.' },
                  { children: 'Launched online ordering and checkout.' },
                ]}
              />
            </Card>
          </Col>
          <Col xs={24} lg={10}>
            <Card title="Our values">
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9 }}>
                <li>Fresh, high-quality ingredients</li>
                <li>Craftsmanship in every batch</li>
                <li>Simple and reliable online ordering</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}


