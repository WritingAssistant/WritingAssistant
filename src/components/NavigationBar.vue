<template>
    <div class="container">
        <div class="navbar">
            <input type="checkbox">
            <span></span>
            <span></span>
            <ul>
                <li v-for="(item,index) in items" :key="index" @click="ChangeActive(index)">
                    <a :class="index==ActiveIndex?'activated':'normal'">{{item.text}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    
    data(){
        return {
            ActiveIndex:0,
            items:[
                {
                    text:"Home Page",
                    path:"/homepage"
                },
                {
                    text:"Me",
                    path:"/me",
                    requireAuth: true,
                },
            
                                {
                    text:"rank",
                    path:"/rank"
                }
            ],
        }
    },
  
    methods: {
        ChangeActive(index) {
            this.ActiveIndex = index
            this.$router.replace(this.items[index].path)
        }
    },
}
</script>

<style>
    *{
        padding: 0;
        margin:0;
    }
    .navbar,
    .container,
    .navbar ul{
        transition: all 0.5s;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .navbar{
        position:relative;
        padding:20px;
        border-radius: 50px !important;
        background-color: #fff;
        height:60px;
    }
    .navbar input{
        opacity: 0;
        width:40px;
        height: 40px;
        cursor: pointer;
    }
    .navbar span{
        position: absolute;
        left:25px;
        top: calc(50% - 10px);
        width: 30px;
        height: 4px;
        border-radius: 15px;
        background-color: rgb(39, 37, 201);
        pointer-events: none;
        transition: transform 0.3s ease-in-out,top 0.3s 
        ease-in-out 0.3s;
    }
    .navbar span:nth-child(3){
        top: calc(50% + 6px)
    }
    .navbar ul{
        width:0;
        white-space: nowrap;
        overflow: hidden;
    }
    .navbar ul li{
        list-style: none;
        margin:0 15px;
    }
    .navbar ul li a{
        text-decoration: none;
        font-size: 20px;
        font-weight: 700;
        color:#333;
        cursor: pointer;
    }
    .navbar ul li a:hover{
        color: rgba(14, 14, 214, 0.493);
    }
    .navbar input:checked ~ ul{
        width:350px;

    }
    .navbar input:checked~ span:nth-child(2){
        top:calc(50% - 2px);
        transform: rotate(-45deg);
        background-color: rgb(10, 6, 6);
        transition: top 0.3s ease-in-out, transform 0.3s 
        ease-in-out 0.3s;
    }
    .navbar input:checked~ span:nth-child(3){
        top:calc(50% - 2px);
        transform: rotate(45deg);
        background-color: rgb(12, 5, 5);
        transition: top 0.3s ease-in-out, transform 0.3s 
        ease-in-out 0.3s;
    }
</style>