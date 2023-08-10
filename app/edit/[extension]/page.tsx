import { readFileSync } from "fs"

import { JSEditor } from "../JSEditor";
import { CSSEditor } from "../CSSEditor";

export default function EditExtension({ params }: { 
  params: { extension: string } 
}) {

  const {
    extension
  } = params;

  let viewerModule = '', editorModule = '', styles = '';

  try {

    // todo(pinussilvestrus): find a better way to load the module from the file system
    viewerModule = readFileSync(`./form-fields/${extension}/viewer.js`, 'utf8');
    styles = readFileSync(`./form-fields/${extension}/styles.css`, 'utf8');
    editorModule = readFileSync(`./form-fields/${extension}/editor.js`, 'utf8');

    console.log(styles);
  } catch (error: any) {

    if(error.code === 'ENOENT' && (
      !viewerModule && !editorModule && !styles
    )) {

    return (
      <main className="flex flex-col h-full p-16">
        Can not load module source.
      </main>
    )

    } else {
      <main className="flex flex-col h-full p-16">
      { error.message }
      </main>
    }
  }

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

}