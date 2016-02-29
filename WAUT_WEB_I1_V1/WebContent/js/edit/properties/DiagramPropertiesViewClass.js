DiagramPropertiesViewClass = Class
		.extend({
			NAME : "DiagramPropertiesViewClass",
			init : function(figure) {
				// selected figure
				this.figure = figure;
			},

			getPropertyView : function() {
				var _figure = this.figure;
				var view = $('<div id="diagramPropertiesPackageAndSystem-container" class="row"></div>');
				var diaPropViewItems = new PropertiesViewItems(this.figure);

				var nameFromGroup = diaPropViewItems.getNameFromGroup();

				var stereoTypeFromGroup = diaPropViewItems.getStereoTypeFromGroup();

				var abstractCheckBoxGroup = diaPropViewItems.getAbstractCheckBoxGroup();

				// attribute 추가 부분
				var attrFromGroup = diaPropViewItems.getAttrFromGroup();

				// method 추가 부분
				var methodFromGroup = diaPropViewItems.getMethodFromGroup();

				view.append(nameFromGroup);
				view.append(stereoTypeFromGroup);
				view.append(abstractCheckBoxGroup);
				view.append(attrFromGroup);
				view.append(methodFromGroup);

				return view;
			},

			/**
			 * @method called by the framework if the pane has been resized.
			 *         This is a good moment to adjust the layout if required.
			 * 
			 */
			onResize : function() {
			},

			/**
			 * @method called by the framework before the pane will be removed
			 *         from the DOM tree
			 * 
			 */
			onHide : function() {
			}
		});
