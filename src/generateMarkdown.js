const ALIGNS = {
  left: ":---",
  center: ":---:",
  right: "---:",
  default: "---",
}

const generateMarkdown = (cols, data) => {
  let code = ""

  const add = (text) => { code = code.concat(text) }
  const addBl = () =>  add("\n")
  const bold = (text) => `**${text}**`

  const padded = (text, colIndex) => {
  const padding = Math.max(widthCols[colIndex], 6) - text.length
    for (let i = 0; i < padding; i++) {
      text += " ";
    }
    return text
  }

  // Formate data
  data = data.map((row, indexRow) => {
     return row.map((cell, indexCell) => {
       const col = cols[indexCell]
       return (cell && col && col.bold) ? bold(cell) : cell
     })
  })

  const widthCols = data.reduce((obj, row) => {
    row.forEach((cell, colIndex) => {
      obj[colIndex] ||= 0
      obj[colIndex] = Math.max(obj[colIndex], cell.length)
    })

    return obj
  }, {})

  data.forEach((row, indexRow) => {
    add("| ")
    row.forEach((cell, indexCell) => {
      add(padded(cell, indexCell))
      add(" | ")
    })

    if(indexRow == 0) {
      addBl()
      add("| ")

      row.forEach((cell, indexCell) => {
        const col = cols[indexCell]

        const headAlign = ((col && col.align) ? ALIGNS[col.align] : ALIGNS.default) || ALIGNS.default
        add(padded(headAlign, indexCell))

        add(" | ")
      })
    }

    addBl()
  })
  return code
 }

export default generateMarkdown
