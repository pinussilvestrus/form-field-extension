import { readFileSync } from "fs"

import Navbar from "../../Navbar";

import { JSEditor } from "../JSEditor";

export default function EditExtension({ params }: { 
  params: { extension: string } 
}) {

  try {
    const viewerModule = readFileSync(`./form-fields/${params.extension}/viewer.js`, 'utf8');
    const editorModule = readFileSync(`./form-fields/${params.extension}/editor.js`, 'utf8');

    return (
      <main className="flex flex-row p-4 mb-4">
        <JSEditor title="Viewer extension" value={ viewerModule } />
        <JSEditor title="Editor extension" value={ editorModule } />
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