import React, {Component} from 'react';

class Search extends Component {
    onSubmit(e) {
        e.preventDefault();
        let username = this.refs.username.value.trim();
        if (!username) {
            alert('Please enter a useranem');
            return;
        }
        this.props.onFormSubmit(username);
        this.refs.username.value = '';
    }
    render() {
        return (
            <div className="form-group">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label for="search-box">Search Github Users</label>
                    <input type="text" ref="username" className="form-control" id="search-box" placeholder="search repos" />
                </form>
            </div>
        )
    }
}

export default Search;