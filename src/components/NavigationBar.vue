<template>
    <div class="navigationbar">
        <a v-for="(item,index) in items" :key="index" @click="ChangeActive(index)">
            <span :class="index==ActiveIndex?'activated':'normal'">{{item.text}}</span>
        </a>
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

<style scoped>
    a{
        cursor:pointer;
        margin: 0 20px;
    }
    a:hover{
        color: blue;
    }
    .activated{
        text-decoration: underline;
    }
    .navigationbar{
        width:100%;
        display: flex;
        justify-content: center;
    }
</style>