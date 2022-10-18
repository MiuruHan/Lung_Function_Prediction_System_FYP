import React, {Component} from 'react';
const axios = require('axios').default;

class SocialMediaPage extends Component {
    async componentDidMount() {
        axios.get("https://graph.facebook.com/v14.0/3317340611844929/posts?access_token=EAAKc7VZBKw3wBADLyvX6HvlhOgQKoUnkENbUeawtU9Ct61VYwTdos0ZByuaAA4TlG17ogSiMGkqKBalsvDZCvnnbfkY2XCjsiMeZBXqkL6N8kOpIr32tf46CMBazuaZAb9kB5bZCRiIRP08WaXwUtJzwrFbmxuhcdLFhVQlE0bXquGXtOdLg0uPDG3jJuZADkBvHfAqQvVgq8CKck8Hb8djN9XbN3CdbQmCkLRVGJMwCvjeCrRezc0O")
            .then(response => {
                console.log("POSTS",response)
            })
            .catch(error=>{
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default SocialMediaPage;