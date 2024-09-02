// pages/template/[id].tsx
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

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const myCustomPlugin = (editor: any) => {
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

  interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  }

  const script = function (this: HTMLElement) {
    const apiEndpoint = 'https://dummyjson.com/products';

    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        const products = data.products.slice(0, 6);
        console.log('Product data:', products);

        const productCards = products.map((product: Product) => `
                    <div class="product-card" style="border: 1px solid #ddd; padding: 10px; margin: 10px; border-radius: 5px; text-align: center;">
                        <img src="${product.thumbnail}" alt="${product.title}" class="product-image" style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;" />
                        <h3 class="product-title" style="margin: 10px 0;">${product.title}</h3>
                        <p class="product-price" style="font-weight: bold;">$${product.price}</p>
                    </div>
                `).join('');

        this.innerHTML = `
                    <style>
                        .product-container {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 10px;
                            justify-content: center;
                        }
                        .product-card {
                            flex: 1 1 100%;
                        }
                        @media (min-width: 600px) {
                            .product-card {
                                flex: 1 1 48%; /* 2 items per row on tablets */
                            }
                        }
                        @media (min-width: 960px) {
                            .product-card {
                                flex: 1 1 30%; /* 3 items per row on larger screens */
                            }
                        }
                    </style>
                    <div class="product-container">
                        ${productCards}
                    </div>
                `;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  editor.Components.addType('comp-with-js', {
    model: {
      defaults: {
        script,
        style: {
          width: '100%',
          minHeight: '300px',
          background: 'white',
          overflow: 'auto'
        }
      }
    }
  });

  editor.BlockManager.add('test-block', {
    label: 'Product Block',
    attributes: { class: 'fa fa-box' },
    content: { type: 'comp-with-js' },
  });
};

const TemplatePage: React.FC<TemplateProps> = ({ html, css, id }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const container = document.getElementById('template-container');
      if (container) {
        container.innerHTML = html;
        // Apply CSS (ensure it's applied correctly)
        const style = document.createElement('style');
        style.innerHTML = css;
        container.appendChild(style);
        
        // Execute any scripts if necessary
        executeScript(container); 
      }
    }
  }, [html, css]);


  const saveTemplate = async (editor: any, id: string) => {
    const html = editor.getHtml();
    const css = editor.getCss();

    try {
      const response = await fetch(`/api/update-template/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, html, css }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Template saved successfully:', data);
      } else {
        console.error('Error saving template:', data);
      }
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  return (
    <div>
      <div id="template-container">
        {/* The editor will be initialized here */}
      </div>
    </div>
  );
};

const executeScript = (element: HTMLElement) => {
  const scriptElement = element.querySelector('script');
  if (scriptElement) {
    const scriptContent = scriptElement.textContent || '';
    new Function(scriptContent).call(element);
  }
};

// const TemplatePage: React.FC<TemplateProps> = ({ html, css, id }) => {
//   // useEffect(() => {
//   //   if (typeof window !== 'undefined') {
//   //     const editorInstance = grapesjs.init({
//   //       container: "#editor",
//   //       fromElement: true,
//   //       storageManager: {
//   //         id: 'gjs-',
//   //         type: 'local',
//   //         autosave: true,
//   //         autoload: true,
//   //         stepsBeforeSave: 1,
//   //         // storeComponents: true,
//   //         // storeStyles: true,
//   //         // storeHtml: true,
//   //         // storeCss: true,
//   //       },
//   //       plugins: [presetNewsletter, presetWebpage, presetNavbar, gjsForms, myCustomPlugin],
//   //       pluginsOpts: {
//   //         'grapesjs-preset-newsletter': {},
//   //         'grapesjs-preset-webpage': {},
//   //         'grapesjs-navbar': {},
//   //         'gjsForms': {},
//   //         'grapesjs-templates': {}
//   //       }
//   //     });
//   //     const container = document.getElementById('template-container');
//   //     if (container) {
//   //       container.innerHTML = html;
//   //       // const styleElement = document.createElement('style');
//   //       // styleElement.textContent = css;
//   //       // document.head.appendChild(styleElement);
//   //       // executeScript(container);
//   //     }

//   //     if (!editorInstance || typeof editorInstance.getHtml !== 'function') {
//   //       console.error('Editor instance is undefined or methods are not available');
//   //       return;
//   //     }
  
//   //     console.log('Editor instance initialized:', editorInstance);
      
//   //     return () => {
//   //       editorInstance.destroy();
//   //     };
//   //   }
//   // }, [html,css,id]);

//     useEffect(() => {
//       if (typeof window !== 'undefined') {
//         import('grapesjs').then(({ default: grapesjs }) => {
//           const editor = grapesjs.init({
//             container: '#editor',
//             fromElement: true,
//             // Set additional GrapesJS options here
//           });
          
//           // Set the HTML and CSS in the editor
//           editor.setComponents(html);
//           editor.setStyle(css);
//           // Save button event listener
//           // document.getElementById('save-template')?.addEventListener('click', () => {
//           //   // saveTemplate(editor, id);
//           // });
//         }).catch(err => console.error(err));
//       }
//     }, [html, css, id]);
//   return (
//     <div id='editor'>
//       <div id="template-container" style={{ minHeight: '100vh' }} />
//     </div>
//   );
// };

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

export default TemplatePage;
