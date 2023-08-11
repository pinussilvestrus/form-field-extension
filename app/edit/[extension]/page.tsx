import { readFileSync, writeFileSync } from "fs"

import { ExtensionEditors } from "./ExtensionEditors";
import { ExtensionsSelect } from "../ExtensionsSelect";

export default function EditExtension({ params }: { 
  params: { extension: string } 
}) {

  const {
    extension
  } = params;

  let viewerModule = '', editorModule = '', styles = '';

  const handleModuleChange = async (newValue: string|undefined, fileName: string) => {
    'use server'
    
    writeFileSync(`./form-fields/${extension}/${fileName}`, newValue || '');
  }

  try {

    // todo(pinussilvestrus): find a better way to load the module from the file system
    viewerModule = readFileSync(`./form-fields/${extension}/viewer.js`, 'utf8');
    styles = readFileSync(`./form-fields/${extension}/styles.css`, 'utf8');
    editorModule = readFileSync(`./form-fields/${extension}/editor.js`, 'utf8');

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
      <ExtensionsSelect selected={ extension } />
      <ExtensionEditors
        viewerModule={ viewerModule }
        editorModule={ editorModule }
        styles={ styles }
        handleModuleChange={ handleModuleChange } />
    </main>
  );

}