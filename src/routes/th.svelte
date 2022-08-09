<script>
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

  export let head, callback
  const updateAlign = (e)=> {
    head.align = e.target.value
    callback()
  }

  const updateText = (e)=> {
    head.text = e.target.value
    callback()
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
    <select class="form-control" on:change={updateAlign} bind:value={head.align}>
      <option value="left">left</option>
      <option value="center">center</option>
      <option value="right">right</option>
    </select>
  </div>
  <input type="text" on:keyup={updateText} bind:value={head.text}>
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
