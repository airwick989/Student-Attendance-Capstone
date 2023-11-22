<template>
  <div class="custom-dropdown">
    <div v-on:click="dropDownVisable = true" class="selected-option"><div class="text-wraper">{{title}}</div></div>
      <div v-if="dropDownVisable" class="drop-down-menu">
        <div v-on:click="dropDownVisable = !dropDownVisable" class="option">
         {{options}}
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
    },
    data: function() {
return {
      dropDownVisable: false
  };
}
};
</script>
                             
<style>
.selected-option{
  background-color: #202020;
  border-radius: 10px;
  position: relative;
  height: 100%;
  width: 100%;
}
.text-wraper{
  padding: 1% 0 5% 5%;
  font-family: "Inter-Regular", Helvetica;
  color: #ffffff;
  font-size: 180%;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}
.drop-down-menu{
  position: relative;
  width: 100%;
  height: 120px;
  background-color: #313131;
  opacity: 0.95;
  border-radius: 0 0 25px 25px;
  margin-left: 2.5%;
  overflow-y: scroll;
}
.option{
  top: 7px;
  left: 18px;
  position: absolute;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  color: #ffffff;
  font-size: 36px;
}

body::-webkit-scrollbar {
  width: 14px;               /* width of the entire scrollbar */
}

body::-webkit-scrollbar-track {
  background: #D9D9D9;        /* color of the tracking area */
}
body::-webkit-scrollbar-thumb {
  background-color: #8781AD;    /* color of the scroll thumb */
  border-radius: 5px;       /* roundness of the scroll thumb */
  border: 1px solid #D9D9D9;  /* creates padding around scroll thumb */
}
body {
  scrollbar-width: thin;          /* "auto" or "thin" firefox */
  scrollbar-color: #8781AD #D9D9D9;   /* scroll thumb and track firefox*/ 
}
</style>   

