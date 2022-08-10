 const generateMarkdown = (headers, data) => {
    let code = ""

    data.forEach((row, indexRow) => {
      code = code.concat("| ")
      row.forEach((cell, indexCell) => {
        code = code.concat(cell.text)
        code = code.concat(" | ")

      })
        if(indexRow == 0) {
          code = code.concat("\n")
          code = code.concat("| ")
          headers.forEach((header) => {
            if(header.align == "left") {
              code = code.concat(" :--- ")
            } else if(header.align == "right") {
              code = code.concat(" ---: ")
            } else {
              code = code.concat(" :---: ")
            }

            code = code.concat(" | ")
          })
        }

      code = code.concat("\n")
    })
    return code
  }

export default generateMarkdown
