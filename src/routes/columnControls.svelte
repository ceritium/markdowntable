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
</script>
<th class="controls">
  <button class="btn btn-sm btn-danger" on:click={removeColumn}> Remove </button>
  <select class="form-select form-select-sm" on:change={notifyUpdate} bind:value={head.align}>
    <option value="left">left</option>
    <option value="center">center</option>
    <option value="right">right</option>
  </select>
</th>

<style>
  .controls {
    scale: 0.7;
   }
  .controls .form-select {
    width: 80px;
    display: inline;
  }
</style>
