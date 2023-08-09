import { readFileSync } from "fs"

export default function EditExtension({ params }: { 
  params: { extension: string } 
}) {

  try {
    const viewerModule = readFileSync(`./form-fields/${params.extension}/viewer.js`, 'utf8');

    return (
      <main className="flex flex-col h-full p-16">
        { viewerModule }
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