import Map from "../../components/map/Map"

export default function Routes() {
  return (
    <section className="w-full h-full flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col gap-4">
        <h3>Rutas para cliente</h3>
        <ul>
          <li>Lista de rutas</li>
          <li>Mapa que muestra la ruta seleccionada</li>
          <li>Botón para confirmar la ruta y pasar a asignar el paquete</li>
        </ul>
      </div>

      <Map />
    </section>
  )
}
