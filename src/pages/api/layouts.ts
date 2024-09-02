// pages/api/layouts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/db';

const getLayouts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await pool.query('SELECT * FROM templates');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching layouts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getLayouts;
