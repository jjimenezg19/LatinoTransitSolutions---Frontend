import { useSystemStore } from "../../stores/system"

export default function SignIn() {
  const { routeToTrip } = useSystemStore()

  return (
    <section className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <h3>Asignación de paquete a ruta seleccionada para cliente</h3>
      <ul>
        <li>Mapa con la ruta seleccionada</li>
        <li>Detalles de la ruta</li>
        <li>Detalles del transporte</li>
        <li>Lista de paquetes para asignar a la ruta</li>
        <li>Botón de confirmar viaje</li>
        <li>{routeToTrip.idTransportRoute}</li>
        <li>{routeToTrip.transportName}</li>
        <li>{routeToTrip.transportType}</li>
      </ul>
    </section>
  )
}
