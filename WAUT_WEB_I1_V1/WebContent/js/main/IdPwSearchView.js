IdPwSearchView = Class.extend({

	init : function() {
		this.idPwSearchForm = $("#form-id-pw-search");
		this.actionInput = $("#actionId");

		this.searchID();
		this.searchPw();
	},

	searchID : function() {
		var _this = this;
		$("#id-search-btn").click(function() {
			_this.actionInput.val("searchId");

			_this.idPwSearchForm.submit();
		});
	},

	searchPw : function() {
		var _this = this;
		$("#pw-search-btn").click(function() {
			_this.actionInput.val("searchPw");

			_this.idPwSearchForm.submit();
		});
	}
});