// grapesjs.d.ts

// Define the types for the GrapesJS editor and components
export interface EditorInstance {
    BlockManager: {
      add: (id: string, options: BlockOptions) => void;
    };
    on: (event: string, callback: (component: Component) => void) => void;
    Panels: {
      addButton: (panel: string, options: PanelButtonOptions) => void;
    };
    Commands: {
      add: (id: string, command: CommandOptions) => void;
      runCommand: (id: string) => void;
      stopCommand: (id: string) => void;
    };
    destroy: () => void;
  }
  
  export interface BlockOptions {
    label: string;
    content: string;
    category?: string;
    attributes?: { class: string };
  }
  
  export interface Component {
    get: (prop: string) => string | undefined;
    view: {
      el: HTMLElement;
    };
  }
  
  export interface PanelButtonOptions {
    id: string;
    className: string;
    command: string;
    attributes: {
      title: string;
    };
  }
  
  export interface CommandOptions {
    run: (editor: EditorInstance) => void;
    stop: (editor: EditorInstance) => void;
  }
  
  declare const grapesjs: {
    init: (options: {
      container: string;
      height: string;
      width: string;
      fromElement: boolean;
      storageManager: boolean;
      plugins?: ((editor: EditorInstance) => void)[];
    }) => EditorInstance;
  };
  
  export default grapesjs;
  