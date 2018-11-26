<template>
  <section class="scoreboard">
    <div
      v-for="(team, index) in teams"
      :key="team.data.teamID"
      :class="`group group--team${index}`"
      :style="`background-color: ${team.data.color}; background-image: url(${team.data.logo})`"
    >
      <div class="team">{{ team.data.teamID }}</div>
      <div class="score">{{ team.score }}</div>
      <div v-if="parseInt(goal) === parseInt(index)" class="team-info team-info--goal">
        <span>Goal!</span>
      </div>
      <div v-else-if="parseInt(powerplay) === parseInt(index)" class="team-info team-info--powerplay">
        <span>Power Play</span>
        <span>{{ getTime(powerplayRemaining) }}</span>
      </div>
    </div>
    <div class="group group--time">
      <div class="period">1st</div>
      <div class="time">{{ getTime(this.timeRemaining) }}</div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      teams: Object,
      goal: {
        type: Number,
        default: 0,
      },
      period: {
        type: Number,
        default: 1,
      },
      timeRemaining: {
        type: Number,
        default: 900
      },
      powerplay: {
        type: Number,
        default: 0,
        validator: function(value) {
          return [0, 1, 2].indexOf(value) !== -1;
        }
      },
      powerplayRemaining: {
        type: Number,
        default: 120,
      },
    },
    methods: {
      getTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;

        if(seconds < 10) {
          seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
      }
    }
  }
</script>

<style scoped>
.scoreboard {
  color: rgba(255, 255, 255, 0.9);
  /* height: 60px; */
  font-size: 30px;
  display: inline-flex;
  align-items: center;
  outline: 2px solid var(--scoreboard-border);
  margin-bottom: 100px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.group {
  position: relative;
  display: flex;
  align-items: center;
  align-self: stretch;
  box-shadow: inset 0 18px 0 rgba(255, 255, 255, 0.2);
  background-position: left 10px center;
  background-size: 55px auto;
  background-repeat: no-repeat;
  padding-left: 60px;
}

.team {
  padding: 0 20px;
  padding-right: 10px;
  text-transform: uppercase;
  font-size: 35px;
}

.score {
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-weight: 700;
  font-size: 50px;
}

.time {
  padding-left: 20px;
}

.team-info {
  position: absolute;
  top: 100%;
  left: -2px;
  width: calc(100% + 4px);
  background-color: inherit;
  z-index: 100;
  border-top: 0;
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 10px;
  letter-spacing: -0.3px;
  border: 2px solid var(--scoreboard-border);
  border-top: 0;

  &--powerplay {
    justify-content: space-between;
  }
}

.group--team1 {
  background-color: #1c4048;
  border-right: 2px solid var(--scoreboard-border);
}

.group--team2 {
  background-color: #da6d17;
  border-right: 2px solid var(--scoreboard-border);
}

.group--time {
  padding: 0 20px;
  background: #ececec;
  color: var(--scoreboard-border);
  font-weight: 700;
  box-shadow: inset 0 18px 0 rgba(255, 255, 255, 0.9);
}
</style>