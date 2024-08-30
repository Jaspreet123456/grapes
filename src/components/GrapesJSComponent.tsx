// import { useEffect } from "react";
// import grapesjs from "grapesjs";
// import "grapesjs/dist/css/grapes.min.css";
// import "grapesjs-preset-webpage";

// // Define the custom plugin
// const customPlugin = (editor) => {
//   // Add a new block to the BlockManager
//   editor.BlockManager.add('alert-button', {
//     label: 'Alert Button',
//     content: `<button class="alert-btn">Click Me!</button>`,
//     category: 'Basic',
//     attributes: { class: 'fa fa-bell' },
//   });

//   // Add an image block
//   editor.BlockManager.add('image-block', {
//     label: 'Image Block',
//     content: `<img src="https://via.placeholder.com/300" alt="Placeholder Image" style="max-width: 100%;" />`,
//     category: 'Basic',
//     attributes: { class: 'fa fa-image' },
//   });

//   // Add a text block
//   editor.BlockManager.add('text-block', {
//     label: 'Text Block',
//     content: `<p>Sample text block content</p>`,
//     category: 'Basic',
//     attributes: { class: 'fa fa-font' },
//   });

//   // Add a 1 Column block
//   editor.BlockManager.add('one-column', {
//     label: '1 Column',
//     content: `<div class="row"><div class="col-12">1 Column Content</div></div>`,
//     category: 'Layout',
//     attributes: { class: 'fa fa-columns' },
//   });

//   // Add a 2 Column block
//   editor.BlockManager.add('two-column', {
//     label: '2 Columns',
//     content: `<div class="row"><div class="col-6">Column 1</div><div class="col-6">Column 2</div></div>`,
//     category: 'Layout',
//     attributes: { class: 'fa fa-columns' },
//   });

//   // Add a 3 Column block
//   editor.BlockManager.add('three-column', {
//     label: '3 Columns',
//     content: `<div class="row"><div class="col-4">Column 1</div><div class="col-4">Column 2</div><div class="col-4">Column 3</div></div>`,
//     category: 'Layout',
//     attributes: { class: 'fa fa-columns' },
//   });

//   // Add a 2 Columns 3/7 block
//   editor.BlockManager.add('two-column-3-7', {
//     label: '2 Columns (3/7)',
//     content: `<div class="row"><div class="col-3">Column 1</div><div class="col-9">Column 2</div></div>`,
//     category: 'Layout',
//     attributes: { class: 'fa fa-columns' },
//   });

//   // Add a text section block
//   editor.BlockManager.add('text-section', {
//     label: 'Text Section',
//     content: `<section><h2>Section Title</h2><p>Section content here.</p></section>`,
//     category: 'Basic',
//     attributes: { class: 'fa fa-text' },
//   });

//   // Add a form block
//   editor.BlockManager.add('form-block', {
//     label: 'Form Block',
//     content: `
//       <form>
//         <label for="name">Name:</label>
//         <input type="text" id="name" name="name" />
//         <label for="email">Email:</label>
//         <input type="email" id="email" name="email" />
//         <input type="submit" value="Submit" />
//       </form>`,
//     category: 'Forms',
//     attributes: { class: 'fa fa-form' },
//   });

//   // Add an input block
//   editor.BlockManager.add('input-block', {
//     label: 'Input Block',
//     content: `<input type="text" placeholder="Enter text here" />`,
//     category: 'Forms',
//     attributes: { class: 'fa fa-input' },
//   });

//   editor.BlockManager.add('card-block', {
//     label: 'Card Block',
//     content: `
//       <div class="card">
//         <img src="https://via.placeholder.com/300" alt="Card Image" class="card-img">
//         <div class="card-body">
//           <h5 class="card-title">Card Title</h5>
//           <p class="card-text">Card content goes here.</p>
//           <a href="#" class="btn btn-primary">Learn More</a>
//         </div>
//       </div>`,
//     category: 'Basic',
//     attributes: { class: 'fa fa-card' },
//   });

