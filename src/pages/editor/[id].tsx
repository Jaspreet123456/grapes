import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import presetNewsletter from 'grapesjs-preset-newsletter';
import presetWebpage from 'grapesjs-preset-webpage';
import presetNavbar from 'grapesjs-navbar';
import gjsForms from 'grapesjs-plugin-forms';

interface TemplateProps {
    html: string;
    css: string;
    id: string;
}

const executeScript = (html: string) => {
    const container = document.createElement('div');
    container.innerHTML = html;
    const scripts = container.querySelectorAll('script');

    scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
            newScript.src = script.src;
        } else {
            newScript.textContent = script.textContent || '';
        }
        document.body.appendChild(newScript);
        document.body.removeChild(newScript); // Clean up
    });
};


const EditorPage: React.FC<TemplateProps> = ({ html, css, id }) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const container = document.getElementById('template-container');
            if (container) {
                // Initialize GrapesJS editor
                const editor = grapesjs.init({
                    container: '#template-container',
                    plugins: [presetNewsletter, presetWebpage, presetNavbar, gjsForms],
                    pluginsOpts: {
                        presetNewsletter: {},
                        presetWebpage: {},
                        presetNavbar: {},
                        gjsForms: {}
                    },
                    fromElement: false,
                    storageManager: false,
                    styleManager: { sectors: [] }, // Optionally hide style manager
                });

                // Set the existing template's HTML and CSS
                editor.setComponents(html);
                editor.setStyle(css);

                // Execute any scripts present in the HTML
                executeScript(html);
            }
        }
    }, [html, css]);

    return (
        <div>
            <div id="template-container" style={{ height: '100vh' }}>
                {/* GrapesJS editor will be initialized here */}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const response = await fetch(`http://localhost:3000/api/get-template/${id}`);
    const data = await response.json();

    return {
        props: {
            html: data.html || '',
            css: data.css || '',
            id: id as string,
        },
    };
};

export default EditorPage;
