<template>
    <div class="user-input-line">
      <div class="text-wrapper">
        <input class="input-line" type="text" id="inputLine" name="inputLine" :placeholder="prompt"><br><br>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserInputLine",
    props:{
      prompt:{
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
  
  /* .user-input-line .text-wrapper {
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
  } */
  .user-input-line .text-wrapper .input-line{
    color: #ffffff;
    background-color: #313131;
    border-radius: 5px;
    border: 0;
    outline: none;
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
  
  