import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router'
const { Header, Sider, Content } = Layout;
class App extends React.Component{
	constructor(props){
    super(props);
  	this.state={
  		collapsed: false,
  	}
  	
  	this.toggle = this._toggle.bind(this);
	}
	_toggle(){
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
	componentWillMount(){
		console.log("componentWillMount")
	}
	componentDidMount(){
		console.log("componentDidMount")
	}
	render(){
	  return (
	     <Layout id="components-layout-demo-custom-trigger">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
            	<Link to="/city">
              	<Icon type="user" />
              	<span className="nav-text">用户</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
	  )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
