<template>
    <div>
        <h1>{{article.title}}</h1>
        <h2>{{article.author}}</h2>
        <h3>{{article.time}}</h3>
        <p>{{article.content}}</p>
    </div>
</template>

<script>
    export default {
        name: "MyArticle", //那么属性实际上规定了标签名
        /*props用于声明自定义的标签属性*/
        props:['article']
    }
</script>

<style scoped>

</style>
