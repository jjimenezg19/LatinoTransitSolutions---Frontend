export default function Table({ heads, data, actions, className, onUpdate, onDelete, onGoto }) {
  actions = actions || ["update", "delete", "goto"]

  return (
    <div className={className + " relative overflow-x-auto shadow-md md:rounded-lg h-fit"}>
      <table className="w-full text-sm text-left rtl:text-right text-word">
        <thead className="text-xs uppercase bg-secondary-1 sticky top-0">
          <tr>
            {heads.map((head, index) => (
              <th key={"th_" + index} scope="col" className="px-3 py-2">
                {head.text}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={"body_row_" + index} className="bg-secondary-2 hover:bg-secondary-1/70">
              {heads
                .filter((head) => head.scope)
                .map((head, index) => (
                  <td key={"body_col_" + index} scope="row" className="px-3 py-2 font-medium whitespace-nowrap">
                    {row[head.scope]}
                  </td>
                ))}
              <td scope="row" className="flex px-3 py-2 justify-center gap-1">
                {actions?.includes("update") ? (
                  <button onClick={() => onUpdate({ index, row })} data-type="outlined" data-size="sm">
                    E
                  </button>
                ) : null}
                {actions?.includes("delete") ? (
                  <button onClick={() => onDelete({ index, row })} data-type="outlined" data-size="sm">
                    D
                  </button>
                ) : null}
                {actions?.includes("goto") ? (
                  <button onClick={() => onGoto({ index, row })} data-type="outlined" data-size="sm">
                    G
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
