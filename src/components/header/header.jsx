/**
 * @file   Header模块
 * @author yangxiaoxu
 */
import React from 'react';
import './header.less';
import $ from 'webpack-zepto';
const getNavUrl ='/mock/getNav'
class Header extends React.Component {
    constructor() {
        super();
         this.state = {
            navContent: []
          };
    }
    handleClick() {
        $('#nav-box').toggle();
    }
    getData(){
           $.ajax({
            url: getNavUrl,
            data: {
              
            },
            type: 'GET',
            dataType: 'json',
            success: (data) => {
               var that = this;
               if(data.ret === 0){
                   that.setState({
                        navContent:data.content
                   });
               }else{
               }
            },
            error: () => {
  
            },
            complete: () => {
                
            }
        })
    }
    componentDidMount() {
       this.getData(); 
    }
    render() {
        let nav = (
        <div id="nav-box" className="nav-box" >
           <ul>{
              this.state.navContent.map(function(item) {
                  return <li className="item" key={item.name}><a href={item.url}>{item.name}</a></li>
              })
            }</ul> 
         </div>
        );
        return (
            <div>
            <header className="header">
            <a href="/qihang/index.php/Index/index" className="logo">梨花寨</a>
            <a href="#" className="menu" onClick={this.handleClick}>导航</a>
           </header>
            {nav}
        </div>
        );
    }
}
export default Header;
