<script>
  import { onMount } from 'svelte';
  import Th from './th.svelte'
  import Td from './td.svelte'
  const headers = [
    {text: "H1", align: "left"},
    {text: "H2", align: "left"},
    {text: "H3", align: "left"},
  ]
  const data = [
    ["C11", "C12", "C13"],
    ["C21", "C22", "C23"],
  ]

  const generateMarkdown = (headers, data) => {
    let code = ""

    code = code.concat("| ")
    headers.forEach((header) => {
      code = code.concat(header.text)
      code = code.concat(" | ")
    })
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

    code = code.concat("\n")

    data.forEach((row, indexRow) => {
      code = code.concat("| ")
      row.forEach((cell, indexCell) => {
        code = code.concat(cell)
        code = code.concat(" | ")
      })
      code = code.concat("\n")
    })
    return code
  }

  const addRow = () => {
    let row = new Array(data[0].length)
    row.fill(" ")
    data.push(row)
    data = data
    output = generateMarkdown(headers, data)
  }

  const addCol = () => {
    headers.push({text: "Header", align: "left"})
    data.forEach(row => {
      row.push(" ")
    })
    headers = headers
    data = data
    output = generateMarkdown(headers, data)
  }

  const updateHeaders = ()=> {
    headers = headers
    output = generateMarkdown(headers, data)
  }

  let output = generateMarkdown(headers, data)

</script>
<div class="container p-3">
  <button on:click={addRow}> Add row </button>
  <button on:click={addCol}> Add col </button>
  <br/>
  <table class="table table-bordered">
    <thead>
      <tr>
      {#each headers as cell}
        <Th head={cell} callback={updateHeaders}/>
      {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        <tr>
          {#each row as cell, cellIndex}
            <Td value={cell} head={headers[cellIndex]}/>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  <pre>
    <code>
{ output }
    </code>
  </pre>
</div>
