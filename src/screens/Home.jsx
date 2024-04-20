import { useSystemStore } from "../stores/system.js"

export default function Home() {
  const { currentUser } = useSystemStore()

  return (
    <div className="relative flex flex-col h-full items-center justify-center transition-bg">
      <h1 className="font-bold">
        Welcome back <span className="text-primary-100 font-bold">{currentUser.name}</span>
        <i className="ml-4 fas fa-truck"></i>
      </h1>

      <div className="absolute inset-0 overflow-hidden">
        <div className="jumbo absolute -inset-[10px] opacity-50"></div>
      </div>
    </div>
  )
}
