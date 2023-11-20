<template>
    <div calss="display">
        <div class="menu">
            <MenuTab/>
        </div>
        <div class="main-widget">
            <PrimaryPopUp/>
            <div class="widget-content">
                <DropdownMenu title="Course" class="dropdown-option"/>
                <DropdownMenu title="Date" class="dropdown-option"/>
                <DropdownMenu title="Student" class="dropdown-option"/>
            </div>
        </div>
    </div>
</template>
<script>
import DropdownMenu from './components/DropdownMenu.vue';
import PrimaryPopUp from './components/PrimaryPopUp.vue';
import MenuTab from './components/MenuTab.vue';
export default {
  name: 'AttendancePage',
  components:{
    DropdownMenu,
    PrimaryPopUp,
    MenuTab
  }
}
</script>
<style>
.display{
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;
}
.menu{
    position: relative;
    height: 75%;
    width: 100%;
}
.main-widget{
    height: 95%;
    width: 95%;
    padding: 2% 0 0 24%;
    position: relative;
}
.main-widget .widget-content{
    width: 80%;
    height: 25%;
    margin: 0 0 0 0;
    position: relative;
    display: flex;
    overflow: hidden;
}
.main-widget .widget-content .dropdown-option{
    position: relative;
    height: 100%;
    width: 100%;
    margin: 2% 5% 0 5%;
    overflow: hidden;
}
</style>