<template>
  <div id="app">
    <Scoreboard
      :team1="teams[1].data"
      :team2="teams[2].data"
      :team1Score="teams[1].score"
      :team2Score="teams[2].score"
      :period="period"
      :timeRemaining="timeRemaining"
      :powerplay="powerplay"
      :powerplayRemaining="powerplayRemaining"
    />
    <div>
      <h4 class="time-label">
        <span>Time</span>
        <span v-if="!this.timeInterval">(Paused)</span>
        <span v-else>(Running)</span>
      </h4>
      <h3 class="time-remaining">{{ formatTimeRemaining(timeRemaining) }}</h3>
      <div>
        <button @click="toggleTime">
          <span v-if="!this.timeInterval">Resume Time</span>
          <span v-else>Pause Time</span>
        </button>
      </div>
    </div>
    <div class="team-wrapper">
      <div class="team-col" v-for="index in 2" :key="index">
        <span v-if="index === 1">Home</span>
        <span v-if="index === 2">Away</span>
        <h1>{{ teams[index].data.name }}</h1>
        <div class="team-col__goals">
          <button @click="removeGoal(index)" :disabled="teams[index].score < 1">-</button>
          <span>{{ teams[index].score }}</span>
          <button @click="addGoal(index)">+</button>
        </div>
        <select v-model="teams[index].data" class="team-dropdown">
          <option v-for="team in allTeams" :key="team.teamID" :value="team">{{ team.name }}</option>
        </select>
        <button class="button" @click="togglePowerplay(index)">
          <span v-if="powerplay !== index">+ Powerplay</span>
          <span v-else>Powerplay ({{ formatTimeRemaining(powerplayRemaining) }} remaining)</span>
        </button>
        <!-- <button @click="startPowerplay(index)">Start Powerplay</button>
        <button @click="stopPowerplay()">Stop Powerplay</button> -->
      </div>
    </div>
    <div>
      <button @click="resetGame">Reset Game</button>
    </div>
  </div>
</template>

<script>
import allTeams from '@/data/teams.json';
import Scoreboard from '@/components/Scoreboard';
import { formatTime } from '@/helpers';

export default {
  name: 'app',
  components: {
    Scoreboard,
  },
  data() {
    return {
      allTeams,
      teams: {
        1: {
          data: allTeams[5],
          score: 0,
        },
        2: {
          data: allTeams[24],
          score: 0,
        },
      },
      period: 1,
      timeRemaining: 900,
      timeInterval: null,
      powerplay: 0,
      powerplayRemaining: 0,
    }
  },
  methods: {
    addGoal(index) {
      this.teams[index].score = this.teams[index].score + 1;
      this.stopTime();
    },
    removeGoal(index) {
      this.teams[index].score = this.teams[index].score - 1;
      this.stopTime();
    },
    togglePowerplay(index) {
      if(!this.powerplay) {
        this.powerplay = index;
        this.powerplayRemaining = 120;
        this.stopTime();
      } else {
        this.powerplay = 0;
      }
    },
    startTime() {
      if (this.timeInterval) return;

      this.timeInterval = setInterval(() => {
        this.timeRemaining = this.timeRemaining - 1;

        if(this.powerplay) {
          if(this.powerplayRemaining > 0) {
            this.powerplayRemaining = this.powerplayRemaining - 1;
          } else {
            this.powerplay = 0;
          }
        }
      }, 1000);
    },
    stopTime() {
      this.timeInterval = clearInterval(this.timeInterval);
    },
    toggleTime() {
      if (this.timeInterval) {
        this.stopTime();
      } else {
        this.startTime();
      }
    },
    resetGame() {
      this.period = 1;
      this.teams[1].score = 0;
      this.teams[2].score = 0;
      this.timeRemaining = 900;
      this.powerplay = 0;
      this.powerplayRemaining = 120;

      // stop time interval
      this.stopTime();
    },
    formatTimeRemaining(time) {
      return formatTime(time);
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1000px;
  margin: 60px auto;
}

.team-wrapper {
  display: inline-flex;
  justify-content: center;
  margin: 30px 0;
  padding: 30px;
  background: rgba(0, 0, 0, 0.15);
}

.team-col {
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-right: 40px;
  }

  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  &__goals {
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin: 0 20px;
    }
  }
}

.team-dropdown {
  margin-bottom: 20px;
}

.time-label {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  > *:not(:last-child) {
    margin-right: 5px;
  }
}

.time-remaining {
  font-weight: 700;
  font-size: 30px;
  margin: 10px 0;
}

.button {
  background: #333;
  color: #fff;
  border: 0;
  padding: 10px;
  border-radius: 3px;
}
</style>
