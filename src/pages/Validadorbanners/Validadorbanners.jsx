import React, { useState } from "react";
import {
  Container, Row, Col, Card, Form, Button,
  Badge, ProgressBar, Alert
} from "react-bootstrap";

const BANNER_DATA = {
  app: [
    { tipo: "Pantalla de bienvenida", medidas: [{ label: "Única", valor: "1050x614" }] },
    { tipo: "Icono podcast", medidas: [{ label: "Única", valor: "300x300" }] },
    { tipo: "Banner home", medidas: [{ label: "Medida 1", valor: "960x240" }, { label: "Medida 2", valor: "1400x256" }, { label: "Medida alterna", valor: "1024x256" }] },
    { tipo: "Banner keyword", medidas: [{ label: "Medida 1", valor: "960x240" }, { label: "Medida 2", valor: "1400x256" }, { label: "Medida alterna", valor: "1024x256" }] },
    { tipo: "Logo Push notification", medidas: [{ label: "Única", valor: "200x200" }] },
    { tipo: "Video pantalla bienvenida", medidas: [{ label: "Única", valor: "1280x720" }] },
    { tipo: "Push notification", medidas: [{ label: "Única", valor: "512x256" }] },
  ],
  web: [
    { tipo: "Banner home", medidas: [{ label: "Única", valor: "1020x320" }] },
    { tipo: "Banner inteligente Keyword", medidas: [{ label: "Medida 1", valor: "285x517" }, { label: "Medida 2", valor: "649x325" }] },
    { tipo: "Banner product Page", medidas: [{ label: "Medida 1", valor: "285x517" }, { label: "Medida 2", valor: "649x325" }] },
    { tipo: "Banner contenido médico", medidas: [{ label: "Medida 1", valor: "285x517" }, { label: "Medida 2", valor: "649x325" }] },
    { tipo: "Banner enciclopedias pacientes", medidas: [{ label: "Medida 1", valor: "285x517" }, { label: "Medida 2", valor: "649x325" }] },
    { tipo: "Podcast miniatura", medidas: [{ label: "Única", valor: "300x300" }] },
    { tipo: "Miniaturas", medidas: [{ label: "Única", valor: "172x168" }] },
  ],
};

const PAISES = [
  { value: "mex", label: "México" },
  { value: "col", label: "Colombia" },
  { value: "ecu", label: "Ecuador" },
  { value: "per", label: "Perú" },
];

const pad = (n) => String(n).padStart(2, "0");

const hoy = () => {
  const d = new Date();
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
};

const normalizar = (str) =>
  str
    .toLowerCase()
    .replace(/ /g, "")
    .replace(/á/g, "a").replace(/é/g, "e")
    .replace(/í/g, "i").replace(/ó/g, "o")
    .replace(/ú/g, "u");

