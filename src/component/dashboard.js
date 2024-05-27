import React from 'react';
import axios from 'axios';

export default class Dashboard extends React.Component {
    state = {
        image: []
    }

    componentDidMount() {
        axios.get(`https://dog.ceo/api/breeds/image/random`)
            .then(res => {
                this.setState({ image: res.data.message });
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <>
                <div className=" mt-4">
                    <h3 className='text-center'>Welcome to dashboard</h3>
                    <div className="text-center">
                        <img src={this.state.image} alt="new" className="dashboardImg img-thumbnail" />
                    </div>
                </div>
            </>
        )
    }
}