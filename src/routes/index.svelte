<script>
  import { onMount } from 'svelte';
  import Th from './th.svelte'
  import Td from './td.svelte'
  import generateMarkdown from '../generateMarkdown.js'

  const headers = [
    {text: "H1", align: "left"},
    {text: "H2", align: "left"},
    {text: "H3", align: "left"},
  ]
  const data = [
    [{text: "D1"},
    {text: "D2"},
    {text: "D3"},]
  ]
  const addRow = () => {
    let row = headers.map(() => {
      return {text: ""}
    })

    data.push(row)
    data = data
    output = generateMarkdown(headers, data)
  }

  const addCol = () => {
    headers.push({text: "Header", align: "left"})
    data.forEach(row => {
      row.push({text: ""})
    })
    headers = headers
    data = data
    output = generateMarkdown(headers, data)
  }

  const updateHeaders = ()=> {
    headers = headers
    data = data
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
            <Td cell={cell} head={headers[cellIndex]} callback={updateHeaders}/>
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