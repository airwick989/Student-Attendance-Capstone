<template>
    <div class="custom-dropdown">
      <div class="selected-option"><div class="text-wraper">here</div></div>
        <div class="items">
          <div class="option">
            {{ option }}
          </div>
      </div>
      
    </div>
  </template>
                               
  <script>
  export default {
     name: "CustomDropdown",
     props:{
        title:{
          type: String,
          default: "",
        },
        options:{
          type: Array,
          required: true,
        },
      }
  };
  </script>
                               
  <style>
  .selected-option{
    background-color: #1f1f1f;
    border-radius: 10px;
    position: relative;
    height: 74px;
    width: 325px;
  }
  .text-wraper{
    padding: 14px 0 0 5px;
    font-family: "Inter-Regular", Helvetica;
    color: #ffffff;
    font-size: 36px;
    letter-spacing: 0;
    line-height: normal;
    white-space: nowrap;
  }
  </style>   
  