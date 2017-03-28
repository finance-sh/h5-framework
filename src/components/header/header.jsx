/**
 * @file   Header模块
 * @author yangxiaoxu
 */
import React from 'react';
import './header.less';
import $ from 'webpack-zepto';
import Data from './data.json';
class Header extends React.Component {
    constructor() {
        super();
    }
    handleClick() {
        $('#nav-box').toggle();

        var get =  function (url,fn){
         var obj= new XMLHttpRequest();            
          obj.open('GET',url,true);
          obj.onreadystatechange = function(){
              if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) {
                  fn.call(this, obj.responseText);  
              }
          };
         obj.send(null);
     }

     get('/data',function(){
       
     })


    }
    render() {
        let nav = (
        <div id="nav-box" className="nav-box" >
            <ul>{
        Data.map(function(item) {
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
