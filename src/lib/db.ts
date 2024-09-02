// src/lib/db.ts
import { Sequelize, DataTypes } from 'sequelize';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  logging: false,
});

// Define the Template model
const Template = sequelize.define('Template', {
  html: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  css: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  components: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  styles: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

// Sync database and models
sequelize.sync();

export { sequelize, Template, pool };
