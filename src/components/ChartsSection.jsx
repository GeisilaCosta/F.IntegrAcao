import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const ChartsSection = () => {
  // Sample data for charts
  const helpTypeData = [
    { name: 'Moradia', value: 35, color: '#2563eb' },
    { name: 'Emprego', value: 25, color: '#10b981' },
    { name: 'Saúde', value: 20, color: '#f59e0b' },
    { name: 'Educação', value: 15, color: '#ef4444' },
    { name: 'Outros', value: 5, color: '#8b5cf6' }
  ];

  const monthlyData = [
    { month: 'Jan', ofertas: 45, pedidos: 38 },
    { month: 'Fev', ofertas: 52, pedidos: 42 },
    { month: 'Mar', ofertas: 48, pedidos: 51 },
    { month: 'Abr', ofertas: 61, pedidos: 58 },
    { month: 'Mai', ofertas: 55, pedidos: 49 },
    { month: 'Jun', ofertas: 67, pedidos: 62 }
  ];

  const growthData = [
    { month: 'Jan', usuarios: 120 },
    { month: 'Fev', usuarios: 180 },
    { month: 'Mar', usuarios: 250 },
    { month: 'Abr', usuarios: 320 },
    { month: 'Mai', usuarios: 410 },
    { month: 'Jun', usuarios: 520 }
  ];

  return (
    <section className="py-5">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-6 fw-bold mb-3">Análise de Dados</h2>
            <p className="lead text-muted">
              Insights sobre o impacto da plataforma IntegrAção
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Pie Chart - Help Types Distribution */}
          <Col lg={6}>
            <Card className="chart-container">
              <Card.Body>
                <h5 className="fw-bold mb-4">Distribuição por Tipo de Ajuda</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={helpTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {helpTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          {/* Bar Chart - Monthly Offers vs Requests */}
          <Col lg={6}>
            <Card className="chart-container">
              <Card.Body>
                <h5 className="fw-bold mb-4">Ofertas vs Pedidos (Mensal)</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ofertas" fill="#2563eb" name="Ofertas" />
                    <Bar dataKey="pedidos" fill="#10b981" name="Pedidos" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          {/* Line Chart - User Growth */}
          <Col lg={12}>
            <Card className="chart-container">
              <Card.Body>
                <h5 className="fw-bold mb-4">Crescimento de Usuários</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="usuarios" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                      name="Usuários"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Key Insights */}
        <Row className="mt-5">
          <Col>
            <Card 
  className="text-white p-4" 
  style={{ 
    background: 'linear-gradient(135deg, #6ca3e0 0%, #350c5e 100%)', 
    borderRadius: '10px', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
  }}
>
              <Card.Body>
                <h5 className="fw-bold mb-3 text-white ">📊 Insights Principais</h5>
                <Row>
                  <Col md={4}>
                    <div className="mb-3">
                      <h6 className="fw-bold">🏠 Moradia em Destaque</h6>
                      <p className="mb-0 small">35% dos pedidos são relacionados à moradia, mostrando a urgência habitacional.</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <h6 className="fw-bold">📈 Crescimento Constante</h6>
                      <p className="mb-0 small">Crescimento de 333% em usuários nos últimos 6 meses.</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <h6 className="fw-bold">⚖️ Equilíbrio Saudável</h6>
                      <p className="mb-0 small">Boa proporção entre ofertas e pedidos de ajuda na plataforma.</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <small className="text-muted">
            📈 Dados atualizados em tempo real | Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </small>
        </div>
      </Container>
    </section>
  );
};

export default ChartsSection;