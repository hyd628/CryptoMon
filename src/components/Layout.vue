<template>
    <section id='layout'>
    <div class="layout">
        <Layout id="layoutinner">
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="layoutview">
                    <div class="layout-logo"><router-link to="/home"><img src="../assets/frontlogo.png"></router-link></div>
                    <div class="layout-nav">
                        <router-link to="/home">
                            <menu-item name="Home">
                                <Icon type="ios-home-outline"></Icon>
                                Home
                            </menu-item>
                        </router-link>
                        <router-link to="/news">
                            <menu-item name="News">
                                <Icon type="ios-list-outline"></Icon>
                                News
                            </menu-item>
                        </router-link>
                        <router-link to="/notification">
                            <menu-item name="Notification">
                                <Icon type="ios-information-outline"></Icon>
                                Notifications
                            </menu-item>
                        </router-link>
                        <router-link to="/account">
                            <menu-item name="Account">
                                <Icon type="ios-person-outline"></Icon>
                                Account
                            </menu-item>
                        </router-link>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider width='200' :style="{background: '#495060'}" collapsible :collapsed-width="30" v-model="isCollapsed">
                    <div v-if="!isCollapsed">
                    <Menu theme="dark" width="auto" :active-name="layoutview" :open-names="sidebarmenu" accordion ref="side_menu">
                        <Submenu name="CryptomonMenu">
                            <template slot="title">
                                <Icon type="social-octocat"></Icon>
                                Cryptomons
                            </template>
                            <router-link to="/spawn"><menu-item name="Spawn">Spawn Cryptomon</menu-item></router-link>
                            <router-link to="/collection"><menu-item name="Collection">View Collection</menu-item></router-link>
                            <router-link to="/transfer"><menu-item name="Transfer">Transfer</menu-item></router-link>
                        </Submenu>
                        <Submenu name="ArenaMenu">
                            <template slot="title">
                                <Icon type="ios-paw"></Icon>
                                Battle Arena
                            </template>
                            <router-link to="/practicebattle"><menu-item name="Practice Battle">Practice Battle</menu-item></router-link>
                            <router-link to="/challengearena"><menu-item name="Challenge Arena">Challenge Arena</menu-item></router-link>
                        </Submenu>
                        <Submenu name="FortressMenu">
                            <template slot="title">
                                <Icon type="cube"></Icon>
                                Fortress
                            </template>
                            <menu-item name="3-1">Option 1</menu-item>
                            <menu-item name="3-2">Option 2</menu-item>
                        </Submenu>
                        <Submenu name="AuctionHouseMenu">
                            <template slot="title">
                                <Icon type="bag"></Icon>
                                Auction House
                            </template>
                            <menu-item name="4-1">Option 1</menu-item>
                            <menu-item name="4-2">Option 2</menu-item>
                        </Submenu>
                    </Menu>
                    </div>
                </Sider>
                <Layout :style="{padding: '0 24px 0px'}" class="layout">
                    <Breadcrumb :style="{margin: '8px 0'}">
                        <BreadcrumbItem to="Home">Dashboard</BreadcrumbItem>
                        <BreadcrumbItem :to="layoutview">{{layoutview}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content id="content">
                        <router-view></router-view>                        
                    </Content>
                    <Footer id="footer">
                        <span>Address Zero Studios &copy; 2018, All Rights Reserved.</span>
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    </div>
    </section>
</template>

<script>

    export default {

        name: 'layout',

        data () {
            return {
                isCollapsed: false
            };
        },

        beforeUpdate: function()
        {
            if(!this.isCollapsed)
            {
                this.$nextTick(() => {
                        this.$refs.side_menu.updateOpened()
                    })
            }
        },

        computed: {

            layoutview: function () {
                return this.$store.state.layoutview
            },

            sidebarmenu: function () {
                if (this.$store.state.layoutview === 'Spawn' || this.$store.state.layoutview === 'Collection' || this.$store.state.layoutview === 'Transfer') 
                {
                    return ['CryptomonMenu']
                } 
                else if (this.$store.state.layoutview === 'Practice Battle' || this.$store.state.layoutview === 'Challenge Arena')
                {
                    return ['ArenaMenu']
                }
                else {
                    return []
                }
            },

        }

    }
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css?family=Monda:400,700');

.layout{
    font-family: 'Monda', sans-serif;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    //background: url("../assets/paws.jpg");
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    text-align: left;
        
}
#layoutinner{
    width: 100%; 
    height: 100%; 
    position: fixed;
    //background: #f5f7f9;
    
}

#content{
    padding: '24px';
    min-Height: '280px'; 

}

#footer{
  font-family: 'Monda', sans-serif;
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