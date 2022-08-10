const buildFromPaste = (content) => {
  const data = content.split("\n").map((row) => {
    return row.split("\t").map((cell) => {
      return {text: cell}
    })
  })

  const headers = data[0].map(() => {
    return {align: "left"}
  })

  return {headers: headers,  data: data}
}

export default buildFromPaste
