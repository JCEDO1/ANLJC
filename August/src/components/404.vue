<template>
  <div>
    <p>404</p>
  </div>
</template>

<script>
  export default{
    name: 'errorPage',
    data(){
        return {}
    },
    methods: {},
    computed: {},
    watch: {},
    beforeCreat(){
        //el和data还没有初始化
    },
    create(){
        //完成了data的初始化，el没有
    },
    beforeMount(){
        //完成了el和data的初始化
        //el在这里使用Virtual DOM技术，将位置占据。但还没有渲染
    },
    mount(){
        //完成挂载
    },
    beforeUpdata(){

    },
    update(){
        //改变app中的数据
    },
    beforDestroy(){

    },
    destroyed(){

    }
  }
</script>

<style>

</style>
