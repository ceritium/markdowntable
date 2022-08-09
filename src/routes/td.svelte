<script>
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

  export let cell, head

  const notifyUpdate = (e)=> {
		dispatch('update');
  }

  const CLASSNAMES = {left: "text-start", center: "text-center", right: "text-end"}
  $: className = CLASSNAMES[head.align]
</script>

<td class={className}>
  <input type="text" on:keyup={notifyUpdate} bind:value={cell.text}>
</td>
