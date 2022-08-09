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
    <button class="btn btn-danger" on:click={removeColumn}> Remove </button>
    <select class="form-control" on:change={notifyUpdate} bind:value={head.align}>
      <option value="left">left</option>
      <option value="center">center</option>
      <option value="right">right</option>
    </select>
  </div>
  <input type="text" on:keyup={notifyUpdate} bind:value={head.text}>
</th>

<style>
  th {
    position: relative;
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
