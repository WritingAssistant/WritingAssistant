<template>
  <div>
    <div class="cards">
      <div class="shadowContainer">
        <p class="shadow" v-for="(box, index) in depth" :key="index"><br /></p>
      </div>
      <p class="currentPara">{{ currentPara }}</p>
    </div>
    <div class="nextParas">
      <div class="swiper-container">
         
        <div class="swiper-wrapper"  >
          <div
          v-for="(para, index) in nextParas" :key="index"
            class="swiper-slide"
        ><span  v-if="para!== edited"     @dblclick="modifyPara(para)" > {{ para }}</span>
           <input v-else v-model="editedpara" @keyup.enter="doneEditing()" type="text" placeholder="press enter to finish editing!" />
            <div>
              <span>{{num}}<img @click="like($event)" class="like"></span>
              
              <button class="add" @click="choosePara(index)">Reply</button></div>
              <button @click="changeToComments(index)">review</button>
           </div>
          
        </div>
       
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <button class="add" @click="addPara">+</button>
      <button class="back" @click="back">back</button>
      <textarea
        v-model="newPara"
        placeholder="Editing..."
        cols="100"
        rows="10"
        ref="editingArea"
      ></textarea>
      <button class="finish" @click="submit" ref="finish">Finish</button>
    </div>
    <div class="storyLine" ref="storyLine" >
    <div class="storycard" v-for="(story,index) in storyLine" :key="index">{{story}}</div>
    </div>
    <button @click="storyLineShow()" >storyLine</button>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min.js";
import "swiper/swiper-bundle.min.css";

export default {
  mounted() {
    function Tree() {
      //定义结构树类，存储当前话题下全部数据及其结构(模拟数据库)
      var Node = function (element, treeIndexes) {
        //每个节点包含两部分：节点本身数据(字符串)和它的子节点(数组)
        this.element = element;
        this.next = [];
        this.treeIndexes = treeIndexes;
      };
      this.root = null; //根节点
      this.current = null; //指针节点，用于找到当前正在浏览的节点位置
      this.append = function (element, depth, treeIndexes) {
        //append方法：1.生成新节点 2.查找当前正在浏览的节点位置 3.把该节点加到正在浏览节点的子节点数组里
        var node = new Node(element, treeIndexes);
        if (!this.root) {
          this.root = node;
        } else {
          this.current = this.root;
          for (let i = 0; i < depth; i++) {
            //找到当前浏览位置
            this.current = this.current.next[treeIndexes[i + 1]];
          }
          this.current.next.push(node);
        }
      };
      this.getNextElement = function (depth, treeIndexes) {
        var result = [];
        this.current = this.root;
        for (let i = 0; i < depth; i++) {
          this.current = this.current.next[treeIndexes[i + 1]];
        }
        for (let i = 0; i < this.current.next.length; i++) {
          //提取element
          result.push(this.current.next[i].element);
        }
        return result;
      };
    }
    //初始化树结构
    this.tree = new Tree();
    this.tree.append(this.currentPara, this.depth, this.treeIndexes);
  },
  watch: {
    nextParas() {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
  components: {},
  data() {
    return {
      depth: 0, //当前正在浏览的深度，用户每次点击子节点会加一
      treeIndexes: [0], //当前正在浏览的节点位置信息(坐标)，用户每次点击子节点时会往该数组里添加一个数(即该子节点的下标)
      newPara: "",
      currentPara:
        "The baby panda, Dora, was unhappy, because her Milk Tooth is falling out. But she did not want to lose it. One night, Dore heard a strange sound coming from her mouth. Dora ran to look in the mirror. Her tooth was crying!",
      nextParas: [],
      edited:null,
      num:0,
      storyLine:["The baby panda, Dora, was unhappy, because her Milk Tooth is falling out. But she did not want to lose it. One night, Dore heard a strange sound coming from her mouth. Dora ran to look in the mirror. Her tooth was crying!"],
      editedpara:""
    };
  },

  methods: {
    addPara() {
      this.$refs.editingArea.style.display = "block";
      this.$refs.finish.style.display = "block";
    },
    submit() {
      this.tree.append(this.newPara, this.depth, this.treeIndexes);
      this.nextParas = this.tree.getNextElement(this.depth, this.treeIndexes);
      this.$refs.editingArea.style.display = "none";
      this.$refs.finish.style.display = "none";
      this.newPara = "";
    },
    choosePara(index) {
      this.depth++;
      this.treeIndexes.push(index);
      this.currentPara = this.nextParas[index];
      this.nextParas = this.tree.getNextElement(this.depth, this.treeIndexes)
      console.log(this.currentPara)
      this.storyLine.push(this.currentPara)
      console.log(this.storyLine);
    },
    changeToComments(index){
      this.chosenpara = 
       this.$router.push({path:'/comments',query:{
        Chosentest:this.nextParas[index]
      }})
    },
    back() {
      if (this.depth) {
        this.depth--;
      }
      if (this.treeIndexes.length > 1) {
        this.treeIndexes.pop();
      }
      this.tree.current = this.tree.root;
      for (let i = 0; i < this.depth; i++) {
        //找到当前浏览位置
        this.tree.current = this.tree.current.next[this.treeIndexes[i + 1]];
      }
      this.currentPara = this.tree.current.element;
      this.nextParas = this.tree.getNextElement(this.depth, this.treeIndexes);
    },
    modifyPara(para) {
     this.edited=para
     
    },
    doneEditing() {
              this.nextParas=this.editedpara
              },
    like(e){
       if (e.target.className.indexOf("like-selected") == -1) {
                            e.target.className = "like-selected"; //切换按钮样式
                            this.num++;
                        } else {
                            e.target.className = "like";//切换按钮样式
                            this.num--;
                        }
                 },
    storyLineShow(){
      this.$refs.storyLine.style.display = "block"
    }
    
  }
};
</script>

<style>
.swiper-container {
  width: 200px;
  top: 20px;
}

.swiper-slide {
  word-break: normal;
}
.shadowContainer {
  position: relative;
  top: 30px;
}
.shadow {
  border-top: 1px black solid;
  width: 300px;
  margin: -17px auto;
  border-radius: 10px;
}
.add {
  margin-top: 20px;
  height: 30px;
}
.back {
  margin-top: 20px;
  margin-left: 10px;
  height: 30px;
}
.finish {
  display: none;
  position: fixed;
  bottom: 21px;
}
textarea {
  display: none;
  position: fixed;
  border-radius: 10px;
  bottom: 20px;
}
.nextParas {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.currentPara {
  border: 1px black solid;
  width: 300px;
  margin: 30px auto;
  word-break: normal;
  border-radius: 10px;
}

.like{
  height:20px;
  width:20px;
  background: url(../../assets/like1.png) no-repeat;
  background-size:100%
}
.like-selected{
   height:20px;
  width:20px;
  background: url(../../assets/like.png) no-repeat;
  background-size:100%
}
.storycard{
  width:200px;
  float: left;
  border:1px solid black;
  margin:3%;
  border-radius: 10px;
}
.storyLine{
  display:none;
}
</style>