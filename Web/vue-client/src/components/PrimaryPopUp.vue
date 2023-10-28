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
    height: 824px;
    width: 1195px;
  }
  
  .box .main-pop-up {
    background-color: #3a3a3a;
    opacity: 0.85;
    border-radius: 25px;
    height: 824px;
    position: fixed;
    width: 1195px;
  }
  </style>