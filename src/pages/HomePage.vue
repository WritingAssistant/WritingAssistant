<template>
  <div>
    <div class="cards">
      <div class="shadowContainer">
        <p class="shadow" v-for="(box,index) in depth" :key="index"><br><br></p>
      </div>
    <p class="currentPara">{{ currentPara }}</p>
    </div>
    <div class="nextParas">
      <p class="nextPara" v-for="(para, index) in nextParas" @click="choosePara(index)" :key="index">
        {{ para }}
      </p>
      <button class="add" @click="addPara">+</button>
      <textarea
        v-model="newPara"
        placeholder="Editing..."
        cols="100"
        rows="10"
        ref="editingArea"
      ></textarea>
      <button class="finish" @click="submit" ref="finish">Finish</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    function List() { //定义结构树类，存储当前话题下全部数据及其结构(模拟数据库)
      var Node = function (element) {
        this.element = element;
        this.next = [];
      };
      this.root = null;
      this.current = null;
      this.append = function (element,depth,treeIndexes) {
        var node = new Node(element)
        if (!this.root) {
          this.root = node;
        } else {
          this.current = this.root
          for (let i = 0; i < depth; i++) { //找到当前浏览位置
            this.current = this.current.next[treeIndexes[i+1]]
          }
          this.current.next.push(node)
        }
      };
      this.getNextElement = function(depth,treeIndexes){
        var result = []
        this.current = this.root
          for (let i = 0; i < depth; i++) {
            this.current = this.current.next[treeIndexes[i+1]]
          }
        for(let i =0;i<this.current.next.length;i++){ //提取element
          result.push(this.current.next[i].element) 
        }
        return result
      }
    }
    this.list = new List()
    this.list.append(this.currentPara,this.depth,this.treeIndexes)
  },
  components: {},
  data() {
    return {
      depth:0,
      treeIndexes:[0],
      newPara: "",
      currentPara:
        "The baby panda, Dora, was unhappy, because her Milk Tooth is falling out. But she did not want to lose it. One night, Dore heard a strange sound coming from her mouth. Dora ran to look in the mirror. Her tooth was crying!",
      nextParas: [],
    };
  },
  
  methods: {
    addPara() {
      this.$refs.editingArea.style.display = "block";
      this.$refs.finish.style.display = "block";
    },
    submit() {
      this.list.append(this.newPara,this.depth,this.treeIndexes)
      this.nextParas = this.list.getNextElement(this.depth,this.treeIndexes) 
      this.$refs.editingArea.style.display = "none";
      this.$refs.finish.style.display = "none";
      this.newPara = "";
    },
    choosePara(index){
      this.depth++
      this.treeIndexes.push(index)
      this.currentPara = this.nextParas[index]
      this.nextParas = this.list.getNextElement(this.depth,this.treeIndexes) 
    }
  },
};
</script>

<style>
.shadowContainer{
  position: relative;
  top:30px;
}
.shadow{
  border-top: 1px black solid;
  width: 300px;
  margin: -20px auto;
  border-radius: 10px;
}
.add {
  margin-top: 20px;
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
.nextPara {
  cursor: pointer;
  width: 200px;
  margin-right: 10px;
  border: 1px black solid;
  word-break: normal;
  border-radius: 10px;
  height: auto;
}
.currentPara {
  border: 1px black solid;
  width: 300px;
  margin: 30px auto;
  word-break: normal;
  border-radius: 10px;
}
</style>