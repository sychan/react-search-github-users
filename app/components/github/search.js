import React, {Component} from 'react';

class Search extends Component {
    onSubmit(e) {
        e.preventDefault();
        let username = this.refs.username.value.trim();
        if (!username) {
            this.setState({userFound: false});
        }
        this.props.onFormSubmit(username);
        this.refs.username.value = '';
    }
    usernameCheck() {
        return (this.props.userFound === false) ? <div className="not-found">no user found</div> : '';
    }
    render() {
        return (
            <div>
                <div className="form-group">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <label for="search-box">Search Github Users</label>
                        <input type="text" ref="username" className="form-control" id="search-box" placeholder="Enter username" />
                    </form>
                </div>
                {this.usernameCheck()}
            </div>
        )
    }
}

export default Search;