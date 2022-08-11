 const generateMarkdown = (cols, data) => {
    let code = ""

    data.forEach((row, indexRow) => {
      code = code.concat("| ")
      row.forEach((cell, indexCell) => {
        code = code.concat(cell)
        code = code.concat(" | ")
      })

      if(indexRow == 0) {
        code = code.concat("\n")
        code = code.concat("| ")

        row.forEach((cell, indexCell) => {
          const col = cols[indexCell]
          if (col) {
            if(col.align == "left") {
              code = code.concat(" :--- ")
            } else if(col.align == "right") {
              code = code.concat(" ---: ")
            } else if(col.align == "center") {
              code = code.concat(" :---: ")
            } else {
              code = code.concat(" ---- ")
            }
          } else {
            code = code.concat(" ---- ")
          }

          code = code.concat(" | ")
        })
      }

      code = code.concat("\n")
    })
    return code
  }

export default generateMarkdown
