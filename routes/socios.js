const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/socios", async function (req, res) {
  // consulta de articulos con filtros y paginacion

  let where = {};
  if (req.query.ApeNomSocio != undefined && req.query.ApeNomSocio !== "") {
    where.ApeNomSocio = {
      [Op.like]: "%" + req.query.ApeNomSocio + "%",
    };
  }

  let items = await db.socios.findAndCountAll({
    attributes: [
      "IdSocio",
      "ApeNomSocio",
      "NroSocio",
    ],
    order: [["ApeNomSocio", "ASC"]],
    where,
  });

  res.json(items.rows);
});

module.exports = router;