//   // Add a link block
//   editor.BlockManager.add('link-block', {
//     label: 'Link Block',
//     content: `<a href="#" class="link-block">Your Link</a>`,
//     category: 'Basic',
//     attributes: { class: 'fa fa-link' },
//   });

//   editor.BlockManager.add('video-block', {
//     label: 'Video Block',
//     content: `
//       <div class="video-block">
//         <video controls>
//           <source src="https://www.example.com/video.mp4" type="video/mp4">
//           <source src="https://www.example.com/video.ogg" type="video/ogg">
//           <p>Your browser does not support the video tag.</p>
//         </video>
//       </div>`,
//     category: 'Media',
//     attributes: { class: 'fa fa-video' },
//   });

//   // Add a map block
//   editor.BlockManager.add('map-block', {
//     label: 'Map Block',
//     content: `<div class="map-block"><iframe src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJsQ5Y3K7w2EcR66UjcJ2ptvE&key=YOUR_API_KEY" style="width: 100%; height: 300px; border: 0;" allowfullscreen></iframe></div>`,
//     category: 'Media',
//     attributes: { class: 'fa fa-map' },
//   });

//   // Add a quote block
//   editor.BlockManager.add('quote-block', {
//     label: 'Quote Block',
//     content: `<blockquote class="quote-block"><p>"This is a sample quote."</p><footer>— Author</footer></blockquote>`,
//     category: 'Basic',
//     attributes: { class: 'fa fa-quote-left' },
//   });

//   // Add a navbar block
//   editor.BlockManager.add('navbar-block', {
//     label: 'Navbar Block',
//     content: `
//       <nav class="navbar navbar-expand-lg navbar-light bg-light">
//         <a class="navbar-brand" href="#">Navbar</a>
//         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarNav">
//           <ul class="navbar-nav">
//             <li class="nav-item active">
//               <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#">Features</a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#">Pricing</a>
//             </li>
//           </ul>
//         </div>
//       </nav>`,
//     category: 'Layout',
//     attributes: { class: 'fa fa-bars' },
//   });

//   // Add a countdown block
//   editor.BlockManager.add('countdown-block', {
//     label: 'Countdown Block',
//     content: `<div class="countdown-block">
//       <div id="countdown" style="font-size: 2rem; text-align: center;">00:00:00</div>
//     </div>`,
//     category: 'Basic',
//     attributes: { class: 'fa fa-clock' },
//   });

//   // Add a text area block
//   editor.BlockManager.add('textarea-block', {
//     label: 'Text Area Block',
//     content: `<textarea rows="4" placeholder="Enter your text here..."></textarea>`,
//     category: 'Forms',
//     attributes: { class: 'fa fa-textarea' },
//   });

//   // Add a select block
//   editor.BlockManager.add('select-block', {
//     label: 'Select Block',
//     content: `<select>
//       <option value="option1">Option 1</option>
//       <option value="option2">Option 2</option>
//       <option value="option3">Option 3</option>
//     </select>`,
//     category: 'Forms',
//     attributes: { class: 'fa fa-caret-down' },
//   });

//   // Add a label block
//   editor.BlockManager.add('label-block', {
//     label: 'Label Block',
//     content: `<label for="example">Label Text:</label>`,
//     category: 'Forms',
//     attributes: { class: 'fa fa-tag' },
//   });

//   // Add a checkbox block
//   editor.BlockManager.add('checkbox-block', {
//     label: 'Checkbox Block',
//     content: `<input type="checkbox" id="checkbox1"><label for="checkbox1">Check me</label>`,
//     category: 'Forms',
//     attributes: { class: 'fa fa-check-square' },
//   });

//   // Add a radio button block
//   editor.BlockManager.add('radio-block', {
//     label: 'Radio Button Block',
//     content: `<input type="radio" id="radio1" name="radio-group"><label for="radio1">Option 1</label><br>
//               <input type="radio" id="radio2" name="radio-group"><label for="radio2">Option 2</label>`,
//     category: 'Forms',
//     attributes: { class: 'fa fa-dot-circle' },
//   });

