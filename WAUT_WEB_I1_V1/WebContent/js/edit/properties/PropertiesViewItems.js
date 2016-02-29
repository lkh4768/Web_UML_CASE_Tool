PropertiesViewItems = Class
		.extend({
			NAME : "PropertiesViewItems",
			init : function(figure) {
				this.figure = figure;
			},
			
			// 다이어그램 이름 폼
			getNameFromGroup : function() {
				var _figure = this.figure;
				
				var nameFromGroup = $('<div class="from-group diagramProperties-group"></div>');
				var nameLabel = $('<label for="name">이름</label>');
				var nameInput = $('<input type="text" class="form-control" id="name" value=""/>');

				nameInput.val(_figure.getName());
				nameInput.keyup(function(e) {
					if (e.keyCode == 13) {
						_figure.setName($(this).val());
					}
				});

				nameFromGroup.append(nameLabel);
				nameFromGroup.append(nameInput);

				return nameFromGroup;
			},

			// 다이어그램 스테레오타입 폼
			getStereoTypeFromGroup : function() {
				var _figure = this.figure;

				var stereoTypeFromGroup = $('<div class="from-group diagramProperties-group"></div>');
				var stereoTypeLabel = $('<label for="stereoTyep">stereotype</label>');
				var stereoTypeInput = $('<input type="text" class="form-control" id="stereotype" value=""/>');

				stereoTypeInput.val(_figure.getStereoType());
				stereoTypeInput.keyup(function(e) {
					if (e.keyCode == 13) {
						_figure.setStereoType($(this).val());
					}
				});

				stereoTypeFromGroup.append(stereoTypeLabel);
				stereoTypeFromGroup.append(stereoTypeInput);

				return stereoTypeFromGroup;
			},
			
			// Connection Guard 폼
			getGuardTypeFromGroup : function(){
				var _figure = this.figure;
				
				var guardTypeFromGroup = $('<div class="from-group diagramProperties-group"></div>');
				var guardTypeLabel = $('<label for="guardType">guardtype</label>');
				var guardTypeInput = $('<input type="text" class="form-control" id="guardtype" value=""/>');

				guardTypeInput.val(_figure.getGuardType());
				guardTypeInput.keyup(function(e) {
					if (e.keyCode == 13) {
						_figure.setGuardType($(this).val());
					}
				});

				guardTypeFromGroup.append(guardTypeLabel);
				guardTypeFromGroup.append(guardTypeInput);

				return guardTypeFromGroup;
			},

			// 다이어그램 체크박스 폼
			getAbstractCheckBoxGroup : function() {
				var _figure = this.figure;

				var abstractCheckBoxGroup = $('<div class="checkbox diagramProperties-group"></div>');
				var abstractCheckBoxLabel = $('<label></label>');
				var abstractCheckBox = $('<input type="checkbox" id="isAbstract" value="">')

				abstractCheckBox.prop('checked', _figure.isAbstract());
				abstractCheckBox.change(function(e) {
					_figure.setAbstract(abstractCheckBox.prop('checked'));
				});

				abstractCheckBoxLabel.append(abstractCheckBox);
				abstractCheckBoxLabel.append(" isAbstract");
				abstractCheckBoxGroup.append(abstractCheckBoxLabel);

				return abstractCheckBoxGroup;
			},

			getAttrFromGroup : function() {
				var _this = this;
				var _figure = this.figure;

				var attrFromGroup = $('<div class="from-group diagramProperties-group"></div>');

				// attribute 위에 부분
				var attrTopGroup = $('<div class="from-group"></div>');
				var attrLabel = $('<label for="class-attr">attribute</label>');
				var attrAddBtn = $('<Button type="button" class="btn btn-primary btn-xs" style="float:right">+</Button>');

				// 어트리뷰트 추가 이벤트
				attrAddBtn.click(function() {
					var newAttr = _figure.addAttribute();
					attrFromGroup.append(_this.getAttributeContainer(newAttr, attrFromGroup));
				});

				attrTopGroup.append(attrLabel);
				attrTopGroup.append(attrAddBtn);

				attrFromGroup.append(attrTopGroup);

				// 각 attribute 추가 부분
				var attrArray = _figure.getAttributeArray();

				attrArray.each(function(i, attr) {
					attrFromGroup.append(_this.getAttributeContainer(attr));
				});

				return attrFromGroup;
			},

			getAttributeContainer : function(attr) {
				var figure = this.figure;

				var attrInputGroup = $('<div class="input-group attr-input-group"></div>');

				// 가시성 폼
				var attrVisibilityInputGroupBtn = $('<div class="input-group-btn"></div>');
				var attrVisibilityDropDownBtn = $('<button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>');

				var attrVisibilityDropDownUl = $('<ul class="dropdown-menu" role="menu"></ul>');
				var attrVisibilityDropDownPublicItem = $('<li><a href="#">public</a></li>');
				var attrVisibilityDropDownProtecedItem = $('<li><a href="#">protected</a>');
				var attrVisibilityDropDownPrivateItem = $('<li><a href="#">private</a>');
				var attrVisibilityDropDownPackageItem = $('<li><a href="#">package</a>');

				attrVisibilityDropDownUl.append(attrVisibilityDropDownPublicItem);
				attrVisibilityDropDownUl.append(attrVisibilityDropDownProtecedItem);
				attrVisibilityDropDownUl.append(attrVisibilityDropDownPrivateItem);
				attrVisibilityDropDownUl.append(attrVisibilityDropDownPackageItem);

				attrVisibilityInputGroupBtn.append(attrVisibilityDropDownBtn);
				attrVisibilityInputGroupBtn.append(attrVisibilityDropDownUl);

				// 가시성을 드롭버튼에 적용
				attrVisibilityDropDownBtn.text(attr.getVisibility());

				// 가시성 드롭버튼 클릭 이벤트
				attrVisibilityDropDownPublicItem.click(function() {
					attrVisibilityDropDownBtn.text("+");
					attr.setVisibility("+");
				});
				attrVisibilityDropDownProtecedItem.click(function() {
					attrVisibilityDropDownBtn.text("#");
					attr.setVisibility("#");
				});

				attrVisibilityDropDownPrivateItem.click(function() {
					attrVisibilityDropDownBtn.text("-");
					attr.setVisibility("-");
				});

				attrVisibilityDropDownPackageItem.click(function() {
					attrVisibilityDropDownBtn.text("~");
					attr.setVisibility("~");
				});

				// static 폼
				var attrStaticInputGroupBtn = $('<div class="input-group-btn"></div>');
				var attrStaticBtn = $('<Button type="button" class="btn btn-defalut">S</Button>');

				attrStaticInputGroupBtn.append(attrStaticBtn);

				if (attr.isStatic()) {
					attrStaticBtn.addClass("underlined");
				} else {
					attrStaticBtn.removeClass("underlined");
				}

				attrStaticBtn.click(function(e) {
					if (attrStaticBtn.hasClass("underlined")) {
						attrStaticBtn.removeClass("underlined");
						attr.setStatic(false);
					} else {
						attrStaticBtn.addClass("underlined");
						attr.setStatic(true);
					}
				});

				var attrInput = $('<input type="text" class="form-control" value=""/>');

				// 입력박스에 속성명 적용
				attrInput.val(attr.getName());

				attrInput.keyup(function(e) {
					if (e.keyCode == 13) {
						attr.setName($(this).val());
					}
				});

				var attrRemoveBtnContanier = $('<span class="input-group-btn"></span>');
				var attrRemoveBtn = $('<Button type="button" class="btn btn-danger">X</Button>');

				attrRemoveBtnContanier.append(attrRemoveBtn);

				attrRemoveBtn.click(function() {
					figure.removeAttribute(attr);
					attrInputGroup.remove();
				});

				attrInputGroup.append(attrVisibilityInputGroupBtn);
				attrInputGroup.append(attrStaticInputGroupBtn);
				attrInputGroup.append(attrInput);
				attrInputGroup.append(attrRemoveBtnContanier);

				return attrInputGroup;
			},

			getMethodFromGroup : function() {
				var _this = this;
				var _figure = this.figure;

				var methodFromGroup = $('<div class="from-group diagramProperties-group"></div>');

				// method 위에 부분
				var methodTopGroup = $('<div class="from-group"></div>');
				var methodLabel = $('<label>method</label>');
				var methodAddBtn = $('<Button type="button" class="btn btn-primary btn-xs" style="float:right">+</Button>');

				// 메소드 추가 이벤트
				methodAddBtn.click(function() {
					var newMet = _figure.addMethod();
					methodFromGroup.append(_this.getMethodContanier(newMet, methodFromGroup));
				});

				methodTopGroup.append(methodLabel);
				methodTopGroup.append(methodAddBtn);

				methodFromGroup.append(methodTopGroup);

				// 각 method 추가 부분
				var methodArray = _figure.getMethodArray();
				methodArray.each(function(i, met) {
					methodFromGroup.append(_this.getMethodContanier(met));
				});

				return methodFromGroup;
			},

			getMethodContanier : function(met) {
				var figure = this.figure;

				var methodInputGroup = $('<div class="input-group met-input-group"></div>');

				var methodInputGroupBtn = $('<div class="input-group-btn btn-group"></div>');
				var methodVisibilityDropDownBtn = $('<button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>');

				var methodVisibilityDropDownUl = $('<ul class="dropdown-menu" role="menu"></ul>');
				var methodVisibilityDropDownPublicItem = $('<li><a href="#" class="visibility-item">public</a></li>');
				var methodVisibilityDropDownProtecedItem = $('<li><a href="#" class="visibility-item">protected</a>');
				var methodVisibilityDropDownPrivateItem = $('<li><a href="#" class="visibility-item">private</a>');
				var methodVisibilityDropDownPackageItem = $('<li><a href="#" class="visibility-item">package</a>');

				methodVisibilityDropDownUl.append(methodVisibilityDropDownPublicItem);
				methodVisibilityDropDownUl.append(methodVisibilityDropDownProtecedItem);
				methodVisibilityDropDownUl.append(methodVisibilityDropDownPrivateItem);
				methodVisibilityDropDownUl.append(methodVisibilityDropDownPackageItem);

				methodInputGroupBtn.append(methodVisibilityDropDownBtn);
				methodInputGroupBtn.append(methodVisibilityDropDownUl);

				// 가시성을 드롭버튼에 적용
				methodVisibilityDropDownBtn.text(met.getVisibility());

				// 가시성 드롭버튼 클릭 이벤트
				methodVisibilityDropDownPublicItem.click(function() {
					methodVisibilityDropDownBtn.text("+");
					met.setVisibility("+");
				});
				methodVisibilityDropDownProtecedItem.click(function() {
					methodVisibilityDropDownBtn.text("#");
					met.setVisibility("#");
				});

				methodVisibilityDropDownPrivateItem.click(function() {
					methodVisibilityDropDownBtn.text("-");
					met.setVisibility("-");
				});

				methodVisibilityDropDownPackageItem.click(function() {
					methodVisibilityDropDownBtn.text("~");
					met.setVisibility("~");
				});

				// static 폼
				var methodStaticInputGroupBtn = $('<div class="input-group-btn"></div>');
				var methodStaticBtn = $('<Button type="button" class="btn btn-defalut">S</Button>');

				methodStaticInputGroupBtn.append(methodStaticBtn);

				if (met.isStatic()) {
					methodStaticBtn.addClass("underlined");
				} else {
					methodStaticBtn.removeClass("underlined");
				}

				methodStaticBtn.click(function(e) {
					if (methodStaticBtn.hasClass("underlined")) {
						methodStaticBtn.removeClass("underlined");
						met.setStatic(false);
					} else {
						methodStaticBtn.addClass("underlined");
						met.setStatic(true);
					}
				});

				// abstract 폼
				var methodAbstractInputGroupBtn = $('<div class="input-group-btn"></div>');
				var methodAbstractBtn = $('<Button type="button" class="btn btn-defalut">A</Button>');

				methodAbstractInputGroupBtn.append(methodAbstractBtn);

				if (met.isAbstract()) {
					methodAbstractBtn.addClass("underlined");
				} else {
					methodAbstractBtn.removeClass("underlined");
				}

				methodAbstractBtn.click(function(e) {
					if (methodAbstractBtn.hasClass("italiced")) {
						methodAbstractBtn.removeClass("italiced");
						met.setAbstract(false);
					} else {
						methodAbstractBtn.addClass("italiced");
						met.setAbstract(true);
					}
				});

				var methodInput = $('<input type="text" class="form-control" value=""/>');

				// 입력박스에 속성명 적용
				methodInput.val(met.getName());

				methodInput.keyup(function(e) {
					if (e.keyCode == 13) {
						met.setName($(this).val());
					}
				});

				// 메소드 삭제 컨테이너
				var methodRemoveBtnContanier = $('<span class="input-group-btn"></span>');
				var methodRemoveBtn = $('<Button type="button" class="btn btn-danger">X</Button>');

				methodRemoveBtnContanier.append(methodRemoveBtn);

				// 메소드 삭제 이벤트
				methodRemoveBtn.click(function() {
					figure.removeMethod(met);
					methodInputGroup.remove();
				});

				methodInputGroup.append(methodInputGroupBtn);
				methodInputGroup.append(methodStaticInputGroupBtn);
				methodInputGroup.append(methodAbstractInputGroupBtn);
				methodInputGroup.append(methodInput);
				methodInputGroup.append(methodRemoveBtnContanier);

				return methodInputGroup;
			},

			// statechart action

			getActionFromGroup : function() {
				var _this = this;
				var _figure = this.figure;

				var actionFromGroup = $('<div class="from-group diagramProperties-group"></div>');

				// action 위에 부분
				var actionTopGroup = $('<div class="from-group"></div>');
				var actionLabel = $('<label for="class-attr">attribute</label>');
				var actionAddBtn = $('<Button type="button" class="btn btn-primary btn-xs" style="float:right">+</Button>');

				// action 추가 이벤트
				actionAddBtn.click(function() {
					var newAction = _figure.addAction();
					actionFromGroup.append(_this.getActionContainer(newAction, actionFromGroup));
				});

				actionTopGroup.append(actionLabel);
				actionTopGroup.append(actionAddBtn);
				
				actionFromGroup.append(actionTopGroup);
				
				// 각 action 추가 부분
				var actionArray = _figure.getActionArray();

				actionArray.each(function(i, action) {
					actionFromGroup.append(_this.getActionContainer(action, actionFromGroup));
				});
				
				return actionFromGroup;
			},

			getActionContainer : function(action) {
				var figure = this.figure;

				var actionInputGroup = $('<div class="input-group attr-input-group"></div>');

				// action 폼
				var actionActivityInputGroupBtn = $('<div class="input-group-btn"></div>');
				var actionActivityDropDownBtn = $('<button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>');

				var actionActivityDropDownUl = $('<ul class="dropdown-menu" role="menu"></ul>');
				var actionActivityDropDownEntryItem = $('<li><a href="#">entry</a></li>');
				var actionActivityDropDownDoItem = $('<li><a href="#">do</a>');
				var actionActivityDropDownExitItem = $('<li><a href="#">exit</a>');

				actionActivityDropDownUl.append(actionActivityDropDownEntryItem);
				actionActivityDropDownUl.append(actionActivityDropDownDoItem);
				actionActivityDropDownUl.append(actionActivityDropDownExitItem);

				actionActivityInputGroupBtn.append(actionActivityDropDownBtn);
				actionActivityInputGroupBtn.append(actionActivityDropDownUl);

				// action 드롭버튼에 적용
				actionActivityDropDownBtn.text(action.getActivity());

				// action 드롭버튼 클릭 이벤트
				actionActivityDropDownEntryItem.click(function() {
					actionActivityDropDownBtn.text("entry");
					action.setActivity("entry");
				});
				actionActivityDropDownDoItem.click(function() {
					actionActivityDropDownBtn.text("do");
					action.setActivity("do");
				});

				actionActivityDropDownExitItem.click(function() {
					actionActivityDropDownBtn.text("exit");
					action.setActivity("exit");
				});

				var actionInput = $('<input type="text" class="form-control" value=""/>');

				// 입력박스에 속성명 적용
				actionInput.val(action.getName());

				actionInput.keyup(function(e) {
					if (e.keyCode == 13) {
						action.setName($(this).val());
					}
				});

				var actionRemoveBtnContanier = $('<span class="input-group-btn"></span>');
				var actionRemoveBtn = $('<Button type="button" class="btn btn-danger">X</Button>');

				actionRemoveBtnContanier.append(actionRemoveBtn);

				actionRemoveBtn.click(function() {
					figure.removeAction(action);
					actionInputGroup.remove();
				});

				actionInputGroup.append(actionActivityInputGroupBtn);
				actionInputGroup.append(actionInput);
				actionInputGroup.append(actionRemoveBtnContanier);

				return actionInputGroup;
			}

		});