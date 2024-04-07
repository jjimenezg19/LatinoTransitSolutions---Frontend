import Button from "../form/Button"

export default function Table({ heads, data, actions, placeholder, className, onTableAction, onClickRow }) {
  actions = actions || []
  heads = heads || []
  placeholder = placeholder || "No info to show"

  const buttons = [
    { color: "positive", icon: "fas fa-pen", type: "update" },
    { color: "negative", icon: "fas fa-trash", type: "delete" },
    { color: "primary", icon: "fas fa-clone", type: "duplicate" },
    { color: "primary", icon: "fas fa-check", type: "approve" }
  ].filter((b) => actions.includes(b.type))

  if (buttons.length) {
    heads.push({ text: "Actions", scope: null })
  }

  return (
    <div className={`${className} w-full relative overflow-auto bg-background-200 shadow-md md:rounded-lg`}>
      <table className="w-full text-base text-center text-word-100 overflow-auto">
        <thead className="text-xs uppercase bg-background-300 sticky top-0">
          <tr>
            {heads.map((head, index) => (
              <th key={"th_" + index} className="px-3 py-2">
                {head.text}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
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
                  {buttons.map(({ color, icon, type }, indexButton) => (
                    <Button
                      key={indexButton}
                      onClick={(e) => {
                        e.stopPropagation()
                        onTableAction({ index, type, row })
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
