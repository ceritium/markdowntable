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

    // const widthCols = data.map((row) => {
    //   return Math.max(...row.map(cell => cell.length))
    // })

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
        const col = cols[indexCell]
        const text = (cell && col && col.bold) ? bold(cell) : cell
        add(padded(text, indexCell))
        add(" | ")
      })

      if(indexRow == 0) {
        addBl()
        add("| ")

        row.forEach((cell, indexCell) => {
          const col = cols[indexCell]
          if (col) {
            if(col.align == "left") {
              add(padded(":---", indexCell))
            } else if(col.align == "right") {
              add(padded("---: ", indexCell))
            } else if(col.align == "center") {
              add(padded(":---:", indexCell))
            } else {
              add(padded("----", indexCell))
            }
          } else {
            add(padded("----", indexCell))
          }

          add(" | ")
        })
      }

      addBl()
    })
    return code
  }

export default generateMarkdown
