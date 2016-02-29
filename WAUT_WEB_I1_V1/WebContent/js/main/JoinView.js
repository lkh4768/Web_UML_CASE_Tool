JoinView = Class.extend({

	init : function(serverRootPath) {
		this.serverRootPath = serverRootPath
		this.emailFormat = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		this.passNum = null;

		//처음 모든 input의 check를 false로 초기화
		$(".input-join").each(function(i){
			$(this).data("check", "false");
		});
		
		this.checkID();
		this.sendPassNum();
		this.checkPassNum();
		this.checkEmergencyEmail();
		this.checkPassword();
		this.checkRePassword();
		this.checkName();
		
		this.join();

	},
	
	join: function(){
		$("#joinBtn").click(function(){
			var isVal = true;
			$(".input-join").each(function(i){
				if($(this).data("check") == "false"){
					isVal = false;
				}
			});
			
			if(isVal){
				$("#joinForm").submit();
			}
		});
	},
	
	checkName: function(){
		$("#inputName").keyup(function() {
			var nameVal = $(this).val();
			
			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");
			
			if(nameVal.length > 0){
				checkValImg.attr("title", "사용 가능한 닉네임입니다.");
				checkValImgSrc = checkValImgSrc.replace("warning.png", "warning_over.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check","true");
			}else{
				checkValImg.attr("title", "닉네임을 입력해주세요.");
				checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check","false");
			}
		});
	},
	
	checkRePassword : function() {
		$("#inputRePassword").keyup(function() {
			var rePasswordVal = $(this).val();
			var passwordVal = $("#inputPassword").val();
			
			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");
			
			// 이메일 형식 검사
			if (rePasswordVal == passwordVal) {
				checkValImg.attr("title", "사용 가능한 비밀번호입니다.");
				checkValImgSrc = checkValImgSrc.replace("warning.png", "warning_over.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check","true");
			} else {
				checkValImg.attr("title", "비밀번호와 일치하지 않습니다.");
				checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check","false");
			}
		});
	},

	checkPassword : function() {
		// 비밀번호 형식 검사
		$("#inputPassword").keyup(function() {
			var passwordVal = $(this).val();

			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");

			// 이메일 형식 검사
			if (passwordVal.length >= 8) {
				checkValImg.attr("title", "사용 가능한 비밀번호입니다.");
				checkValImgSrc = checkValImgSrc.replace("warning.png", "warning_over.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check","true");
			} else {
				checkValImg.attr("title", "비밀번호는 8자리 이상이여야 합니다.");
				checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check","false");
			}

		});
	},

	checkEmergencyEmail : function() {
		var _this = this;
		var isFormatCheck = false;
		var isOverlapId = true;

		// 이메일 형식 검사
		$("#inputEmergencyEmail").keyup(function() {
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
				$(this).data("check","false");
			}

		});

		// 이메일 중복검사는 포커스 아웃으로 이유는 키업할 때 마다 하면 반응이 느림.
		$("#inputEmergencyEmail").focusout(function() {
			var _this = this;
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
					if (data == 'true') {
						checkValImg.attr("title", "비상 이메일이 중복됩니다.");
						checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
						checkValImg.attr("src", checkValImgSrc);
						$(_this).data("check","false");
					} else {
						// 아이디와 이메일 중복 검사
						var idVal = $("#inputId").val();
						if (idVal == emergencyEmailVal) {
							checkValImg.attr("title", "아이디와 비상 이메일은 중복될 수 없습니다.");
							checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
							checkValImg.attr("src", checkValImgSrc);
							$(_this).data("check","false");
						} else {
							// 이메일 형식 검사
							if (isFormatCheck) {
								checkValImg.attr("title", "사용 가능한 비상 이메일입니다.");
								checkValImgSrc = checkValImgSrc.replace("warning.png", "warning_over.png");
								checkValImg.attr("src", checkValImgSrc);
								$(_this).data("check","true");
							}
						}
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
				}
			});
		});
	},

	checkPassNum : function() {
		var _this = this;
		$("#inputPassNum").keyup(function() {
			var passNumVal = $(this).val();

			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");

			// 인증번호 검사
			if (passNumVal == _this.passNum) {
				checkValImg.attr("title", "인증 완료되었습니다.");
				checkValImgSrc = checkValImgSrc.replace("warning.png", "warning_over.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check","true");
			} else {
				checkValImg.attr("title", "인증번호가 틀립니다.");
				checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check","false");
			}

		});
	},

	sendPassNum : function() {
		var _this = this;
		// 인증번호
		$("#passNumBtn").click(function() {
			var idVal = $("#inputId").val();

			// 인증번호 이메일 전송
			$.ajax({
				url : _this.serverRootPath+"/user?action=sendPassNum",
				type : "POST",
				dataType : "TEXT",
				data : {id: idVal},
				success : function(data, textStatus, jqXHR) {
					_this.passNum = data;
				},
				error : function(jqXHR, textStatus, errorThrown) {
				}
			});
		});
	},

	checkID : function() {
		var _this = this;
		var isFormatCheck = false;
		$("#inputId").keyup(function() {
			var idVal = $(this).val();

			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");

			// 이메일 형식 검사
			if (idVal.search(_this.emailFormat) != -1) {
				isFormatCheck = true;
			} else {
				isFormatCheck = false;
				checkValImg.attr("title", "이메일 형식이 틀립니다.");
				checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
				checkValImg.attr("src", checkValImgSrc);
				$(this).data("check","false");
			}

		});

		// 이메일 중복검사는 포커스 아웃으로 이유는 키업할 때 마다 하면 반응이 느림.
		$("#inputId").focusout(function() {
			var _this = this;
			var idVal = $(this).val();

			var inputFormGroup = $(this).parent().parent();
			var checkValImg = inputFormGroup.find(".check-value-img");
			var checkValImgSrc = checkValImg.attr("src");

			// 이메일 중복 검사
			$.ajax({
				url : _this.serverRootPath+"/user?action=checkId",
				type : "POST",
				dataType : "TEXT",
				data : {
					"id" : idVal
				},
				success : function(data, textStatus, jqXHR) {
					if (data == 'true') {
						checkValImg.attr("title", "아이디가 중복됩니다.");
						checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
						checkValImg.attr("src", checkValImgSrc);
						$(_this).data("check","false");
					} else {
						// 아이디와 이메일 중복 검사
						var emergencyEmailVal = $("#inputEmergencyEmail").val();
						if (emergencyEmailVal == idVal) {
							checkValImg.attr("title", "아이디와 비상 이메일은 중복될 수 없습니다.");
							checkValImgSrc = checkValImgSrc.replace("warning_over.png", "warning.png");
							checkValImg.attr("src", checkValImgSrc);
							$(_this).data("check","false");
						} else {
							// 이메일 형식 검사
							if (isFormatCheck) {
								checkValImg.attr("title", "사용 가능한 아이디입니다.");
								checkValImgSrc = checkValImgSrc.replace("warning.png", "warning_over.png");
								checkValImg.attr("src", checkValImgSrc);
								$(_this).data("check","true");
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