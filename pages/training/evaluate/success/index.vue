<template>
    <div>
        <!-- <div style="background:#ECECEC; padding:30px"> -->
            <center>
                <a-card title="You successfully evaluated this training" :bordered="false" style="width: 500px">

                    THANK YOU!
                    
                </a-card>
                <br>
                <a-button type="primary" @click="handleReturn">Return to Evaluate again </a-button>
            </center>
        
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    layout: 'no_layout',
    methods: {
        handleReturn(){
            this.$router.go(-1)
        }
    },
}
</script>
