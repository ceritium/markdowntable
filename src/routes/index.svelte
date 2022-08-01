<script>
  import { onMount } from 'svelte';
  const data = [
    ["Head 1", "Head2", "Head3"],
    ["C11", "C12", "C13"],
    ["C21", "C22", "C23"],
  ]
  let tbodyData = data
  let withHead = false

  $: {
    if(withHead) {
      tbodyData = data.slice(1,data.length + 1)
    } else {
      tbodyData = data
    }
  }

</script>
<div class="container p-3">
  <label for="withHead"> With Head: </label>
  <input name="withHead" type="checkbox" bind:checked={withHead}>
  <table class="table table-bordered">
    {#if withHead}
      <thead>
        <tr>
          {#each data[0] as cell}
            <th> { cell } </th>
          {/each}
        </tr>
      </thead>
    {/if}
    <tbody>
      {#each tbodyData as row}
        <tr>
          {#each row as cell}
            <td> {cell} </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
