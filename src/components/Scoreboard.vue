<template>
  <section class="c-scoreboard">
    <div class="c-scoreboard__group team1">
      <div class="c-scoreboard__team">SJ</div>
      <div class="c-scoreboard__score">2</div>
    </div>
    <div class="c-scoreboard__group team2">
      <div class="c-scoreboard__team">EDM</div>
      <div class="c-scoreboard__score">1</div>
      <div class="c-scoreboard__powerplay">
        <span>Power Play</span>
        <span>1:37</span>
      </div>
    </div>
    <div class="c-scoreboard__group time">
      <div class="c-scoreboard__period">1st</div>
      <div class="c-scoreboard__time">8:15</div>
    </div>
  </section>
</template>

<style scoped>
.c-scoreboard {
  color: rgba(255, 255, 255, 0.9);
  height: 60px;
  font-size: 30px;
  display: inline-flex;
  align-items: center;
  outline: 2px solid #4a4a4a;

  &__group {
    position: relative;
    display: flex;
    align-items: center;
    align-self: stretch;
    box-shadow: inset 0 18px 0 rgba(255, 255, 255, 0.2);
    background-position: left center;
    background-size: 60px;
    background-repeat: no-repeat;
    padding-left: 50px;
  }

  &__team {
    padding: 0 20px;
    text-transform: uppercase;
    font-size: 35px;
  }

  &__score {
    background: rgba(0, 0, 0, 0.25);
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-weight: 700;
    font-size: 50px;
  }

  &__time {
    padding-left: 20px;
  }

  &__powerplay {
    position: absolute;
    top: 100%;
    left: -2px;
    width: calc(100% + 2px);
    background-color: inherit;
    z-index: 100;
    border-top: 0;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 10px;
    letter-spacing: -0.3px;
    border: 2px solid rgba(0, 0, 0, 0.25);
    border-top: 0;
  }
}

.team1 {
  background-color: #1c4048;
  background-image: url(../assets/img/tl_sharks.png);
}

.team2 {
  background-color: #da6d17;
  background-image: url(../assets/img/tl_oilers.png);
}

.time {
  padding: 0 20px;
  background: #ececec;
  color: #4a4a4a;
  font-weight: 700;
  box-shadow: inset 0 18px 0 rgba(255, 255, 255, 0.9);
}
</style>