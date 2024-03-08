export default function CreateTransport() {
  return (
    <section className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <div className="w-full max-w-2xl flex flex-col items-center gap-6">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-2xl md:text-4xl font-bold">Register transport</h3>
          <p className="text-sm md:text-base text-slate-400">Please fill in the form below to register your transport.</p>
        </div>

        <div className="w-full grid md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium leading-none" htmlFor="type">
              Type
            </label>
            <input id="type" placeholder="Select type" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium leading-none" htmlFor="name">
              Name
            </label>
            <input id="name" placeholder="Enter transport name" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium leading-none" htmlFor="max-width">
              Max width
            </label>
            <input id="max-width" placeholder="Enter max width" type="number" min="0" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium leading-none" htmlFor="max-height">
              Max height
            </label>
            <input id="max-height" placeholder="Enter max height" type="number" min="0" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium leading-none" htmlFor="max-length">
              Max length
            </label>
            <input id="max-length" placeholder="Enter max length" type="number" min="0" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium leading-none" htmlFor="max-weight">
              Max weight
            </label>
            <input id="max-weight" placeholder="Enter max weight" type="number" min="0" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium leading-none" htmlFor="plate">
              Plate
            </label>
            <input id="plate" placeholder="Enter transport plate" />
          </div>
        </div>

        <button className="mt-4 w-fit">Register Transport</button>
      </div>
    </section>
  )
}