//   // Add a button block
//   editor.BlockManager.add('button-block', {
//     label: 'Button Block',
//     content: `<button class="btn btn-secondary">Click Me!</button>`,
//     category: 'Basic',
//     attributes: { class: 'fa fa-button' },
//   });

//   // Add custom CSS to the editor
//   const addCustomCss = () => {
//     const css = `
//     .favorite-products {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 10px;
//     }

//     .product-card {
//       flex: 1 1 calc(33.333% - 20px); /* Adjust for 3 items per row */
//       box-sizing: border-box;
//       border: 1px solid #ddd;
//       border-radius: 4px;
//       padding: 10px;
//       text-align: center;
//     }

//     .product-card img {
//       max-width: 100%;
//       height: auto;
//     }

//     .product-card h3 {
//       margin: 10px 0 5px;
//     }

//     .product-card p {
//       margin: 0;
//       color: #333;
//     }

//       .alert-btn {
//         background-color: #f00;
//         color: #fff;
//         border: none;
//         padding: 10px 20px;
//         cursor: pointer;
//       }

//       .alert-btn:hover {
//         background-color: #c00;
//       }

//       .txt-red {
//         color: red;
//       }

//       .row {
//         display: flex;
//         flex-wrap: wrap;
//         margin: -15px;
//       }

//       .col-12, .col-6, .col-4, .col-3, .col-9 {
//         padding: 15px;
//         box-sizing: border-box;
//       }

//       .col-12 { width: 100%; margin-top:20px }
//       .col-6 { width: 50%; margin-top:20px }
//       .col-4 { width: 33.33%; margin-top:20px }
//       .col-3 { width: 25%; margin-top:20px }
//       .col-9 { width: 75%; margin-top:20px}
//     `;

//     editor.CssComposer.addRules(css);
//   };

//   // Call custom CSS function
//   addCustomCss();

//   // Handle clicks in preview mode
//   editor.on('run:preview', () => {
//     const iframe = editor.Canvas.getFrameEl().contentWindow;
//     iframe.document.addEventListener('click', (event) => {
//       const el = event.target;
//       if (el && el.classList.contains('alert-btn')) {
//         alert('Button clicked!');
//       }
//     });
//   });

//   // Add a delete button to the toolbar
// };

// const Editor = () => {
//   useEffect(() => {
//     // Initialize GrapesJS editor
//     const editor = grapesjs.init({
//       container: '#gjs',
//       height: '500px',
//       width: '100%',
//       fromElement: true,
//       storageManager: false,
//       plugins: [customPlugin],  // Register the custom plugin here
//       pluginsOpts: {
//         'grapesjs-preset-webpage': {}  // Initialize the webpage preset if needed
//       }

//     });

//     // const editor = grapesjs.init({
//     //   container: '#gjs',
//     //   width: '100%',
//     //   height: '500px',
//     //   storageManager: false,
//     //   fromElement: true,
//     //   pluginsOpts: {
//     //     'grapesjs-preset-webpage': {}  // Initialize the webpage preset if needed
//     //   },
//     //   blockManager: {
//     //     appendTo: '.myblocks',
//     //     blocks: [
//     //       {
//     //         id: 'image',
//     //         label: 'Image',
//     //         media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
//     //             <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
//     //         </svg>`,
//     //         // Use `image` component
//     //         content: { type: 'image' },
//     //         // The component `image` is activatable (shows the Asset Manager).
//     //         // We want to activate it once dropped in the canvas.
//     //         activate: true,
//     //         // select: true, // Default with `activate: true`
//     //       }
//     //     ],
//     //   }
//     // });

//     // Cleanup function to destroy the editor instance
//     return () => {
//       editor.destroy();
//     };
//   }, []);

//   return (
//     <div id="gjs">
//       <div className="txt-red">Hello GrapesJS</div>
//     </div>
//   );
// };

// export default Editor;
