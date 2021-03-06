module.exports = Controller("Admin/BaseController", function(){
	return {
		loginAction: function(){
			var self = this;
			if (self.isPost()) {
				var name = self.post("name").trim();
				var pwd = self.post("pwd").trim();
				if (name == C('admin_username') && pwd == C('admin_password')) {
					self.session("login", name);
					self.success();
				}else{
					self.error(1, "用户名或者密码错误");
				}
			}else{
				this.display();
			}
		},
		/**
		 * 退出
		 * @return {[type]} [description]
		 */
		logoutAction: function(){
			var self = this;
			self.session("login", "");
			self.redirect("/login");
		},
		indexAction: function(){
			var self = this;
			self.redirect("/admin/post/list")
		}
	}
})