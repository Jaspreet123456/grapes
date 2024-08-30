import Head from 'next/head';
import "grapesjs/dist/css/grapes.min.css";
// import Editor from '@/components/GrapesJSComponent';
import Editor from '@/components/Editor';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>GrapesJS in Next.js</title>
        <meta name="description" content="GrapesJS integration with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <Editor /> */}
        <Editor />
      </main>
    </div>
  );
};

export default Home;
