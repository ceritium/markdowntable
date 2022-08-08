<script>
  import { onMount } from 'svelte';
  import Cell from './cell.svelte'
  const data = [
    ["Head 1", "Head2", "Head3"],
    ["C11", "C12", "C13"],
    ["C21", "C22", "C23"],
  ]
  let withHead = true

  const generateMarkdown = () => {
    let code = ""
    data.forEach((row, indexRow) => {
      code = code.concat("| ")
      row.forEach((cell, indexCell) => {
        code = code.concat(cell)
        code = code.concat(" | ")
      })
      if(indexRow == 0 && withHead) {
        code = code.concat("\n")
        code = code.concat("| ")
        row.forEach((cell, indexCell) => {
          code = code.concat(" :-- ")
          code = code.concat(" | ")
        })

      }
      code = code.concat("\n")
    })
    return code
  }

  const addRow = () => {
    let row = new Array(data[0].length)
    row.fill(" ")
    data.push(row)
    data = data
    output = generateMarkdown()
  }

  const addCol = () => {
    data.forEach(row => {
      row.push(" ")
    })
    data = data
    output = generateMarkdown()
  }

  let output;
  $: {
    console.log(withHead, data)
    output = generateMarkdown()
  }

</script>
<div class="container p-3">
  <button on:click={addRow}> Add row </button>
  <button on:click={addCol}> Add col </button>
  <br/>
  <input name="withHead" type="checkbox" bind:checked={withHead}>
  <table class="table table-bordered">
    <tbody>
      {#each data as row, rowIndex}
        <tr>
          {#each row as cell}
            <Cell value={cell} withHead={withHead} index={rowIndex}/>
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
