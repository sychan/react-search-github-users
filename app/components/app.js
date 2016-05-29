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
            userFound: false,
            userData: [],
            userRepos: [],
            perPage: 10
        }
    }
    getUserData() {
        axios(`https://api.github.com/users/${this.state.username}?client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}`,
            this.props.githubConfig)
        .then(resp => {
            this.setState({userData: resp.data, userFound: true});
            //console.log(resp.data);
        })
        .catch((err) => {
            this.setState({username: null, userFound: false});
            //alert(err);
            console.log(err);
        });
    }
    getUserRepos() {
        axios(`https://api.github.com/users/${this.state.username}/repos?per_page=${this.state.perPage}&client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}&sort=created`,
            this.props.githubConfig)
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
                <Search onFormSubmit={this.handleFormSubmit.bind(this)} userFound={this.state.userFound} />
                {(this.state.userFound) ? <Profile {...this.state} /> : ''}
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
    clientSecret: config.__CLIENT_SECRET__,
    githubConfig: {
        headers: {'Accept': 'application/vnd.github.v3+json'}
    }
};

export default App;