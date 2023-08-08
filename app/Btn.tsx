export default function Btn({ title }: { title: string}) {
  return (
    <button className="p-4 bg-white font-mono rounded-md flex items-center justify-center hover:cursor-pointer hover:drop-shadow-md">{ title }</button>
  )
}