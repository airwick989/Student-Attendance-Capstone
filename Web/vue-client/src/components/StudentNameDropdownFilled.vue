<template>
    <div class="bubble-down-small"></div>
    <div class="bubble-down-large"></div>
    <div class="name-dropdown">
      <div class="overlap-group">
        <p class="text-wrapper">{{ studentInfo }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "NameDropdownFilled",
    props: {
      studentInfo:{
        type: String,
        default: "",
      },
    }
  };
  </script>
  
  <style>
  .bubble-down-small{
    margin-bottom: 2px;
    background-color: #8781ad;
    opacity: 0.45;
    border-radius: 5px;
    height: 5px;
    position: realtive;
    width: 20px;
  }
  .bubble-down-large{
    margin-bottom: 2px;
    margin-left: 7px;
    background-color: #8781ad;
    opacity: 0.45;
    border-radius: 5px;
    height: 10px;
    position: relative;
    width: 40px;
  }
  .name-dropdown {
    margin-left: 24px;
    height: 45px;
    position: relative;
    width: 200px;
  }
  
  .name-dropdown .overlap-group {
    background-color: #8781ad;
    opacity: 0.45;
    border-radius: 5px;
    height: 36px;
    left: 0;
    position: absolute;
    width: 200px;
  }
  
  .name-dropdown .text-wrapper {
    color: #ffffff;
    font-family: "Inter-Regular", Helvetica;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    text-align: center;
  }
  </style>
  