export default function ValidadorBanners() {
  const [plataforma, setPlataforma] = useState("");
  const [tipoBanner, setTipoBanner] = useState("");
  const [pais, setPais] = useState("");
  const [marca, setMarca] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [extension, setExtension] = useState("jpg");
  const [checks, setChecks] = useState({});

  const bannerOpts = plataforma ? BANNER_DATA[plataforma] : [];
  const bannerSel = bannerOpts.find((b) => b.tipo === tipoBanner);
  const plataformaCode = plataforma === "app" ? "plmmedicamemov5" : "medplmcom";

  const generarNombres = () => {
    if (!pais || !tipoBanner || !marca || !laboratorio || !bannerSel) return [];
    const base = `${pais}_${hoy()}_${normalizar(plataformaCode)}_${normalizar(marca)}_${normalizar(laboratorio)}`;
    return bannerSel.medidas.map((m) => ({
      medida: m,
      nombre: `${base}.${extension}`,
    }));
  };

  const nombresGen = generarNombres();

  const checkItems = bannerSel
    ? bannerSel.medidas.map((m) => ({
        id: `medida_${m.valor}`,
        label: `${m.label}: ${m.valor} px — ¿cumple la medida?`,
      }))
    : [];

  const extraChecks = [
    { id: "resolucion", label: "Resolución correcta (72 dpi pantalla / 150+ impresión)" },
    { id: "formato", label: `Formato de archivo correcto (.${extension})` },
    { id: "nombre_ok", label: "Nomenclatura revisada y sin espacios" },
    { id: "contenido", label: "Contenido aprobado por el cliente" },
  ];

  const allChecks = [...checkItems, ...extraChecks];
  const totalChecks = allChecks.length;
  const totalOk = allChecks.filter((c) => checks[c.id]).length;
  const porcentaje = totalChecks > 0 ? Math.round((totalOk / totalChecks) * 100) : 0;
  const listo = totalOk === totalChecks && totalChecks > 0;

  const destinos =
    plataforma === "app"
      ? [{ carpeta: "app_plm/new_banners", servicio: "OneDrive" }]
      : plataforma === "web"
      ? [
          { carpeta: "AWS bucket — ruta web_plm", servicio: "AWS S3" },
          { carpeta: "web_plm/new_banners", servicio: "OneDrive" },
        ]
      : [];

  const toggle = (id) =>
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));

  const resetForm = () => {
    setPlataforma(""); setTipoBanner(""); setPais("");
    setMarca(""); setLaboratorio(""); setExtension("jpg");
    setChecks({});
  };

  return (
    <Container className="mt-4 mb-5">

      {/* Header */}
      <Row className="mb-4">
        <Col>
          <p className="text-muted mb-1" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500 }}>
            PLM Media
          </p>
          <h3 className="mb-1">Validador de banners</h3>
          <p className="text-muted mb-0" style={{ fontSize: 14 }}>
            Checklist rápido · Nomenclatura automática · Destino de entrega
          </p>
        </Col>
      </Row>

      {/* Barra de progreso */}
      {totalChecks > 0 && (
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between mb-1">
              <small className="text-muted">Progreso del checklist</small>
              <small className={listo ? "text-success fw-bold" : "text-muted"}>
                {totalOk}/{totalChecks}
              </small>
            </div>
            <ProgressBar
              now={porcentaje}
              variant={listo ? "success" : "primary"}
              style={{ height: 5 }}
            />
          </Col>
        </Row>
      )}

      {/* PASO 1 y PASO 2 */}
      <Row className="mb-4">

        {/* Paso 1 — Plataforma y tipo */}
        <Col md={6} className="mb-3 mb-md-0">
          <Card className="h-100">
            <Card.Body>
              <StepLabel n={1} texto="Plataforma y tipo de banner" />

              <Form.Label className="text-muted" style={{ fontSize: 12, fontWeight: 500 }}>
                Plataforma
              </Form.Label>
              <div className="d-flex gap-2 mb-3">
                {["app", "web"].map((p) => (
                  <Button
                    key={p}
                    variant={plataforma === p ? (p === "app" ? "primary" : "success") : "outline-secondary"}
                    className="flex-fill"
                    onClick={() => { setPlataforma(p); setTipoBanner(""); setChecks({}); }}
                  >
                    {p === "app" ? "Aplicación" : "Web"}
                  </Button>
                ))}
              </div>

              {plataforma && (
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted" style={{ fontSize: 12, fontWeight: 500 }}>
                    Tipo de banner
                  </Form.Label>
                  <Form.Select
                    value={tipoBanner}
                    onChange={(e) => { setTipoBanner(e.target.value); setChecks({}); }}
                  >
                    <option value="">Selecciona el tipo...</option>
                    {BANNER_DATA[plataforma].map((b) => (
                      <option key={b.tipo} value={b.tipo}>{b.tipo}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}

              {bannerSel && (
                <>
                  <p className="text-muted mb-2" style={{ fontSize: 12, fontWeight: 500 }}>
                    Medidas requeridas
                  </p>
                  {bannerSel.medidas.map((m) => (
                    <div
                      key={m.valor}
                      className="d-flex justify-content-between align-items-center px-3 py-2 rounded mb-2"
                      style={{ background: "#f8f9fa", border: "1px solid #dee2e6" }}
                    >
                      <span className="text-muted" style={{ fontSize: 13 }}>{m.label}</span>
                      <Badge bg="primary" style={{ fontFamily: "monospace", fontWeight: 400 }}>
                        {m.valor} px
                      </Badge>
                    </div>
                  ))}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Paso 2 — Datos nomenclatura */}
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <StepLabel n={2} texto="Datos para la nomenclatura" />

              <Form.Group className="mb-3">
                <Form.Label className="text-muted" style={{ fontSize: 12, fontWeight: 500 }}>País</Form.Label>
                <Form.Select value={pais} onChange={(e) => setPais(e.target.value)}>
                  <option value="">Selecciona país...</option>
                  {PAISES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label} ({p.value})</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-muted" style={{ fontSize: 12, fontWeight: 500 }}>Marca</Form.Label>
                <Form.Control
                  type="text"
                  value={marca}
                  placeholder="ej: Lipitor"
                  onChange={(e) => setMarca(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-muted" style={{ fontSize: 12, fontWeight: 500 }}>Laboratorio</Form.Label>
                <Form.Control
                  type="text"
                  value={laboratorio}
                  placeholder="ej: Pfizer"
                  onChange={(e) => setLaboratorio(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-muted" style={{ fontSize: 12, fontWeight: 500 }}>Extensión del archivo</Form.Label>
                <div className="d-flex gap-2">
                  {["jpg", "png", "gif", "mp4"].map((ext) => (
                    <Button
                      key={ext}
                      size="sm"
                      variant={extension === ext ? "secondary" : "outline-secondary"}
                      onClick={() => setExtension(ext)}
                    >
                      .{ext}
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Paso 3 — Nomenclatura generada */}
      {nombresGen.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <StepLabel n={3} texto="Nomenclatura generada" />
                {nombresGen.map(({ medida, nombre }) => (
                  <div key={medida.valor} className="mb-3">
                    <p className="text-muted mb-1" style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1 }}>
                      {medida.label} — {medida.valor} px
                    </p>
                    <div
                      className="d-flex align-items-center justify-content-between px-3 py-2 rounded"
                      style={{ background: "#e8f0fe", border: "1px solid #b8d0f9" }}
                    >
                      <code style={{ fontSize: 13, color: "#1a4fa0", wordBreak: "break-all" }}>
                        {nombre}
                      </code>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="ms-3"
                        onClick={() => navigator.clipboard?.writeText(nombre)}
                      >
                        Copiar
                      </Button>
                    </div>
                  </div>
                ))}
                <p className="text-muted mb-0" style={{ fontSize: 11 }}>
                  Código plataforma: <strong>{plataformaCode}</strong> · Fecha: {hoy()}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Paso 4 — Checklist */}
      {bannerSel && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <StepLabel n={4} texto="Checklist de validación" />
                {allChecks.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className="d-flex align-items-center gap-2 px-3 py-2 rounded mb-2"
                    style={{
                      cursor: "pointer",
                      background: checks[item.id] ? "#d1e7dd" : "#f8f9fa",
                      border: `1px solid ${checks[item.id] ? "#a3cfbb" : "#dee2e6"}`,
                      transition: "all 0.15s",
                    }}
                  >
                    <Form.Check
                      type="checkbox"
                      checked={!!checks[item.id]}
                      onChange={() => toggle(item.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span
                      className={checks[item.id] ? "text-success" : ""}
                      style={{
                        fontSize: 13,
                        textDecoration: checks[item.id] ? "line-through" : "none",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Destino final */}
      {listo && destinos.length > 0 && (
        <Row>
          <Col>
            <Alert variant="success">
              <Alert.Heading style={{ fontSize: 16 }}>
                Todo listo — destino de entrega
              </Alert.Heading>
              {destinos.map((d, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center gap-2 bg-white rounded px-3 py-2 mb-2"
                  style={{ border: "1px solid #a3cfbb" }}
                >
                  <Badge bg="success" style={{ fontWeight: 400 }}>{d.servicio}</Badge>
                  <code style={{ fontSize: 13 }}>{d.carpeta}</code>
                </div>
              ))}
              <Button variant="outline-success" size="sm" className="mt-2" onClick={resetForm}>
                Validar otro banner
              </Button>
            </Alert>
          </Col>
        </Row>
      )}

    </Container>
  );
}

function StepLabel({ n, texto }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-3">
      <div
        className="rounded-circle d-flex align-items-center justify-content-center text-muted"
        style={{
          width: 24, height: 24, border: "1px solid #dee2e6",
          fontSize: 11, fontWeight: 500, background: "#f8f9fa", flexShrink: 0
        }}
      >
        {n}
      </div>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{texto}</span>
    </div>
  );
}