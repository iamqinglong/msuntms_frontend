<template>
	<div>
    <div v-for="e in evaluations" :key='e.e_id'>
      <Evaluation :training="training" :evaluation="e"/>
    </div>
	</div>
</template>

<script>

import Evaluation from '@/components/Evaluation.vue'

export default {
  layout: 'no_layout',
	components: {
		Evaluation
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
    try {
      // let evaluation = await $axios.get(`/evaluations/${2}`)
      let [ evaluation, training ] = await Promise.all([$axios.get(`/evaluations/${2}`),
                                                      $axios.get(`/trainings/${2}`)])
      console.log(evaluation.data.data)
      return {
        evaluations : evaluation.data.data,
        training : training.data.data[0]
      }
    } catch (error) {
      console.log(error.data)
    }
  },
	data() {
		return {
			currentPage: 0,
      pageCount: 0,
      counter: 2,
		}
	},
	mounted() {

	}
}

</script>