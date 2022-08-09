<script>
  import LZString from 'lz-string'
  import { onMount } from 'svelte'
  import Th from './th.svelte'
  import Td from './td.svelte'
  import generateMarkdown from '../generateMarkdown.js'


  let loading = true
  let headers = [
    {text: "H1", align: "left"},
    {text: "H2", align: "left"},
    {text: "H3", align: "left"},
  ]

  let data = [
    [{text: "D1"},
    {text: "D2"},
    {text: "D3"},]
  ]


  onMount(() => {
    loadFromUrl()
  })


  const addRow = () => {
    let row = headers.map(() => {
      return {text: ""}
    })

    data.push(row)
    data = data
  }

  const addCol = () => {
    headers.push({text: "Header", align: "left"})
    data.forEach(row => {
      row.push({text: ""})
    })
    headers = headers
    data = data
  }

  const updateCallback = () => {
    headers = headers
    data = data
  }

  const removeColumn = (event) => {
    const head = event.detail.head
    const removeIndex = headers.indexOf(head)

    data = data.map((row) => {
      return row.filter((item, indexRow) => {
        return removeIndex != indexRow
      })
    })

    headers = headers.filter(function(value, index, arr){
      return index != removeIndex
    });
  }

  const removeRow = (row) => {
    data = data.filter((value) => {
      return value != row
    })
  }

  const updateUrl = (headers, data) => {
    if(!loading) {
      const table = LZString.compressToEncodedURIComponent(JSON.stringify({headers: headers, data: data, v: 0}))
      const url = `?table=${table}`
      if(typeof window !== 'undefined' && typeof history !== 'undefined') {
        history.pushState(history.state, '', url)
      }
    }

    loading = false
  }

  const loadFromUrl = () => {
    const table = (new URL(window.location)).searchParams.get('table')
    if (table) {
      const raw = JSON.parse(LZString.decompressFromEncodedURIComponent(table))
      headers = raw.headers
      data = raw.data
      console.log(headers, data)
    }
  }

  $: output = generateMarkdown(headers, data)
  $: updateUrl(headers, data)

</script>
<div class="container p-3">
  <button on:click={addRow}> Add row </button>
  <button on:click={addCol}> Add col </button>
  <br/>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>
        </th>
        {#each headers as cell}
          <Th head={cell} on:removeColumn={removeColumn} on:update={updateCallback}/>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row, rowIndex}
        <tr>
          <td>
            <button on:click={() => removeRow(row)}> remove </button>
          </td>
          {#each row as cell, cellIndex}
            <Td cell={cell} head={headers[cellIndex]} on:update={updateCallback}/>
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
