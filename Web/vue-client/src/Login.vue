<template>
<div class="full-height">
    <div class="popup-row">
        <div class="login-card">
            <img src="./assets/LoginMainPopUp.svg" alt="Background Display Widget" class="background-widget">
            <div class="login-content">
                <img src="./assets/Logo.svg" alt="ATTEND-OT Logo" class="logo">
                <div class="input-lines">
                    <UserInputLine prompt="User Name" class="name"></UserInputLine>
                    <UserInputLine prompt="Password" class="pass"></UserInputLine>
                </div>
                <PrimaryButton btnText="Login" class="login-button"></PrimaryButton>
            </div>
        </div>
        <!-- <div class="switch-card">
                <img src="./assets/LoginMainPopUp.svg" alt="Background Display Widget">
                <button class="arrow-button-hover"><img src="./assets/ArrowButtonHover.svg" alt="Hover State Display"></button> 
                <button v-on:click="register()" class="arrow-button"><img src="./assets/ArrowButton.svg" alt="Switch View Button"></button> 
        </div> -->
    </div>  
</div>
</template>
<script>
import UserInputLine from './components/UserInputLine.vue';
import PrimaryButton from './components/PrimaryButton.vue';

export default {
  name: 'LogIn',
  components:{
    UserInputLine,
    PrimaryButton
  }
}
function register(){
    alert("hi")
}
</script>
<style>
    /* background-color: #3A3A3A;
    opacity: 80%; */
.popup-row{
    align-items: center;
    margin-top: 3.5%;
}
.popup-row .login-card{
    position: absolute;
    margin-left: 250px;
}
.popup-row .login-card .login-content{
    position: absolute;
} 
.popup-row .login-card .background-widget{
    position: absolute;
    align-self: center;
    transform: scale(-1, -1);
}
.popup-row .login-card .login-content .logo{
    position: absolute;
    margin: 50px 0 0 280px;
}
.popup-row .login-card .login-content .login-button{
    position: absolute;
    margin: 500px 0 0 860px;
}
.popup-row .login-card .login-content .input-lines{
    position: absolute;
    margin: 150px 0 0 280px;
}
.popup-row .login-card .login-content .input-lines .pass{
    position: absolute;
    margin-top: 20px;
}
.popup-row .switch-card{
    margin-left: -900px;
    position: absolute;
}
.popup-row .switch-card .arrow-button{
    height: max-content;
    width: max-content;
    position: absolute;
    background-color: transparent;
    border: 0;
    outline: none;
    margin: 20px 0 0 -200px;
    :hover{
        opacity: 0;
    }
}
.popup-row .switch-card .arrow-button-hover{
    height: max-content;
    width: max-content;
    position: absolute;
    background-color: transparent;
    margin: 20px 0 0 -200px;
    border: 0;
    outline: none;
}
</style>