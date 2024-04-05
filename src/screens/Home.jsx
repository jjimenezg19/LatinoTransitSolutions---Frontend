import { useSystemStore } from "../stores/system.js"

export default function Home() {
  const { currentUser } = useSystemStore()

  return (
    <section className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <h3>Hurrah! You are authenticated!</h3>
      <h4>
        Welcome back <span className="text-primary-100 font-bold">{currentUser.name}</span>
      </h4>
    </section>
  )
}
