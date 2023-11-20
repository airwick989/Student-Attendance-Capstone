<template>
  <div class="full-height">
    <div class="closed" v-if="closed">
      <img src="../assets/LoginMainPopUp.svg" alt="Background Display Widget" class="background-widget">
      <div class="button-wrapper">
        <button class="arrow-button" v-on:click="closed=!closed"><img src="../assets/ArrowButton.svg" alt="Switch View Button" class="button-img"></button>
      </div>
    </div>
    <div class="open" v-if="!closed">
      <img src="../assets/LoginMainPopUp.svg" alt="Background Display Widget" class="background-widget-open">
      <div class="button-wraper-closser">
        <button class="arrow-button" v-on:click="closed=!closed"><img src="../assets/ArrowButton.svg" alt="Switch View Button" class="button-img"></button>
      </div>
      <div class="menu-content">
        <img src="../assets/Logo.svg" alt="ATTEND-OT Logo" class="logo">
        <PrimaryButton btnText="Home" class="list-button"></PrimaryButton>
        <PrimaryButton btnText="Lecture View" class="list-button"></PrimaryButton>
        <PrimaryButton btnText="Attendance" class="list-button"></PrimaryButton>               
      </div>
    </div>
  </div>
</template>
<script>
  import PrimaryButton from './PrimaryButton.vue';

  export default {
    name: 'MenuWidget',
    components:{
      PrimaryButton
    }
  }
</script>
<style>  
  .full-height{
    position: relative;
    height: 85%;
    width: 85%;
  }
  .background-widget{
    position: relative;
    height: 100%;
    width: 100%;
    opacity: 80%;
    margin-left: -78%;
    overflow: hidden;
  }
  .arrow-button{
    position: relative;
    height: 15%;
    width: 15%;
    background-color: transparent;
    border: 0;
    outline: none;
  }
  .button-img{
    position: relative;
    height: 100%;
    width: 100%;
    :hover{
      fill: #61589A;
    }
  }
  .button-wrapper{
    position: relative;
    height: 100%;
    width: 100%;
    margin: -52% 0 0 2%;
  }
  .background-widget-open{
    position: relative;
    height: 100%;
    width: 100%;
    opacity: 80%;
    margin-left: -24%;
    overflow: hidden;
  }
  .button-wraper-closser{
    position: relative;
    height: 100%;
    width: 100%;
    margin: -52% 0 0 54%;
  }
  .menu-content{
    position: relative;
    height: 100%;
    width: 100%;
    margin: -13% 0 0 2%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .logo{
    position: relative;
    height: 30%;
    width: 30%;
    margin: 0 0 2% 0;
  }
  .list-button{
    position: relative;
    height: 50%;
    width: 50%;
    margin: 3% 0 0 0;
  }
  
</style>