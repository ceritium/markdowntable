<script>
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

  export let head
  const notifyUpdate = ()=> {
		dispatch('update');
  }

  const removeColumn = () => {
		dispatch('removeColumn', {
			head: head
		});
  }

  const CLASSNAMES = {left: "text-start", center: "text-center", right: "text-end"}
  $: className = CLASSNAMES[head.align]
</script>

<th class={className}>
  <div class="controls">
    <button class="btn btn-sm btn-danger" on:click={removeColumn}> Remove </button>
    <select class="form-control form-control-sm" on:change={notifyUpdate} bind:value={head.align}>
      <option value="left">left</option>
      <option value="center">center</option>
      <option value="right">right</option>
    </select>
  </div>
  <input class="cell" type="text" on:keyup={notifyUpdate} bind:value={head.text}>
</th>

<style>
  .cell {
    width: 100%;
    margin: 0;
    border-radius: 0;
    border: 1px solid #ccc;
    padding: 5px
  }

  .cell:hover {
    border: 1px solid red;
  }
  th {
    position: relative;
    padding: 0;
  }
  .controls {
    position: absolute;
    right: 5px;
    top: -45px;
  }

  .controls .form-control {
    width: auto;
    display: inline;
  }

</style>
