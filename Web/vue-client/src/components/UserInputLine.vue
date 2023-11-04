<template>
    <div class="user-input-line">
      <div class="text-wrapper">Email</div>
      <hr class="email-line"/>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserInputLine",
    props:{
      propmt:{
        type: String,
        default: "",
      },
      input:{
        type: String,
        default: "",
      },
    }
  };
  </script>
  
  <style>
  .user-input-line {
    height: 40px;
    position: relative;
    width: 450px;
  }
  
  .user-input-line .email-line {
    border: 1px solid;
    border-color: #ffffff;
    left: 0;
    position: relative;
    width: 450px;
  }
  
  .user-input-line .text-wrapper {
    color: #ffffff;
    font-family: "Inter-Regular", Helvetica;
    font-size: 32px;
    font-weight: 400;
    left: 0;
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    white-space: nowrap;
    width: 450px;
    margin-bottom: -12px;
  }
  </style>
  
  