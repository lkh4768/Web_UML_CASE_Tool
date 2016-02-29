ConnectionFactory = Class.extend({

	NAME : "ConnectionFactory",

	init : function() {
	},

	createConnection : function(connectionName) {
		var con = eval("new " + connectionName + "()");

		return con;
	}

});