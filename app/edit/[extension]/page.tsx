import { readFileSync } from "fs"

import { JSEditor } from "../JSEditor";
import { CSSEditor } from "../CSSEditor";

export default function EditExtension({ params }: { 
  params: { extension: string } 
}) {

  const {
    extension
  } = params;

  try {

    // todo(pinussilvestrus): find a better way to load the module from the file system
    const viewerModule = readFileSync(`./form-fields/${extension}/viewer.js`, 'utf8');
    const editorModule = readFileSync(`./form-fields/${extension}/editor.js`, 'utf8');
    const styles = readFileSync(`./form-fields/${extension}/styles.css`, 'utf8');

    return (
      <main className="flex flex-col p-4 mb-4">
        <h1 className="p-1.5 font-bold">{ extension.toUpperCase() }</h1>
          <div className="flex w-full">
            <JSEditor title="Form field definition" value={ viewerModule } />
            <JSEditor title="Properties panel extension" value={ editorModule } />
            <CSSEditor title="Styles" value={ styles } />
          </div>
      </main>
    );

  } catch (error) {
    return (
      <main className="flex flex-col h-full p-16">
        Module not found.
      </main>
    )
  }
}