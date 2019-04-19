<template>
  <div id="bubbles">
    <div ref="userinfo" class="cont_forms"/>
    <div v-for="bub in bubs" :class="['bub','bub-'+bub.id, bub.id%3===0?'left':'']" :key="bub.id" @click="remove_bub(bub.id)" :style="{'background-color': bub.color, height: bub.r+'px', width: bub.r+'px', 'animation-duration': bub.anim_dur+'s', left: bub.left+'%'}"/>
  </div>
</template>

<script>
  export default {
    props: {

    },
    data () {
      return {
        bub_index: 0,
        bubs: [],
        color_array: ['#21CD92', '#e91e63', '#9c27b0', '#2196f3', '#00bcd4', '#4caf50', '#009688', '#ffc107', '#ff5722', '#607d8b', '#795548', '#f44336', '#936']
      }
    },
    created () {
      setInterval(() => { this.create_bub() }, 500)
    },
    mounted () {
      this.$refs.userinfo.className = 'xxxxx'
      console.log(this.$refs.userinfo.className, 'ref')
    },
    methods: {
      random_int (min, max) {
        let mins = min || 0
        let maxs = max || 2
        return Math.floor((Math.random() * (maxs - mins)) + min)
      },
      create_bub () {
        let time = this.random_int(10, 21)
        let index = this.bub_index++
        this.bubs.push({id: index, r: this.random_int(20, 201), color: this.color_array[this.random_int(0, this.color_array.length)], left: this.random_int(10, 91), anim_dur: time})
        setTimeout(() => { this.remove_bub(index) }, time * 1000)
      },
      remove_bub (id) {
        var index
        for (let i in this.bubs) { if (id === this.bubs[i].id) { index = i } }
        if (index) { this.bubs.splice(index, 1) };
      }
    }
  }
</script>

<style scoped>
body {
  overflow: hidden;
}
.bub {
  position: absolute;
  top: calc(100% + 150px);
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  border-radius: 100%;
  opacity: 0.2;
  -webkit-animation: floatR ease forwards;
          animation: floatR ease forwards;
}
.bub.left {
  -webkit-animation: floatL ease forwards;
          animation: floatL ease forwards;
}
@-webkit-keyframes floatR {
  to {
    top: -150px;
    -webkit-transform: translate(150%, -50%);
            transform: translate(150%, -50%);
  }
}
@keyframes floatR {
  to {
    top: -150px;
    -webkit-transform: translate(150%, -50%);
            transform: translate(150%, -50%);
  }
}
@-webkit-keyframes floatL {
  to {
    top: -150px;
    -webkit-transform: translate(-250%, -50%);
            transform: translate(-250%, -50%);
  }
}
@keyframes floatL {
  to {
    top: -150px;
    -webkit-transform: translate(-250%, -50%);
            transform: translate(-250%, -50%);
  }
}

</style>
