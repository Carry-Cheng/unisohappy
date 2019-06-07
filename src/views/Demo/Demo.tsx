import React from 'react';
export interface DemoProps {
	
}
 
export interface DemoState {
	
}
 
class Demo extends React.Component<DemoProps, DemoState> {
	constructor(props: DemoProps) {
		super(props);
		this.state = {};
	}
	render() { 
		return ( 
			<div>
				React
			</div>
		 );
	}
	// 在渲染前调用,在客户端也在服务端。
	componentWillMount() {
		console.info('componentWillMount')
	}
	// 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
	// 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
	componentDidMount() {
		console.info('componentDidMount')
	}
	// 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
	componentWillReceiveProps(nextProps: any) {
		console.info('componentWillReceiveProps', nextProps)
	}
	// 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
	// 可以在你确认不需要更新组件时使用。
	// shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any) {
	// 	 console.info("shouldComponentUpdate", nextProps, nextState, nextContext)
	// }
	// 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
	componentWillUpdate() {
		console.info('componentWillUpdate')
	}
	// 在组件完成更新后立即调用。在初始化时不会被调用。
	componentDidUpdate(prevProps: any, prevState: any) {
		console.info('componentDidUpdate', prevProps, prevState)
	}
	// 在组件从 DOM 中移除之前立刻被调用。
	componentWillUnmount() {
		console.info('componentWillUnmount')
	}

}
 
export default Demo;