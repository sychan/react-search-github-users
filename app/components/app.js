import React, {Component} from 'react';
import config from '../config';
import axios from 'axios';
import Profile from './github/profile';
import Search from './github/search';

require('../css/style.scss');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userExist: false,
            userData: [],
            userRepos: [],
            perPage: 10,
        }
    }
    getUserData() {
        axios(`https://api.github.com/users/${this.state.username}?client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}`)
        .then(resp => {
            this.setState({userData: resp.data, userExist: true});
            //console.log(resp.data);
        })
        .catch((err) => {
            this.setState({username: null, userExist: false});
            //alert(err);
            console.log(err);
        });
    }
    getUserRepos() {
        axios(`https://api.github.com/users/${this.state.username}/repos?per_page=${this.state.perPage}&client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}&sort=created`)
            .then(resp => {
                this.setState({userRepos: resp.data});
                //console.log(resp.data);
            })
            .catch((err) => {
                this.setState({username: null});
                //alert(err);
                console.log(err);
            });
    }
    handleFormSubmit(username = null) {
        this.setState({username: username}, function () {
            this.getUserData();
            this.getUserRepos();
        });
    }
    componentDidMount() {
        this.getUserData();
        this.getUserRepos();
    }
    render() {
        return(
            <div>
                <Search onFormSubmit={this.handleFormSubmit.bind(this)} userExist={this.state.userExist} />
                {(this.state.userExist) ? <Profile {...this.state} /> : ''}
            </div>
        )
    }
}

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
};

App.defaultProps =  {
    clientId: config.__CLIENT_ID__,
    clientSecret: config.__CLIENT_SECRET__
};

export default App;