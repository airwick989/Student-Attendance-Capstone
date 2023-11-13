<template>
  <div class="full-height">
    <div class="menu-tab">
      <img src="./assets/LoginMainPopUp.svg" alt="Background Display Widget" class="background-widget">
      <button class="arrow-button-hover"><img src="./assets/ArrowButtonHover.svg" alt="Hover State Display"></button> 
      <button class="arrow-button"><img src="./assets/ArrowButton.svg" alt="Switch View Button"></button>
    </div>
  </div>
</template>
<script>
  import UserInputLine from './components/UserInputLine.vue';
  import PrimaryButton from './components/PrimaryButton.vue';
    
  export default {
    name: 'LogIn',
    components:{
      UserInputLine,
      PrimaryButton
    }
  }
</script>
<style>   
  .full-height{
    background-color: #3A3A3A;
    opacity: 80%;
    align-items: center;
    margin-top: 3.5%;
  }
  .menu-tab{
    position: absolute;
    margin-left: -900px;
  }
  .menu-tab .arrow-button{
    height: max-content;
    width: max-content;
    position: absolute;
    background-color: transparent;
    border: 0;
    outline: none;
    margin: 20px 0 0 -200px;
    :hover{
      opacity: 0;
    }
  }
  .menu-tab .arrow-button-hover{
    height: max-content;
    width: max-content;
    position: absolute;
    background-color: transparent;
    margin: 20px 0 0 -200px;
    border: 0;
    outline: none;
  }
</style>