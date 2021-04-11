<template>
  <div class="homepage">
    <select name="" id="" class="select" @change="changeTopic($event)">
      <option style='display: none'></option>
      <option v-for="topic in topic" :key="topic.id" :value="topic.id">{{topic.topicname}}</option>
    </select>
    <div class="storyLineContainer">
        <i @click="storyLineShow()" class="iconfont icon-wulianwang-"></i>
      <div class="storyLine" ref="storyLine" v-if="showLine">
        <div class="storycard" v-for="(story, index) in storyLine" :key="index">
          {{ story }}
        </div>
      </div>
    </div>
    <div class="currentContainer">
      <i @click="back()" class="iconfont icon-backup back"></i>
      <div class="cards">
        <div class="shadowContainer">
          <p class="shadow" v-for="(box, index) in depth" :key="index">
            <br />
          </p>
        </div>
        <p class="currentPara">{{ currentPara.text }}</p>
      </div>
      <i @click="addPara()" class="iconfont icon-down add"></i>
    </div>
    <div class="nextParas">
      <div v-show="nextParas.length!==0" class="swiper-button-prev"></div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="(para, index) in nextParas"
            :key="index"
            class="swiper-slide"
          >
            <div v-if="!edited" class="nextPara" @dblclick="modifyPara(para)">
              {{ para.text }}
              <hr>
              By: {{ para.author }}
              <br>
              {{ para.time }}
            </div>
            <textarea
              class="modifying"
              maxlength="480"
              v-else
              v-model="editedpara"
              @keyup.enter="doneEditing(index)"
              @blur="doneEditing(index)"
              cols="25"
              rows="10"
              autofocus
            />
            <button class="del" @click="del()" v-if="edited">X</button>
            <div>
              <span>{{ num }}<img @click="like($event)" class="like" /></span>

              <button class="enterNext" @click="choosePara(index)">
                See this line
              </button>
              <button @click="changeToComments(index)">Comment</button>
            </div>
          </div>
        </div>
      </div>
      <div v-show="nextParas.length!==0" class="swiper-button-next"></div>
    </div>
    <div class="editContainer">
      <textarea
        maxlength="480"
        class="addEdit"
        v-model="newPara"
        placeholder="Editing..."
        cols="60"
        rows="10"
        ref="editingArea"
      ></textarea>
      <i @click="submit()" ref="finish" class="iconfont icon-Cartoon-Finish finish"></i>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min.js";
import "swiper/swiper-bundle.min.css";

