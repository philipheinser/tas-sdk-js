import fetch from 'node-fetch';
import CryptoJS from 'crypto-js';
import moment from 'moment';

const baseUrl = 'https://api.trivago.com/webservice/tas/';

class Trivago {

  constructor(opts) {
    this.access_id = opts.access_id;
    this.secret_key = opts.secret_key;

    this.language = opts.language || 'en-US';
  }

  getLocations(query) {

    return this.sendRequest('locations', { query: query });
  }

  getHotelCollection(start_date, end_date) {

    let params = {
      start_date: moment(start_date).format(),
      end_date: moment(end_date).format(),
    };

    return this.sendRequest('hotels', params);
  }

  getHotelDetails(item) {

    return this.sendRequest('hotels/'+item);
  }

  getTrankingID() {
    return '';
  }

  sendRequest(endpoint, query_parameters) {

    const url = this.create_signed_url(endpoint, query_parameters);

    return fetch(url, { method: 'GET', headers: {
      'Accept-Language': this.language,
      Accept: 'application/vnd.trivago.affiliate.hal+json;version=1',
      Cookie: 'tid=' + this.getTrankingID(),
    }})
    .then(function(res) {
        return res.json();
    });
  }

  create_signed_url(endpoint, query_parameters) {

    query_parameters = query_parameters || {};

    // Add ISO8601 timestmap and access_id to parameters
    query_parameters['timestamp'] = moment().format();
    query_parameters['access_id'] = this.access_id;

    // Sort query parameters
    var sorted_query_parameters = {};

    Object.keys(query_parameters).sort().forEach(function(key) {
        sorted_query_parameters[key] = query_parameters[key];
    });

    // build query string
    var query_string = [];
    Object.keys(sorted_query_parameters).map(function(key) {
        query_string.push(encodeURIComponent(key) + '=' + encodeURIComponent(sorted_query_parameters[key]));
    });

    query_string = query_string.join('&');

    // build final string to be hashed
    var unhashed_signature = [
        'GET',
        'api.trivago.com',
        '/webservice/tas/'+endpoint,
        query_string
    ].join('\n');

    // Add signature to parameters
    query_string += '&signature=' + CryptoJS.HmacSHA256(unhashed_signature, this.secret_key).toString(CryptoJS.enc.Base64);

    return baseUrl + endpoint + '?' + query_string;
  }
}

export default Trivago;
