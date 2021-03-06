/**
 * 后台controller基类
 * @return {[type]} [description]
 */
var fs = require("fs");
module.exports = Controller(function(){
	return {
		init: function(http){
			this.super_("init", http);
			if (this.navType) {
				this.assign("navType", this.navType);
			};
			if (this.http.action != "login") {
				return this.checkLogin();
			};
		},
		/**
		 * 检测是否登录
		 * @return {[type]} [description]
		 */
		checkLogin: function(){
			var self = this;
			return this.session("login").then(function(value){
				if (isEmpty(value)) {
					if (self.isAjax()) {
						return self.error(403);
					}else{
						return self.redirect("/login");
					}
				}else{
					self.login = value;
					self.assign('login', value)
				}
			})
		},
		/**
		 * 删除HTML的静态化缓存
		 * @return {[type]} [description]
		 */
		rmHtmlCache: function(path){
			path = path || C('html_cache_path');
			var self = this;
			fs.readdir(path, function(err, files){
				if (err) {
					return;
				};
				files.forEach(function(item){
					var filePath = path + "/" + item;
					var stat = fs.statSync(filePath);
					if (stat.isFile()) {
						fs.unlink(filePath, function(){});
					}else if (stat.isDirectory()) {
						self.rmHtmlCache(filePath);
					};
				})
			})
		}
	}
})