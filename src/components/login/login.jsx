import React from 'react';
import ReactDOM from 'react-dom';
import styles from './css/login.less';
var UserInput = React.createClass({
	render:function(){
	  return (<div id="login" className="login">
	  	<ul className="d">
		  <li>
		  	<input type="text" name="" placeholder="邮箱s" />
		  	</li>
		  	<li>
		  		<input type="text" name="" placeholder="密码" />
		  	</li>
		  	<li>
		  		<input name="login" type="submit" value="登陆" />
		  	</li>
	  	</ul>
	  	</div>)
	}
})

ReactDOM.render(
  <UserInput />,
  document.getElementById('login-box')
);
