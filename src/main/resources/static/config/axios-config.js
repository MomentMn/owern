//baseurl
function getRoot() {
	var hostname = location.hostname;
	var pathname = location.pathname;
	var port = location.port;
	var protocol = location.protocol;
	return protocol + "//" + hostname + ":" + port + "/staffdevelop/" ;
}

var baseURL = getRoot();

var server = axios.create({
	baseURL:baseURL
	//baseURL:线上环境
});
var token = Cookies.get('csrftoken');
if(!token){
	token = '123456';
	Cookies.set('csrftoken',token);
}
	
server.defaults.headers.common['Authorization'] = token;
server.defaults.headers.common['userId'] = 19;