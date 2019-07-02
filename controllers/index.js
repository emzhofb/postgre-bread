const pool = require('../models/data');

exports.getIndex = (req, res) => {
  let sql = `SELECT count(*) FROM public.datatypes`;

  const page = Number(req.params.page) || 1;
  const perPage = 3;
  const queries = req.query;

  pool.query(sql, (err, count) => {
    const total = count.rows[0].count;
    const pages = Math.ceil(total / perPage);
    const offset = (page - 1) * perPage;

    sql = `SELECT * FROM public.datatypes ORDER BY id ASC`;
    sql += ` LIMIT ${perPage} OFFSET ${offset}`;

    pool.query(sql, [], (err, rows) => {
      if (err) console.log(err);

      res.render('index', { 
        data: rows.rows,
        query: queries,
        current: page,
        pages: pages
      });
    });
  });
};
