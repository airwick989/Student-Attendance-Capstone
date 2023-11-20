<template>
    <div class="full-height">
        <div class="menu-tab">
            <img src="../assets/LoginMainPopUp.svg" alt="Background Display Widget" class="background-widget">
            <button class="arrow-button-hover"><img src="../assets/ArrowButtonHover.svg" alt="Hover State Display"></button> 
            <button class="arrow-button"><img src="../assets/ArrowButton.svg" alt="Switch View Button"></button>
            <div class="menu-content">
                <img src="../assets/Logo.svg" alt="ATTEND-OT Logo" class="logo">
                <PrimaryButton btnText="Home" class="List-button"></PrimaryButton>
                <PrimaryButton btnText="Lecture View" class="list-button"></PrimaryButton>
                <PrimaryButton btnText="Attendance" class="list-button"></PrimaryButton>               
            </div>
        </div>
    </div>
</template>
<script>
    import PrimaryButton from './PrimaryButton.vue';
    
    export default {
      name: 'LogIn',
      components:{
        PrimaryButton
      }
    }
</script>
<style>
.full-height{
    background-color: #3A3A3A;
    opacity: 80%;
    align-items: center;
    margin-top: 3.5%;
}
.menu-tab{
    position: absolute;
    margin-left: -300px;
}
.menu-tab .arrow-button{
    height: max-content;
    width: max-content;
    position: absolute;
    background-color: transparent;
    border: 0;
    outline: none;
    margin: 20px 0 0 -200px;
    transform: scaleX(-1);
    :hover{
        opacity: 0;
    }
}
.menu-tab .arrow-button-hover{
    height: max-content;
    width: max-content;
    position: absolute;
    background-color: transparent;
    margin: 20px 0 0 -200px;
    border: 0;
    outline: none;
    transform: scaleX(-1);
}
.menu-tab .menu-content{
    position: absolute;
    margin: -580px 0 0 325px;
}
.menu-tab .menu-content .logo{
    margin-bottom: 15px;
}
.menu-tab .menu-content .list-button{
    position: relative;
    margin: 15px 0 15px 0;
}
</style>