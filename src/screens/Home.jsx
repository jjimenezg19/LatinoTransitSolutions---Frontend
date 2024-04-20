import { useSystemStore } from "../stores/system.js"

export default function Home() {
  const { currentUser } = useSystemStore()

  return (
    <section className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <h2>
        Welcome back <span className="text-primary-100 font-bold">{currentUser.name}</span>
      </h2>
    </section>
  )
}
