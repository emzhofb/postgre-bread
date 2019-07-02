const pool = require('../models/data');

exports.getIndex = (req, res) => {
  const sql = `SELECT * FROM public.datatypes ORDER BY id ASC`;

  pool.query(sql, [], (err, rows) => {
    if (err) console.log(err);

    res.render('index', { data: rows.rows });
  });
};
