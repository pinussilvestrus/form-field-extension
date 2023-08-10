export default function Pill({ title }: { title: string}) {
  return (
    <div className="p-4 w-full bg-white font-mono rounded-md flex items-center justify-center hover:cursor-pointer hover:drop-shadow-md">{ title }</div>
  )
}