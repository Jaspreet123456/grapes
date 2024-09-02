import React, { useEffect } from "react";
import grapesjs from "grapesjs";
import presetNewsletter from 'grapesjs-preset-newsletter';
import presetWebpage from 'grapesjs-preset-webpage';
import presetNavbar from 'grapesjs-navbar';
import gjsForms from 'grapesjs-plugin-forms';

// const saveTemplate = async (editorInstance: any) => {
//   if (!editorInstance) {
//     console.error('Editor instance is undefined');
//     return;
//   }

//   try {
//     const html = editorInstance.getHtml();
//     const css = editorInstance.getCss();
//     const components = editorInstance.getComponents();
//     const styles = editorInstance.getStyle();

//     const scriptElements = Array.from(
//       document.querySelectorAll('#editor script')
//     );
//     const scripts = scriptElements.map(script => script.textContent || '').join('\n');

//     const response = await fetch('/api/save-template', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ html, css, components, styles, scripts }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       if (data.success) {
//         console.log('Template saved', data.templateId);
//         alert("Template Saved");
//       } else {
//         console.error('Error saving template:', data.error);
//       }
//     } else {
//       const text = await response.text();
//       console.error('Error saving template: Expected JSON, got:', text);
//     }
//   } catch (error) {
//     console.error('Error saving template:', error);
//   }
// };

const saveTemplate = async (editorInstance: any) => {
  if (!editorInstance) {
    console.error('Editor instance is undefined');
    return;
  }

  try {
    const html = editorInstance.getHtml();
    const css = editorInstance.getCss();
    const components = editorInstance.getComponents();
    const styles = editorInstance.getStyle();

    // Extract scripts from the editor container
    const scriptElements = Array.from(
      document.querySelectorAll('#editor script')
    ) as HTMLScriptElement[]; // Cast to HTMLScriptElement[]
    
    const scripts = scriptElements.map(script => ({
      src: script.src || '', // Handle external scripts
      content: script.textContent || '', // Handle inline scripts
    }));

    const response = await fetch('/api/save-template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html, css, components, styles, scripts }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        console.log('Template saved', data.templateId);
        alert("Template Saved");
      } else {
        console.error('Error saving template:', data.error);
      }
    } else {
      const text = await response.text();
      console.error('Error saving template: Expected JSON, got:', text);
    }
  } catch (error) {
    console.error('Error saving template:', error);
  }
};


const myCustomPlugin = (editor: any) => {
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

    if (!editorInstance || typeof editorInstance.getHtml !== 'function') {
      console.error('Editor instance is undefined or methods are not available');
      return;
    }

    console.log('Editor instance initialized:', editorInstance);

    document.getElementById('save-template-btn')?.addEventListener('click', () => {
      if (editorInstance) {
        saveTemplate(editorInstance);
      } else {
        console.error('Editor instance is not initialized.');
      }
    });
    
    return () => {
      editorInstance.destroy();
    };
  }, []);

  return <>
    <button id="save-template-btn">Save Template</button>
    <div id="editor" style={{ height: '150vh' }}></div>;
  </>
};

export default Editor;
