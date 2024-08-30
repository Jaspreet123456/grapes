import React, { useEffect } from "react";
import grapesjs from "grapesjs";
import presetNewsletter from 'grapesjs-preset-newsletter';
import presetWebpage from 'grapesjs-preset-webpage';
import presetNavbar from 'grapesjs-navbar';
import gjsForms from 'grapesjs-plugin-forms';

const myCustomPlugin = (editor) => {
    editor.BlockManager.add('centered-block', {
        label: 'Centered Block',
        content: `
      <div style="display: flex; justify-content: center; align-items: center; height: 200px; border: 1px solid #ddd;">
        <p style="text-align: center;">This is a centered block.</p>
      </div>
    `,
        category: 'Custom Blocks',
        attributes: { class: 'gjs-fonts gjs-f-text' },
    });

    editor.BlockManager.add('two-column-block', {
        label: '2 Columns Section',
        content: `
        <section style="display: flex; flex-wrap: wrap; gap: 10px; padding: 20px; background-color: #f0f0f0;">
          <div style="flex: 1 1 45%; min-width: 250px; background-color: #ffffff; padding: 10px;">
            <p>Column 1 content goes here.</p>
          </div>
          <div style="flex: 1 1 45%; min-width: 250px; background-color: #ffffff; padding: 10px;">
            <p>Column 2 content goes here.</p>
          </div>
        </section>
      `,
        category: 'Custom Blocks',
        attributes: { class: 'gjs-fonts gjs-f-b2' },
    });

    editor.BlockManager.add('custom-footer-block', {
        label: 'Custom Footer',
        content: `
          <footer style="background-color: #333; color: #fff; padding: 20px;">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px;">
                <h4 style="margin-top: 0;">Company Name</h4>
                <p>1234 Street Name, City, Country</p>
                <p>Phone: +123456789</p>
              </div>
              <div style="flex: 1; min-width: 200px;">
                <h4 style="margin-top: 0;">Quick Links</h4>
                <ul style="list-style: none; padding: 0;">
                  <li><a href="#" style="color: #fff; text-decoration: none;">About Us</a></li>
                  <li><a href="#" style="color: #fff; text-decoration: none;">Services</a></li>
                  <li><a href="#" style="color: #fff; text-decoration: none;">Contact</a></li>
                </ul>
              </div>
              <div style="flex: 1; min-width: 200px;">
                <h4 style="margin-top: 0;">Follow Us</h4>
                <a href="#" style="color: #fff; margin-right: 10px; text-decoration: none;">Facebook</a>
                <a href="#" style="color: #fff; margin-right: 10px; text-decoration: none;">Twitter</a>
                <a href="#" style="color: #fff; text-decoration: none;">Instagram</a>
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px; border-top: 1px solid #555; padding-top: 10px;">
              <p>&copy; 2024 Company Name. All rights reserved.</p>
            </div>
          </footer>
        `,
        category: 'Custom Blocks',
        attributes: { class: 'gjs-fonts gjs-f-footer' },
    });

    editor.BlockManager.add('map-block', {
        label: 'Map Block',
        content: `
          <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0;">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1460874796285!2d144.96305831532077!3d-37.81410797975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57759da5f5e56c3!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1630567181230!5m2!1sen!2sus" 
              width="600" 
              height="450" 
              style="border:0; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
              allowfullscreen="" 
              loading="lazy">
            </iframe>
          </div>
        `,
        category: 'Custom Blocks',
        attributes: { class: 'gjs-fonts gjs-f-map' },
    });
};


const Editor: React.FC = () => {
    useEffect(() => {
        const editorInstance = grapesjs.init({
            container: "#editor",
            fromElement: true,
            storageManager: {
                id: 'gjs-',
                type: 'local',
                autosave: true,
                autoload: true,
                stepsBeforeSave: 1,
                storeComponents: true,
                storeStyles: true,
                storeHtml: true,
                storeCss: true,
            },
            plugins: [presetNewsletter, presetWebpage, presetNavbar, gjsForms, myCustomPlugin],
            pluginsOpts: {
                'grapesjs-preset-newsletter': {},
                'grapesjs-preset-webpage': {},
                'grapesjs-navbar': {},
                'gjsForms': {},
                'grapesjs-templates': {}
            }
        });

        return () => {
            editorInstance.destroy();
        };
    }, []);

    return <div id="editor" style={{ height: '150vh' }}></div>;
};

export default Editor;
