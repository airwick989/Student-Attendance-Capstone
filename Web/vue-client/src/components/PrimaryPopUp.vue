<template>
    <div class="box">
      <div class="main-pop-up"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "primaryPopUp",
  };
  </script>
  
  <style>
  .box {
    height: 100%;
    width: 100%;
  }
  
  .box .main-pop-up {
    background-color: #3a3a3a;
    opacity: 0.85;
    border-radius: 25px;
    height: 85%;
    position: fixed;
    width: 75%;
  }
  </style>