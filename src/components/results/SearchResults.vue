<template>

<div>

<h4>Results</h4>
<p>Status: {{result.status ?? "N/A"}}</p>

<p>Distance: {{result.cost ?? "N/A"}}</p>

<p>Path: {{result.path ?? "N/A"}}</p>

</div>

</template>

<script>

export default {
  props: {
    result: {
      type: Object
    }
  }
}
</script>
