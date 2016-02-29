UserModifyView = Class.extend({

	init : function(serverRootPath) {
		this.serverRootPath = serverRootPath;
		this.emailFormat = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		this.emergencyEmailVal = $("#user-modify-inputEmergencyEmail").val();
		
		// 처음 모든 input의 check를 false로 초기화
		$(".input-user-modify").each(function(i) {
			$(this).data("check", true);
		});

		this.checkEmergencyEmail();
		this.checkPassword();
		this.checkRePassword();
		this.checkName();

		this.modifyUserInfo();

	},

	modifyUserInfo : function() {
		$("#user-modify-btn").click(function() {
			var isVal = true;
			$(".input-user-modify").each(function(i) {
				if ($(this).data("check") == false) {
					isVal = false;
				}
			});

			if (isVal) {
				$("#userModifyForm").submit();
			}
		});
	},

	checkName : function() {
		$("#user-modify-inputName").keyup(function() {
			var nameVal = $(this).val();

			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");

			if (nameVal.length > 0) {
				checkValImg.attr("title", "사용 가능한 닉네임입니다.");
				checkValImgSrc = checkValImgSrc.replace("warning.png", "warning_over.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check", true);
			} else {
				checkValImg.attr("title", "닉네임을 입력해주세요.");
				checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check", false);
			}
		});
	},

	checkRePassword : function() {
		$("#user-modify-inputRePassword").keyup(function() {
			var rePasswordVal = $(this).val();
			var passwordVal = $("#user-modify-inputPassword").val();

			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");

			// 이메일 형식 검사
			if (rePasswordVal == passwordVal || (rePasswordVal.length == 0 && passwordVal.length == 0)) {
				checkValImg.attr("title", "사용 가능한 비밀번호입니다.");
				checkValImgSrc = checkValImgSrc.replace("warning.png", "warning_over.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check", true);
			} else {
				checkValImg.attr("title", "비밀번호와 일치하지 않습니다.");
				checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check", false);
			}
		});
	},

	checkPassword : function() {
		// 비밀번호 형식 검사
		$("#user-modify-inputPassword").keyup(function() {
			var passwordVal = $(this).val();
			var rePasswordVal = $("#user-modify-inputRePassword");

			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");
			
			var rePasswordInputFormGroup = rePasswordVal.parent().parent();
			var rePasswordCheckValImg = rePasswordInputFormGroup.find(".check-value-img");
			var rePasswordCheckValImgSrc = rePasswordCheckValImg.attr("src");

			if (passwordVal.length >= 8 || passwordVal.length == 0) {
				checkValImg.attr("title", "사용 가능한 비밀번호입니다.");
				checkValImgSrc = checkValImgSrc.replace("warning.png", "warning_over.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check", true);
				
				if(passwordVal.length == 0){
					rePasswordCheckValImgSrc = rePasswordCheckValImgSrc.replace("warning.png", "warning_over.png");
					rePasswordCheckValImg.attr("src", rePasswordCheckValImgSrc);
					rePasswordVal.data("check", true);
				}
			} else {
				checkValImg.attr("title", "비밀번호는 8자리 이상이여야 합니다.");
				checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check", false);
				
				rePasswordCheckValImgSrc = rePasswordCheckValImgSrc.replace("warning_over.png", "warning.png");
				rePasswordCheckValImg.attr("src", rePasswordCheckValImgSrc);
				rePasswordVal.data("check", false);
			}

		});
	},

	checkEmergencyEmail : function() {
		var _this = this;
		var isFormatCheck = false;
		var isOverlapId = true;

		// 이메일 형식 검사
		$("#user-modify-inputEmergencyEmail").keyup(function() {
			var emergencyEmailVal = $(this).val();

			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");

			// 이메일 형식 검사
			if (emergencyEmailVal.search(_this.emailFormat) != -1) {
				isFormatCheck = true;
			} else {
				isFormatCheck = false;
				checkValImg.attr("title", "이메일 형식이 틀립니다.");
				checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check", false);
			}

		});

		// 이메일 중복검사는 포커스 아웃으로 이유는 키업할 때 마다 하면 반응이 느림.
		$("#user-modify-inputEmergencyEmail").focusout(function() {
			var _thisInputEmergencyEmail = this;
			var emergencyEmailVal = $(this).val();

			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");

			// 이메일 중복 검사
			$.ajax({
				url : _this.serverRootPath+"/user?action=checkEmergencyEmail",
				type : "POST",
				dataType : "TEXT",
				data : {
					"emergencyEmail" : emergencyEmailVal
				},
				success : function(data, textStatus, jqXHR) {
					if (data == 'true' && emergencyEmailVal != _this.emergencyEmailVal ) {
						checkValImg.attr("title", "비상 이메일이 중복됩니다.");
						checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
						checkValImg.attr("src", checkValImgSrc);
						$(_thisInputEmergencyEmail).data("check", false);
					} else {
						// 아이디와 이메일 중복 검사
						var idVal = $("#user-modify-id").text();
						if (emergencyEmailVal == idVal) {
							checkValImg.attr("title", "아이디와 비상 이메일은 중복될 수 없습니다.");
							checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
							checkValImg.attr("src", checkValImgSrc);
							$(_thisInputEmergencyEmail).data("check", false);
						} else {
							// 이메일 형식 검사
							if (isFormatCheck) {
								checkValImg.attr("title", "사용 가능한 비상 이메일입니다.");
								checkValImgSrc = checkValImgSrc.replace("warning.png", "warning_over.png");
								checkValImg.attr("src", checkValImgSrc);
								$(_thisInputEmergencyEmail).data("check", true);
							}
						}
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
				}
			});
		});
	}
});