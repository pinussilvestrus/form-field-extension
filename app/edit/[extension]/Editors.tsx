import { CodeEditor } from "../CodeEditor";

export function Editors({ viewerModule, editorModule, styles, handleModuleChange }: {
  viewerModule: string,
  editorModule: string,
  styles: string,
  handleModuleChange: (newValue: string|undefined, fileName: string) => void
 }) {

  return (
    <div className="flex w-full">
      <CodeEditor 
        title="Form field definition" 
        fileName="viewer.js"
        value={ viewerModule } 
        handleChange={ handleModuleChange }
        language="javascript" />
      <CodeEditor 
        title="Properties panel extension" 
        fileName="editor.js"
        value={ editorModule } 
        handleChange={ handleModuleChange }
        language="javascript" />
      <CodeEditor 
        title="Styles" 
        fileName="styles.css"
        value={ styles } 
        handleChange={ handleModuleChange }
        language="css" />
    </div>
  )
};