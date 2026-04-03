import React, { useState } from "react";
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import './ps.css';

// Replica exacta de tu fórmula Excel
const generarNombre = (pais, laboratorio, marca, formaFarma, gramaje) => {
  const juntar = [pais, laboratorio, marca, formaFarma, gramaje]
    .map(v => v?.trim() || '')
    .join('_');

  return juntar
    .toLowerCase()
    .replace(/ /g, '')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u');
};

const filaVacia = () => ({
  id: Date.now(),
  pais: '',
  laboratorio: '',
  marca: '',
  formaFarma: '',
  gramaje: '',
});

function ProductoShot() {
  const [filas, setFilas] = useState([filaVacia()]);

  const handleChange = (id, campo, valor) => {
    setFilas(prev =>
      prev.map(fila =>
        fila.id === id ? { ...fila, [campo]: valor } : fila
      )
    );
  };

  const agregarFila = () => {
    setFilas(prev => [...prev, filaVacia()]);
  };

  const eliminarFila = (id) => {
    setFilas(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = filas.map(f => ({
      ...f,
      nombre: generarNombre(f.pais, f.laboratorio, f.marca, f.formaFarma, f.gramaje),
    }));
    console.log(resultado);
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="mb-4">
        <Col>
          <h3 className="mb-0">Formato para Producto Shots</h3>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <h5 className="titulo_formato mb-3">Información de la campaña</h5>

        <Table bordered hover responsive size="sm">
          <thead className="table-light">
            <tr>
              <th>País</th>
              <th>Laboratorio</th>
              <th>Marca</th>
              <th>Forma farmacéutica</th>
              <th>Gramaje</th>
              <th style={{ minWidth: '260px' }}>Nombre generado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => {
              const nombreGenerado = generarNombre(
                fila.pais,
                fila.laboratorio,
                fila.marca,
                fila.formaFarma,
                fila.gramaje
              );

              return (
                <tr key={fila.id}>
                  {/* País */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={fila.pais}
                      onChange={e => handleChange(fila.id, 'pais', e.target.value)}
                    >
                      <option value="">--</option>
                      <option value="mex">mex</option>
                      <option value="col">col</option>
                      <option value="ecu">ecu</option>
                      <option value="per">per</option>
                    </Form.Select>
                  </td>

                  {/* Laboratorio */}
                  <td>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={fila.laboratorio}
                      onChange={e => handleChange(fila.id, 'laboratorio', e.target.value)}
                      placeholder="Laboratorio"
                    />
                  </td>

                  {/* Marca */}
                  <td>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={fila.marca}
                      onChange={e => handleChange(fila.id, 'marca', e.target.value)}
                      placeholder="Marca"
                    />
                  </td>

                  {/* Forma farmacéutica */}
                  <td>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={fila.formaFarma}
                      onChange={e => handleChange(fila.id, 'formaFarma', e.target.value)}
                      placeholder="Ej: tabsrecu30"
                    />
                  </td>

                  {/* Gramaje */}
                  <td>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={fila.gramaje}
                      onChange={e => handleChange(fila.id, 'gramaje', e.target.value)}
                      placeholder="Ej: 10mg"
                    />
                  </td>

                  {/* Nombre generado — se actualiza en tiempo real */}
                  <td>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: nombreGenerado ? '#198754' : '#aaa',
                        wordBreak: 'break-all',
                      }}
                    >
                      {nombreGenerado || '—'}
                    </span>
                  </td>

                  {/* Eliminar fila */}
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => eliminarFila(fila.id)}
                      disabled={filas.length === 1}
                    >
                      ✕
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Acciones */}
        <div className="d-flex gap-2 mt-2">
          <Button variant="outline-secondary" onClick={agregarFila}>
            + Agregar producto
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ProductoShot;