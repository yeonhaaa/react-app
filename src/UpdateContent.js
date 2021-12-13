import React, { Component } from 'react';
class UpdateContent extends Component {
    constructor(props) {
        super(props);


        this.state = {
            title: this.props.title,
            desc: this.props.desc
        };
    }
    render() {
        return (
            <article>
                <h2>Update Content</h2>
                <form action='/update_process' method='post'
                    onSubmit={function (e) {
                        e.preventDefault();
                        const title = e.target.title.value;
                        const desc = e.target.desc.value;
                        this.props.onSubmit(title, desc);
                    }.bind(this)}>
                    <p><input type='text' name='title'
                        value={this.state.title}
                        onChange={function (e) {
                            this.setState({ title: e.target.value });
                        }.bind(this)}></input></p>
                    <p><textarea name='desc' readOnly
                        value={this.props.desc} onChange={(e) => {
                            this.setState({ desc: e.target.value });
                        }}></textarea></p>
                    <p><input type='submit'></input></p>
                </form>
            </article>
        )
    }
}
export default UpdateContent;