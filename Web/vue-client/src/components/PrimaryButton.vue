
<template>
    <button :class="['slim-btn', className]">
      <div class="text-wrapper">{{btnText}}</div>
    </button>
</template>
  
  <script>
  export default {
    name: "primaryButton",
    props: {
      className: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  
  <style>
  .slim-btn {
      width: 233px;
      height: 74px;
      background-color: #8781ad;
      border-radius: 50px;
      border: none;
  }
  
  .slim-btn .text-wrapper {
    color: #ffffff;
    font-family: "Inter-Regular", Helvetica;
    font-size: 32px;
    font-weight: 400;
    left: 42px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 8px;
    white-space: nowrap;
    width: 129px;
  }
  </style>