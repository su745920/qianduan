<template>
  <view class="">
    <view class="container">
      <view class="circle">
        <svg width="150" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(110,110)">
            <circle r="100" class="e-c-base" />
            <g transform="rotate(-90)">
              <!-- <circle r="100" class="e-c-progress" :style="pathStyle" /> -->
              <circle r="100" class="e-c-progress" :style="{'stroke-dashoffset':this.strokeDashoffset,'stroke-dasharray': this.length}" />
              <g id="e-pointer" :transform="rotatedata">
                <circle cx="100" cy="0" r="8" class="e-c-pointer" />
              </g>
            </g>
          </g>
        </svg>
      </view>
      <view class="controlls">
        <view class="display-remain-time">{{displayOutput}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      length: Math.PI * 2 * 100,
      strokeDashoffset: 0,
      rotatedata: 0,
      displayOutput: 0,
      intervalTimer: '',
      timeLeft: '',
      wholeTime: 0,
      isStarted: false,
      style: '',
      interval: null,
      times: 1000,
      animationFrameID: null,
      oldtime:0,
    }
  },
  props: {
    second: {
      type: Number,
      default: 0
    },
  },
  // computed: {
  // 	pathStyle() {
  // 		let style = {
  // 			'stroke-dasharray': this.length,
  // 			'stroke-dashoffset': this.strokeDashoffset,
  // 		}
  // 		return style
  // 	}
  // },
  created() {

    this.displayOutput = this.second;
    this.wholeTime = this.second;

    this.strokeDashoffset = this.length;
    this.update(this.wholeTime, this.wholeTime);
    this.displayTimeLeft(this.wholeTime);
    this.pauseTimer();
    //this.start();
  },
  destroyed() {
    this.end();
  },
  methods: {

    async start() {
      let remainTime = Date.now() + (this.wholeTime * 1000);
      const f = async () => {
        //具体需要轮询的方法在此编辑

        this.timeLeft = Math.round((remainTime - Date.now()) / 1000);
        this.displayTimeLeft(this.timeLeft)
        //clearTimeout(this.interval);
        //this.interval = setTimeout(() => {
        this.animationFrameID = requestAnimationFrame(f);
        //}, this.times);
      };
      if(!this.animationFrameID){
        this.animationFrameID = requestAnimationFrame(f);
      }
      return true;
    },
    //注销轮询
    end() {
      //clearInterval(this.interval);
      cancelAnimationFrame(this.animationFrameID);
    },

    pauseTimer() {
      if (this.isStarted === false) {
        this.timer(this.wholeTime);
        this.isStarted = true;
      } else if (isPaused) {
        this.timer(this.timeLeft);
        this.isPaused = this.isPaused ? false : true
      } else {
        clearInterval(this.intervalTimer);
        this.isPaused = this.isPaused ? false : true;
      }
    },
    timer(seconds) {
      let _this = this;
      let remainTime = Date.now() + (seconds * 1000);
      this.displayTimeLeft(seconds);

      //this.intervalTimer = setInterval(function() {
      //	_this.timeLeft = Math.round((remainTime - Date.now()) / 1000);
      //	if (_this.timeLeft < 0) {
      //		clearInterval(_this.intervalTimer);
      //		this.isStarted = false;
      //		_this.displayTimeLeft(_this.wholeTime);
      //		return;
      //	}
      //	_this.displayTimeLeft(_this.timeLeft);
      //	console.info(_this.timeLeft);
      //}, 400);
      const f = async () => {
        //具体需要轮询的方法在此编辑

        this.timeLeft = Math.round((remainTime - Date.now()) / 1000);

        if (this.timeLeft < 0) {
          cancelAnimationFrame(this.animationFrameID);
          this.isStarted = false;
          _this.displayTimeLeft(_this.wholeTime);
          return;
        }
        this.displayTimeLeft(this.timeLeft);
        //clearTimeout(this.interval);
        //this.interval = setTimeout(() => {
        this.animationFrameID = requestAnimationFrame(f);
        //}, this.times);
      };
      if(!this.animationFrameID){
        this.animationFrameID = requestAnimationFrame(f);
      }
    },
    update(value, timePercent) {
      var offset = -this.length - this.length * value / (timePercent);
      this.strokeDashoffset = offset;
      this.rotatedata = `rotate(${360 * value / (timePercent)})`;

    },
    displayTimeLeft(timeLeft) {
      let newtime = Date.now();
      if(newtime-this.oldtime<930) return ;
      this.oldtime = newtime;
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft;

      let displayString = `${seconds < 10 ? '0' : ''}${seconds}`;
      this.displayOutput = displayString;
      this.update(timeLeft, this.wholeTime);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300');

button[data-setter] {
  outline: none;
  background: transparent;
  border: none;
  font-family: 'Roboto';
  font-weight: 300;
  font-size: 18px;
  width: 25px;
  height: 30px;
  color: #588bf7;
  cursor: pointer;
}

button[data-setter]:hover {
  opacity: 0.5;
}

.container {
  position: relative;
  top: 0;
  width: 100%;
  margin: 0 auto;
}

.setters {
  position: absolute;
  left: 85px;
  top: 75px;
}

.minutes-set {
  float: left;
  margin-right: 28px;
}

.seconds-set {
  float: right;
}

.controlls {
  width: 100%;
  position: absolute;
  left: 0;
  top: 30%;
  text-align: center;
}

.display-remain-time {
  font-family: Roboto;
  font-weight: 100;
  font-size: 35px;
  color: #588bf7;
}

#pause {
  outline: none;
  background: transparent;
  border: none;
  margin-top: 10px;
  width: 50px;
  height: 50px;
  position: relative;
}

.play::before {
  display: block;
  content: "";
  position: absolute;
  top: 8px;
  left: 16px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 22px solid #588bf7;
}

.pause::after {
  content: "";
  position: absolute;
  top: 8px;
  left: 12px;
  width: 15px;
  height: 30px;
  background-color: transparent;
  border-radius: 1px;
  border: 5px solid #588bf7;
  border-top: none;
  border-bottom: none;
}

#pause:hover {
  opacity: 0.8;
}

.e-c-base {
  fill: none;
  stroke: #ececec;
  stroke-width: 4px
}

.e-c-progress {
  fill: none;
  stroke: #588bf7;
  stroke-width: 4px;
  transition: stroke-dashoffset 0.7s;
}

.e-c-pointer {
  fill: #FFF;
  stroke: #588bf7;
  stroke-width: 2px;
}

#e-pointer {
  transition: transform 0.7s;
}
</style>
