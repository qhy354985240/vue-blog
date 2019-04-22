<template>
  <div class="container demo-2">
    <div class="content">
      <div id="large-header" class="large-header" ref="largeRef">
        <canvas id="demo-canvas"/>
        <h1 class="main-title">Totoro</h1>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
      }
    },
    mounted () {
      this.canvasPanel(this.$refs.largeRef)
    },

    methods: {
      canvasPanel (largeHeader) {
        var width, height, canvas, ctx, circles, target, animateHeader = true
        // Main
        initHeader()
        addListeners()

        function initHeader () {
          console.log('xxx')
          console.log(window.innerHeight)
          width = window.innerWidth
          height = 350
          target = {x: 0, y: height}
          // largeHeader = document.getElementById('large-header')
          largeHeader.style.height = height + 'px'

          canvas = document.getElementById('demo-canvas')
          canvas.width = width
          canvas.height = height
          ctx = canvas.getContext('2d')

          // create particles
          circles = []
          for (var x = 0; x < width * 0.5; x++) {
            var c = new Circle()
            circles.push(c)
          }
          animate()
        }

        // Event handling
        function addListeners () {
          window.addEventListener('scroll', scrollCheck)
          window.addEventListener('resize', resize)
        }

        function scrollCheck () {
          if (document.body.scrollTop > height) animateHeader = false
          else animateHeader = true
        }

        function resize () {
          width = window.innerWidth
          height = 350
          largeHeader.style.height = height + 'px'
          canvas.width = width
          canvas.height = height
        }

        function animate () {
          if (animateHeader) {
            ctx.clearRect(0, 0, width, height)
            for (var i in circles) {
              circles[i].draw()
            }
          }
          requestAnimationFrame(animate)
        }

        // Canvas manipulation
        function Circle () {
          var _this = this;

          // constructor
          (function () {
            _this.pos = {}
            init()
          })()

          function init () {
            _this.pos.x = Math.random() * width
            _this.pos.y = height + Math.random() * 100
            _this.alpha = 0.1 + Math.random() * 0.3
            _this.scale = 0.1 + Math.random() * 0.3
            _this.velocity = Math.random()
          }

          this.draw = function () {
            if (_this.alpha <= 0) {
              init()
            }
            _this.pos.y -= _this.velocity
            _this.alpha -= 0.0005
            ctx.beginPath()
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false)
            ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')'
            ctx.fill()
          }
        }
      }

    }
  }
</script>

<style scoped>
   .large-header {
	position: relative;
	width: 100%;
	background: #333;
	overflow: hidden;
	background-size: cover;
	background-position: center center;
	z-index: 1;
}

.demo-2 .large-header {
	background-image: url('../assets/img/demo-2-bg.jpg');
	background-position: center bottom;
}

.main-title {
	position: absolute;
	margin: 0;
	padding: 0;
	color: #f9f1e9;
	text-align: center;
	top: 50%;
	left: 50%;
	-webkit-transform: translate3d(-50%,-50%,0);
	transform: translate3d(-50%,-50%,0);
}

.demo-2 .main-title {
	font-family: 'Clicker Script', cursive;
	font-weight: normal;
	font-size: 8em;
	padding-left: 10px;
	text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
}

.demo-2 .main-title::before {
	content: '';
	width: 20vw;
	height: 20vw;
	min-width: 3.5em;
	min-height: 3.5em;
	background: url(../assets/img/deco.svg) no-repeat center center;
	background-size: cover;
	position: absolute;
	top: 50%;
	left: 50%;
	border-radius: 50%;
	z-index: -1;
	-webkit-transform: translate3d(-50%,-50%,0);
	transform: translate3d(-50%,-50%,0);
}

.main-title .thin {
	font-weight: 200;
}

@media only screen and (max-width : 768px) {

	.demo-2 .main-title {
		font-size: 4em;
	}
}
</style>
