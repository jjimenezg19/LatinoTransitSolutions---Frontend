import Button from "../form/Button"

export default function Table({ heads, data, actions, className, onUpdate, onDelete, onDuplicate, onClickRow }) {
  actions = actions || []

  heads = heads || []

  const buttons = [
    { color: "positive", icon: "fas fa-pen", type: "update", callback: onUpdate },
    { color: "negative", icon: "fas fa-trash", type: "delete", callback: onDelete },
    { color: "primary", icon: "fas fa-clone", type: "duplicate", callback: onDuplicate }
  ].filter((b) => actions.includes(b.type))

  if (buttons.length) {
    heads.push({ text: "Actions", scope: null })
  }

  return (
    <div className={className + " relative overflow-x-auto h-fit"}>
      <table className="w-full text-base text-center text-word-100 shadow-md md:rounded-lg overflow-hidden">
        <thead className="text-xs uppercase bg-background-300 sticky top-0">
          <tr>
            {heads.map((head, index) => (
              <th key={"th_" + index} scope="col" className="px-3 py-2">
                {head.text}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="h-full overflow-y-auto">
          {data.map((row, index) => (
            <tr onClick={() => (onClickRow ? onClickRow({ index, row }) : null)} key={"body_row_" + index} className={`${onClickRow ? "cursor-pointer" : ""} bg-background-200 hover:bg-background-200/60`}>
              {heads
                .filter((head) => head.scope)
                .map((head, index) => (
                  <td key={"body_col_" + index} scope="row" className="px-3 py-2 font-medium whitespace-nowrap">
                    {row[head.scope]}
                  </td>
                ))}
              {buttons.length ? (
                <td scope="row" className="flex px-3 py-2 justify-center gap-2">
                  {buttons.map(({ color, icon, callback }, indexButton) => (
                    <Button
                      key={indexButton}
                      onClick={(e) => {
                        e.stopPropagation()
                        callback({ index, row })
                      }}
                      type="outlined"
                      size="xs"
                      color={color}
                    >
                      <i className={icon}></i>
                    </Button>
                  ))}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
