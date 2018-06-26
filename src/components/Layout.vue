<template>
    <div class="layout">
        <Layout id="layoutinner">
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"><img src="../assets/logo.png"></div>
                    <div class="layout-nav">
                        <menu-item name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </menu-item>
                        <menu-item name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </menu-item>
                        <menu-item name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </menu-item>
                        <menu-item name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </menu-item>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#495060'}">
                    <Menu theme="dark" width="auto">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <menu-item name="1-1">Option 1</menu-item>
                            <menu-item name="1-2">Option 2</menu-item>
                            <menu-item name="1-3">Option 3</menu-item>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <menu-item name="2-1">Option 1</menu-item>
                            <menu-item name="2-2">Option 2</menu-item>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <menu-item name="3-1">Option 1</menu-item>
                            <menu-item name="3-2">Option 2</menu-item>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <slot></slot>
                    </Content>
                    <Footer id="footer">
                        Address Zero Studios &copy; 2018, All Rights Reserved
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        name: 'layout'
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
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
img {
    max-width: 100%;
    max-height: 100%;
}
</style>