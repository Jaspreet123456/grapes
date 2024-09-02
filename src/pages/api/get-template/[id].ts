import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const result = await pool.query('SELECT html, css FROM templates WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Template not found' });
      return;
    }

    const template = result.rows[0];
    res.status(200).json({
      html: template.html,
      css: template.css
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
