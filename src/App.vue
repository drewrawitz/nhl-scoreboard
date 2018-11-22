<template>
  <div id="app">
    <Scoreboard
      v-if="team1 && team2"
      :team1="team1"
      :team2="team2"
      :team1Score="team1Score"
      :team2Score="team2Score"
      :period="period"
      :timeRemaining="timeRemaining"
      :powerplay="powerplay"
      :powerplayRemaining="powerplayRemaining"
    />

    <div>
      <button @click="resetGame">Reset Game</button>
      <button @click="startTime">Start Time</button>
      <button @click="stopTime">Stop Time</button>
    </div>
    <div>
      <h1>Team 1</h1>
      <select v-model="team1">
        <option v-for="team in teams" :key="team.teamID" :value="team">{{ team.name }}</option>
      </select>
      <button @click="addGoal(1)">Add Goal</button>
      <button @click="startPowerplay(1)">Start Powerplay</button>
      <button @click="stopPowerplay()">Stop Powerplay</button>
    </div>
    <div>
      <h1>Team 2</h1>
      <select v-model="team2">
        <option v-for="team in teams" :key="team.teamID" :value="team">{{ team.name }}</option>
      </select>
      <button @click="addGoal(2)">Add Goal</button>
      <button @click="startPowerplay(2)">Start Powerplay</button>
      <button @click="stopPowerplay()">Stop Powerplay</button>
    </div>
  </div>
</template>

<script>
import teams from '@/data/teams.json';
import Scoreboard from '@/components/Scoreboard';

export default {
  name: 'app',
  components: {
    Scoreboard,
  },
  data() {
    return {
      teams,
      team1: teams[Math.floor(Math.random() * teams.length)],
      team2: teams[Math.floor(Math.random() * teams.length)],
      team1Score: 0,
      team2Score: 0,
      period: 1,
      timeRemaining: 900,
      timeInterval: null,
      powerplay: 0,
      powerplayRemaining: 0,
    }
  },
  methods: {
    startPowerplay(team) {
      if(team !== 1 && team !== 2) return;

      this.powerplay = team;
      this.powerplayRemaining = 120;
      this.stopTime();
    },
    stopPowerplay() {
      this.powerplay = 0;
    },
    addGoal(team) {
      if(team !== 1 && team !== 2) return;

      if(team === 1) {
        this.team1Score = this.team1Score + 1;
      }

      if(team === 2) {
        this.team2Score = this.team2Score + 1;
      }

      this.stopTime();
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
    resetGame() {
      this.period = 1;
      this.team1Score = 0;
      this.team2Score = 0;
      this.timeRemaining = 900;
      this.powerplay = 0;
      this.powerplayRemaining = 120;

      // stop time interval
      this.stopTime();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
