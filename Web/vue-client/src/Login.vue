<template>
    <div class="popup-row">
        <div class="login-card">
            <img src="assets/Logo.svg">
            <UserInputLine propmt="User Name"></UserInputLine>
            <UserInputLine propmt="Password"></UserInputLine>
            <PrimaryButton btnText="Login"></PrimaryButton>
            <img src="assets/LoginMainPopUp.svg">
        </div>
        <div class="switch-card">
            <img src="assets/ArrowButton">
            <img src="assets/LoginMainPopUp.svg">
        </div>
    </div>   
</template>
<script>
export default {
  name: 'Login',
  components:{
    UserInputLine,
    PrimaryButton
  }
}
</script>
<style>
.popup-row{
    display: inline;
    align-items: flex-start;
}
.popup-row .login-card{
    align-self: center;
    align-items: center;
    display: flex;
    justify-content: center;
}
.popup-row .switch-card{
    align-self: flex-start;
}
</style>