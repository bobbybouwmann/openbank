OAuth2.adapter('openbank', {
  /**
   * @return {URL} URL to the page that returns the authorization code
   */
  authorizationCodeURL: function(config) {
    console.log("Function authorizationCodeURL");
    return  'https://commonapi.paymentslab.nl/authserver/oauth2/authorization?' + 
            'client_id=' +  config.clientId + '&' + 
            'redirect_uri=' + this.redirectURL(config) + '&' + 
            'response_type=token&' + 
            'grant_type=implicit';
  },

  /**
   * @return {URL} URL to the page that we use to inject the content
   * script into
   */
  redirectURL: function(config) {
    console.log("Function redirectURL");
    // return 'https://commonapi.paymentslab.nl/index.html';
    return 'chrome-extension://ijjddabfogohnifbdhkolfkbkkceiceh/options.html';
  },

  /**
   * @return {String} Authorization code for fetching the access token
   */
  parseAuthorizationCode: function(url) {
    console.log("Function parseAuthorizationCode");
    return url.match(/[&\?]access_token=([^&]+)/)[1];
  },

  /**
   * @return {URL} URL to the access token providing endpoint
   */
  accessTokenURL: function() {
    console.log("Function accessTokenURL");
    return 'http://ingcommonapi-test.apigee.net/commonapi/v0/nl/';
  },

  /**
   * @return {String} HTTP method to use to get access tokens
   */
  accessTokenMethod: function() {
    console.log("Function accessTokenMethod");
    return 'POST';
  },

  /**
   * @return {Object} The payload to use when getting the access token
   */
  accessTokenParams: function(authorizationCode, config) {
    console.log("Function accessTokenParams");
    return {
      code: authorizationCode,
      client_id: config.clientId,
      grant_type: "authorization_code",
      redirect_uri: this.redirectURL(config)
    };
  },

  /**
   * @return {Object} Object containing accessToken {String},
   * refreshToken {String} and expiresIn {Int}
   */
  parseAccessToken: function(response) {
    console.log("Function parseAccessToken");
    return {
      accessToken: response.match(/access_token=([^&]*)/)[1]
    };
  }
});
