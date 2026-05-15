import React, { useState, useEffect, CSSProperties } from 'react';
import { useProblems } from '../hooks/useProblems';
import { Layout, Row, Col } from 'antd';
import MainNav from '../components/layout/MainNav';
import AppFooter from '../components/layout/AppFooter';
import Sidebar from '../components/features/Sidebar';
import ProblemList from '../components/features/ProblemList';
import FAB from '../components/features/FAB';

const { Content } = Layout;

interface MousePosition {
  x: number;
  y: number;
}

const ProblemsPage = () => {
  const {
    problems,
    total,
    totalAll,
    currentPage,
    totalPages,
    filters,
    onFilterChange,
    onPageChange,
  } = useProblems();

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const gridStyle: CSSProperties = {
    backgroundImage: `
      linear-gradient(rgba(22, 119, 255, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 119, 255, 0.3) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
    transition: 'transform 0.3s ease-out',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  };

  return (
    <Layout className="hil-layout" style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', fontFamily: "'Courier New', Courier, monospace", overflow: 'hidden', position: 'relative' }}>
      <div className="background-grid" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, zIndex: 0 }}>
        <div style={gridStyle}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <MainNav />
      </div>

      <Content
        style={{
          paddingTop: 100,
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 1440,
          margin: '0 auto',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Row gutter={[32, 32]} align="top">
          <Col xs={24} md={6} lg={6}>
            <Sidebar filters={filters} onFilterChange={onFilterChange} />
          </Col>

          <Col xs={24} md={18} lg={18}>
            <ProblemList
              problems={problems}
              total={total}
              totalAll={totalAll}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </Col>
        </Row>
      </Content>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <AppFooter />
      </div>
      <FAB />
    </Layout>
  );
};

export default ProblemsPage;
