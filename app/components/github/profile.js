import React, {Component} from 'react';
import RepoList from './repoList';

require('../../css/profile.scss');

class Profile extends Component {
    render() {
        var data = this.props.userData;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{data.name || data.login}</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={data.avatar_url} alt="avatar" className="thumbnail" style={{width: "100%"}} />
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="label label-primary">{data.public_repos} Repos</span>
                                    <span className="label label-success">{data.public_gists} Gists </span>
                                    <span className="label label-info">{data.followers} Followers</span>
                                    <span className="label label-danger">{data.following} Following</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="list-group">
                                        <li className="list-group-item"><strong>Username: {data.login}</strong></li>
                                        <li className="list-group-item"><strong>Location: {data.location || 'n/a'}</strong></li>
                                        <li className="list-group-item"><strong>Email Address: {data.email || 'n/a'}</strong></li>
                                    </ul>
                                </div>
                            </div>
                            <br/>
                            <a href={data.html_url} className="btn btn-primary" target="_blank">Visit Profile</a>
                        </div>
                    </div>
                    <h3>User Repositories</h3>
                    <RepoList userRepos={this.props.userRepos} />
                </div>
            </div>
        )
    }
}

export default Profile;