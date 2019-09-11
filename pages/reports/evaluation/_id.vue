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
      
      let [ evaluation, training ] = await Promise.all([$axios.get(`/evaluations/${params.id}`),
                                                      $axios.get(`/trainings/${params.id}`)])
      console.log(evaluation.data)
      return {
        evaluations : evaluation.data.data,
        training : training.data.data[0]
      }
    } catch (error) {
      console.log(error)
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