// pages/api/save-template.js
import {pool} from '@/lib/db';

export default async function handler(req : any, res : any) {
  if (req.method === 'POST') {
    try {
      const { html, css, components, styles } = req.body;

      // Insert data into your PostgreSQL database
      const result = await pool.query(
        'INSERT INTO templates (html, css, components, styles) VALUES ($1, $2, $3, $4) RETURNING id',
        [html, css, components, styles]
      );

      res.status(200).json({ success: true, templateId: result.rows[0].id });
    } catch (error) {
      console.error('Error saving template:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
