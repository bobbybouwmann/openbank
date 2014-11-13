 var google = new OAuth2('google', {
 	client_id: '952993494713-h12m6utvq8g8d8et8n2i68plbrr6cr4d.apps.googleusercontent.com',
 	client_secret: 'IZ4hBSbosuhoWAX4lyAomm-R',
 	api_scope: 'https://www.googleapis.com/auth/tasks'
 });
 var facebook = new OAuth2('facebook', {
 	client_id: '177955888930840',
 	client_secret: 'b42a5741bd3d6de6ac591c7b0e279c9f',
 	api_scope: 'read_stream,user_likes'
 });
 var github = new OAuth2('github', {
 	client_id: '09450dfdc3ae76768b08',
 	client_secret: '8ecfc23e0dba1ce1a295fbabc01fa71db4b80261',
 });
 var openbank = new OAuth2('openbank', {
 	client_id: 'HomebankApp'
 });
 function authorize(providerName) {
 	console.log("Function authorize in options");
 	var provider = window[providerName];
 	provider.authorize(checkAuthorized);
 }
 function clearAuthorized() {
 	console.log("Function clearAuthorized");
 	['google', 'facebook', 'github', 'openbank'].forEach(function(providerName) {
 		var provider = window[providerName];
 		provider.clearAccessToken();
 	});
 	checkAuthorized();
 }
 function checkAuthorized() {
 	console.log("Function checkAuthorized");
 	['google', 'facebook', 'github', 'openbank'].forEach(function(providerName) {
 		var provider = window[providerName];
 		var button = document.querySelector('#' + providerName);
 		if (provider.hasAccessToken()) {
 			button.classList.add('authorized');
 		} else {
 			button.classList.remove('authorized');
 		}
 	});
 }

document.addEventListener('DOMContentLoaded', function () {
	console.log("Function addEventListener");
	document.querySelector('button#google').addEventListener('click', function() { authorize('google'); });
	document.querySelector('button#github').addEventListener('click', function() { authorize('github'); });
	document.querySelector('button#facebook').addEventListener('click', function() { authorize('facebook'); });
	document.querySelector('button#openbank').addEventListener('click', function() { authorize('openbank'); });
	document.querySelector('button#clear').addEventListener('click', function() { clearAuthorized() });
	checkAuthorized();
});
