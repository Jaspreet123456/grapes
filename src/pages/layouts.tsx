// pages/layouts.tsx
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/layouts.module.css';

interface Layout {
  id: number;
  name: string;
  html: string;
  css: string;
}

interface LayoutsProps {
  initialLayouts: Layout[];
}

const LayoutsPage: React.FC<LayoutsProps> = ({ initialLayouts }) => {
  const [layouts, setLayouts] = useState<Layout[]>(initialLayouts);

  useEffect(() => {
    const container = document.getElementById('layouts-container');
    if (container) {
      // console.log('Client HTML Content:', container.innerHTML);
    }

    const fetchLayouts = async () => {
      try {
        const res = await fetch('/api/layouts');
        const data = await res.json();
        setLayouts(data);
      } catch (error) {
        console.error('Error fetching layouts:', error);
      }
    };

    if (!initialLayouts.length) {
      fetchLayouts();
    }
  }, [initialLayouts]);

  return (
    <div>
      <h1>Saved Layouts</h1>
      <div id="layouts-container" className={styles.gridContainer}>
        {layouts.length > 0 ? (
          layouts.map((layout) => (
            <div key={layout.id} className={styles.card}>
              <h2>{layout.name}</h2>
              <div className={styles.preview} dangerouslySetInnerHTML={{ __html: layout.html }} />
              <Link href={`/editor/${layout.id}`} passHref>
                <button className={styles.previewButton}>Preview</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No layouts found.</p>
        )}
      </div>
    </div>
  );
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getServerSideProps: GetServerSideProps = async () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
    await delay(5000);

    const res = await fetch(`${siteUrl}/api/layouts`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const initialLayouts = await res.json();
    return {
      props: {
        initialLayouts,
      },
    };
  } catch (error) {
    console.error('Error fetching layouts server-side:', error);
    return {
      props: {
        initialLayouts: [],
      },
    };
  }
};

export default LayoutsPage;
