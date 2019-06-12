declare const require: any;
import React, { Component } from 'react';
const Style = require('./index.less');
const Logo = require('../../logo.svg');
export default class Index extends Component {
	render() {
		return (
			<div className={Style['app']}>
				<img className={Style['logo']} src={Logo} alt="logo"/>
				<h1>Uni So Happy</h1>
				<h2>Build with Parcel</h2>
				<a href="/canvas">Canvas Demo</a>
				<a href="/demo">React Demo</a>
				<a href="/echart">ECharts</a>
				<a href="/bug">逆袭之路</a>
			</div>
		)
	}
}
