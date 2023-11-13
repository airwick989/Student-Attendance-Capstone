
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
      }
  .slim-btn {
      width: 250px;
      height: 65px;
      background-color: #8781ad;
      border-radius: 50px;
      border: none;
  }
  
  .slim-btn .text-wrapper {
    color: #ffffff;
    font-family: "Inter-Regular", Helvetica;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    text-align: center;
  }
  </style>