<template>
    <div>
        <!-- <div style="background:#ECECEC; padding:30px"> -->
            <center>
                <a-card :title="trainee.trainee_fname+' '+trainee.trainee_lname" :bordered="false" style="width: 500px">
                    <no-ssr>
                        <qr-code :text="id"></qr-code>
                    </no-ssr>
                    <br>
                    <a-alert message="Please take a screenshot or picture of this code." type="info" showIcon />
                </a-card>
            </center>
        
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    layout: 'clean_layout',
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
        try {
            let trainee = await $axios.get(`/trainee/${params.id}`)
            return {
                trainee : trainee.data.data[0],
                id : trainee.data.data[0].TraineeID + '_' + trainee.data.data[0].trainee_fname
            }
        } catch (error) {
            console.log(error.data)
        }
    },
}
</script>
