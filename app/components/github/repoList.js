import React, {Component} from 'react';
import Repo from './repo'

class RepoList extends Component {
    render() {
        return (
            <div>
                <h3>User Repositories</h3>
                <ul className="list-group">
                    {
                        this.props.userRepos.map(repo => {
                            return <Repo repo={repo} key={repo.id} {...this.props} />
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default RepoList;