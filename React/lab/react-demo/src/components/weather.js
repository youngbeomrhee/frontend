import axios from 'axios';
// var axios = require('axios');

axios.get('http://api.wunderground.com/api/Your_Key/conditions/q/CA/San_Francisco.json')
    .then(function (response) {
    // handle success
    console.log(response);
});
