<template>
    <div class="layout">
        <Layout id="layoutinner">
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="pageNumber" ref="top_menu">
                    <div class="layout-logo"><img src="../assets/logo.png"></div>
                    <div class="layout-nav">
                        <menu-item name="1">
                            <Icon type="ios-home-outline"></Icon>
                            Home
                        </menu-item>
                        <menu-item name="2">
                            <Icon type="ios-list-outline"></Icon>
                            News
                        </menu-item>
                        <menu-item name="3">
                            <Icon type="ios-information-outline"></Icon>
                            Notifications
                        </menu-item>
                        <menu-item name="4">
                            <Icon type="ios-person-outline"></Icon>
                            Account
                        </menu-item>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider width='200' :style="{background: '#495060'}">
                    <Menu theme="dark" width="auto">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="social-octocat"></Icon>
                                Cryptomons
                            </template>
                            <menu-item name="1-1">Spawn Cryptomon</menu-item>
                            <menu-item name="1-2">View Collection</menu-item>
                            <menu-item name="1-3">Option 3</menu-item>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-paw"></Icon>
                                Battle Arena
                            </template>
                            <menu-item name="2-1">Option 1</menu-item>
                            <menu-item name="2-2">Option 2</menu-item>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="cube"></Icon>
                                Fortress
                            </template>
                            <menu-item name="3-1">Option 1</menu-item>
                            <menu-item name="3-2">Option 2</menu-item>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="bag"></Icon>
                                Auction House
                            </template>
                            <menu-item name="4-1">Option 1</menu-item>
                            <menu-item name="4-2">Option 2</menu-item>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 0px'}">
                    <Breadcrumb :style="{margin: '8px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>                        
                    </Content>
                    <Footer id="footer">
                        <span>Address Zero Studios &copy; 2018, All Rights Reserved</span>
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>

    import Homepage from './Homepage.vue'

    export default {

        name: 'layout',

        data () {
            return {
            pageNumber: '1'
            };
        },

        components: {
            Homepage
        },

        created: function() {
        },

        computed: {

            pseudo: function () {
                return this.$store.state.pseudo
            },

            activeHorizontalMenu: function()
            {
                return 1
            }
        }, 

        methods: {

        }

    }
</script>

<style scoped>
.layout{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    text-align: left;
}
#layoutinner{
    width: 100%; 
    height: 100%; 
    position: fixed;
}

#footer{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-height: 10px;
  font-size: 12px;
  padding-top: 6px;
}

.layout-logo{
    width: 50px;
    height: 50px;
    /*background: #5b6270;*/
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    /*left: 10px;*/
    bottom: 10px;
}
.layout-nav{
    /*width: 420px;*/
    position: fixed;
    right: 0px;
    margin: 0 auto;
    margin-right: 20px;
}
img {
    max-width: 100%;
    max-height: 100%;
}
</style>