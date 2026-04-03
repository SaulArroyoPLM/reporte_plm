import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MOCK (luego va BD)
const vendedoras = [
  // 🇲🇽 MÉXICO
  { id: 1, nombre: "Ileana Delgado", pais: "MX", activo: true },
  { id: 2, nombre: "Ma Luisa Huertas", pais: "MX", activo: true },
  { id: 3, nombre: "Paulina Damm", pais: "MX", activo: true },

  // 🇨🇴 COLOMBIA
  { id: 4, nombre: "Leidy Barreto", pais: "CO", activo: true },
  { id: 5, nombre: "Ileana Delgado", pais: "CO", activo: true },
  { id: 6, nombre: "Ma Luisa Huertas", pais: "CO", activo: true },

  // 🇨🇱 Ecuador
  { id: 7, nombre: "Christian Yepezdelpozo", pais: "EC", activo: true },
  { id: 8, nombre: "Javier Gordon", pais: "EC", activo: true },

  // 🇵🇪 PERÚ
  { id: 9, nombre: "Giulio Ormeño", pais: "PE", activo: true },
];


// ✅ ENDPOINT CLAVE
app.get("/api/vendedoras", (req, res) => {
  const { pais } = req.query;

  const resultado = vendedoras.filter(
    v => v.pais === pais && v.activo
  );

  res.json(resultado);
});

// server
app.listen(3001, () => {
  console.log("✅ API corriendo en http://localhost:3001");
});
