
<template>
  <div class="button-wrapper">
    <button :class="['slim-btn', className]">
      <div class="text-wrapper">{{btnText}}</div>
    </button>
  </div>
</template>
  
  <script>
  export default {
    name: "primaryButton",
    props: {
      className: {
        type: String,
        default: "",
      },
      btnText: {
        type: String,
        required: true,
      }
    },
  };
  </script>
  
  <style>
 .button-wrapper :hover{
        background-color: #61589A;
        border-radius: 50px;
      }
  .slim-btn {
      width: 100%;
      height: 100%;
      position: relative;
      background-color: #8781ad;
      border-radius: 50px;
      border: none;
  }
  
  .slim-btn .text-wrapper {
    padding: 1%;
    font-family: "Inter-Regular", Helvetica;
    color: #ffffff;
    font-size: 180%;
    letter-spacing: 0;
    line-height: normal;
    white-space: nowrap;
    text-align: center;
  }
  </style>