export default {
  mounted() {
    

    //连接login表,获得当前用户名
    this.$axios({
      method:"post",
      url:"http://127.0.0.1:3000/api/user/getUser",
      data:{
        email:localStorage.getItem("email"),
      }
    }).then((res)=>{
      this.user = res.data[0].username;
    });
    //连接topic表，获取topic name 和 id
    this.$axios({
      method:"post",
      url:"http://127.0.0.1:3000/api/user/getTopic",
    }).then((res) =>{
      this.topic = res.data;
    })
    
  },
    
  watch: {
    nextParas() {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: false,
          pagination: {
            el: ".swiper-pagination",
          },
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
        {},
      nextParas: [],
      edited: false,
      num: 0,
      storyLine: [],
      showLine: false,
      editedpara: "",
      topic_id: 0,
      user:"",
      topic:[],
      adding:false,
    };
  },

  methods: {
    addPara() {
      if(this.adding==false){
        this.$refs.editingArea.style.display = "block";
        this.$refs.finish.style.display = "block";
        this.adding=!this.adding
      }else{
        this.$refs.editingArea.style.display = "none";
        this.$refs.finish.style.display = "none";
        this.adding=!this.adding
      }
      
    },
    submit() {
      if (this.newPara.length<10) {
        alert("It's too short! (10 letters at least)")
        return
      }
      this.adding=false;
      // 添加到暂存树
      this.tree.append({text:this.newPara,author:this.user,time:new Date().toLocaleDateString()}, this.depth, this.treeIndexes);
      this.nextParas = this.tree.getNextElement(this.depth, this.treeIndexes);
      this.$refs.editingArea.style.display = "none";
      this.$refs.finish.style.display = "none";
      
      //添加到数据库
      let submitIndex = this.treeIndexes.slice(0)
      submitIndex.push(this.nextParas.length) //新添加元素的下标等于该数组的length

      // 把submitIndex,this.newPara加到数据库即可
      this.$axios({
        method:"post",
        url:"http://127.0.0.1:3000/api/user/addPara",
        data:{
          topic_id:this.topic_id,
          selectIndexes:"["+ submitIndex + "]",
          content:this.newPara,
          author:this.user,
          time:new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
      }).then((res)=>{
        console.log(res);
      })

      this.newPara = "";
    },
    choosePara(index) {
      this.depth++;
      this.treeIndexes.push(index);
      this.currentPara = this.nextParas[index];
      this.nextParas = this.tree.getNextElement(this.depth, this.treeIndexes);
      this.storyLine.push(this.currentPara.text);
    },
    changeToComments(index) {
      this.chosenpara = this.$router.push({
        path: "/comments",
        query: {
          Chosentest: this.nextParas[index].text,
        },
      });
    },
    back() {
      if (this.depth) {
        this.depth--;
      }
      if (this.treeIndexes.length > 1) {
        this.treeIndexes.pop();
      }
      if (this.storyLine.length > 1) {
        this.storyLine.pop();
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
      this.editedpara = para;
      this.edited = !this.edited;
    },
    doneEditing(index) {
      if (this.editedpara.length<10) {
        alert("It's too short! (10 letters at least)")
        return
      }
      //修改暂存树
      this.tree.change(this.editedpara, this.depth, this.treeIndexes, index);
      this.nextParas[index].text = this.editedpara;
      this.edited = !this.edited;

      //修改数据库
      let submitIndex = this.treeIndexes.slice(0)
      submitIndex.push(index) //新添加元素的下标等于该数组的length
      this.$axios({
        method:"post",
        url:"http://127.0.0.1:3000/api/user/changePara",
        data:{
          topic_id:this.topic_id,
          selectIndexes:"["+ submitIndex + "]",
          content:this.editedpara,
        }
      }).then((res)=>{
        console.log(res);
      })
    },
    del() {
      this.editedpara = "";
    },
    like(e) {
      if (e.target.className.indexOf("like-selected") == -1) {
        e.target.className = "like-selected"; //切换按钮样式
        this.num++;
      } else {
        e.target.className = "like"; //切换按钮样式
        this.num--;
      }
    },
    storyLineShow() {
      this.showLine = !this.showLine;
    },
    changeTopic(event){
    this.topic_id = event.target.value;
    this.currentPara = {text:this.topic[this.topic_id-1].content}
    this.storyLine = [];
    this.storyLine[0] = this.currentPara.text;
    this.$axios({
      method:"post",
      url:"http://127.0.0.1:3000/api/user/getParas",
      data:{
        id:this.topic_id,
      }
    }).then((res)=>{
      function Tree() {
      //定义结构树类，存储当前话题下全部数据及其结构(模拟数据库)
      var Node = function (element, treeIndexes) {
        //每个节点包含两部分：节点本身数据(对象)和它的子节点(数组)
        this.element = element;
        this.next = [];
        this.treeIndexes = treeIndexes;
      };
      this.root = null; //根节点
      this.current = null; //指针节点，用于找到当前正在浏览的节点位置
      this.append = function (element, depth, treeIndexes) {
        //append方法：1.生成新节点 2.查找treeIndexes的节点位置 3.把该节点加到treeIndexes的子节点数组里
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
      this.change = function (newtext, depth, treeIndexes, index) {
        this.current = this.root;
        for (let i = 0; i < depth; i++) {
          this.current = this.current.next[treeIndexes[i + 1]];
        }
        this.current.next[index].element.text = newtext;
      };
    }
    //初始化树结构
      this.tree = new Tree();
      this.tree.append(this.currentPara, this.depth, [0]);
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        let selectIndexes = JSON.parse(res.data[i].selectIndexes);
        selectIndexes.pop();
        this.tree.append({text:res.data[i].content,author:res.data[i].author,time:new Date(Date.parse(res.data[i].time)).toLocaleDateString()}, selectIndexes.length-1,selectIndexes);
        
      }
      // 给nextParas赋值，不然Swiper不显示
      this.nextParas = this.tree.getNextElement(0,[0]);
    });
    }
  },
};
</script>

<style scoped>
.homepage{
  margin-top: -50px;
}

.swiper-container {
  width: 200px;
  top: 15px;
}

.swiper-slide {
  word-break: normal;
}
.shadowContainer {
  position: relative;
  top: 40px;
}
.shadowContainer p:not(:last-child) {
  border-top: 1px white solid;
  width: 300px;
  margin-bottom:-15px;
  border-radius: 10px;
  background: rgb(37, 37, 245);
  opacity: 0.2;
}
.shadowContainer p:last-child {
  border-top: 1px white solid;
  width: 300px;
  border-radius: 10px;
  margin-bottom: 2px;
  background: rgb(37, 37, 245);
  opacity: 0.2;
}
.add {
  height:35px;
  font-size: 35px;
  margin-top: 90px;
}
.add:hover{
  cursor:pointer;
}
.enterNext {
  margin-top: 10px;
}
.back {
  height: 30px;
  font-size: 30px;
  margin-top: 90px;
}
.back:hover{
  cursor:pointer;
}
.finish {
  width:30px;
  height:30px;
  font-size: 30px;
  display: none;
  margin-left: 200px;
  margin-top: -33px;
  position: relative;
  z-index: 99;
}
.finish:hover{
  cursor: pointer;
}
.addEdit {
  display: none;
  border-radius: 10px;
  margin: 0 auto;
}

.del {
  position: absolute;
  width: 20px;
  height: 20px;
  margin-left: -20px;
}
.currentPara {
  position: relative;
  z-index: 999;
  border: 1px white solid;
  width: 300px;
  margin: 25px auto;
  word-break: normal;
  border-radius: 10px;
  background:white;
  box-shadow: 5px 5px 7px rgba(33,33,33,.7);
}

.like {
  height: 20px;
  width: 20px;
  background: url(../../assets/like1.png) no-repeat;
  background-size: 100%;
}
.like-selected {
  height: 20px;
  width: 20px;
  background: url(../../assets/like.png) no-repeat;
  background-size: 100%;
}
.storycard {
  background:white;
  width: 200px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px 0px;
}
.nextPara {
  border: 1px solid white;
  border-radius: 10px;
  background:white;
}
.nextParas {
  
  position: relative;
}
.swiper-button-prev {
  color: white;
  left: 350px !important;
}
.swiper-button-next {
  color: white;
  right: 350px !important;
}
.currentContainer {
  display: flex;
  justify-content: space-around;
  width: 600px;
  margin: 0 auto;
}
.editContainer {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -222px;
  margin-top: 50px;
  z-index: 99;
}
.storyLinebtn {
  
  left: 50%;
}
.storyLineContainer {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 800px;
  overflow: auto;
  margin-left: 20px;
}
.storyLine {
  margin-top: 10px;
}
.modifying{
  border-radius: 10px;
}
.icon-wulianwang-{
  font-size:50px;
}
.icon-wulianwang-:hover{
  cursor: pointer;
}
.select{
  position:relative;
  left:700px;
  top:50px;
  width:100px;
  height:30px;
  border-radius:10px;
  background: transparent;
}

</style>