import React, { Component } from 'react';
class Control extends Component {
    render() {
        return (
            <ul>
                <li>
                    <a href='/create' onClick={function (e) {
                        e.preventDefault();
                        this.props.onChangeMode('create');
                    }.bind(this)}>create</a>
                </li>
                <li><a href='/update' onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangeMode('update');
                }.bind(this)}>update</a></li>
                <li><button onClick={function (e) {
                    e.preventDefault();
                    this.props.onChangeMode('delete');
                }.bind(this)}>delete</button></li>
            </ul>
        )
    }
}
export default Control; // 디폴트 쓰고있어서 App에 import 할 때 중괄호 없이 데려옴 