<template>

<div>

<h3>Results</h3>

<p>Algorithm: {{result.algorithm ?? "N/A"}}</p>

<p>Distance: {{result.distance ?? "N/A"}}</p>

<ul v-if="result.cities">
<li v-for="city in result.cities" :key="city">{{city}}</li>
</ul>

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
