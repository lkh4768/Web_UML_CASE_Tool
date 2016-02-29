/**
 * Created by User on 2015-10-07.
 */
VerticalSwimlaneFigure = draw2d.shape.basic.Polygon.extend({

	NAME : "VerticalSwimlaneFigure",

	init : function(attr) {
		this._super($.extend({
			bgColor : "#ffffff",
			color : "#1B1B1B",
			stroke : 2,
			height : 100
		}, attr));

		var _this = this;

		this.resizeListener = function(figure) {
			// propagate the event to the parent or other listener if existing
			//
			if (_this.getParent() instanceof draw2d.shape.basic.Polygon) {
				_this.fireEvent("resize");
			}
			// or we are the parent and must consume it self
			else {
				if (_this.width < _this.getChildren().get(0).getMinWidth()) {
					_this.setWidth(_this.getChildren().get(0).getMinWidth());
				}
				_this.fireEvent("resize");
			}
		};

		this.resetVertices();

		var box = this.getBoundingBox();

		this.addVertex(0, box.h); // ...bottom left...
		this.addVertex(0, 0);// Go to the top center..
		this.addVertex(box.w, 0);
		this.addVertex(box.w, box.h); // ...draw line to the right bottom

		// it is not necessary to close the path. A Polygon is always closed by
		// definition.
		// (Use a Polyline if you need an open path)
		// this.addVertex(box.w/2 , 0); // and close the path

		// override the selection handler from the polygon. Because the vertices
		// of
		// the triangle are not selectable and modifiable
		//
		this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy());

		this.setPosition(box.getTopLeft());

		// swimlineLabel ���� ���� �� ����
		this.swimlaneLabel = new NameLabel({
			text : "Swimlane name",
			stroke : 1,
			resizeable : true
		});

		// swimlineLabel�� �̸� ���� ��Ģ ����
		this.swimlaneLabel.installEditor(new draw2d.ui.LabelInplaceEditor());

		this.add(this.swimlaneLabel, new draw2d.layout.locator.XYRelPortLocator(0, 0));
	},

	calculatePath : function() {
		var radius = this.getRadius();
		var path = [];
		// hard corners
		//
		if (radius === 0) {
			var length = this.vertices.getSize();
			var p = this.vertices.get(0);
			path.push("M", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5);
			for (var i = 1; i < length; i++) {
				p = this.vertices.get(i);
				path.push("L", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5);
			}
		}

		this.svgPathString = path.join("");
		return this;
	},

	setDimension : function(w, h) {
		this._super(w, h);
		this.children.each(function(i, e) {
			e.figure.setWidth(w);
		});

		return this;
	},
	/**
	 * @inheritdoc
	 */
	getMinWidth : function() {
		var width = 10;
		this.children.each(function(i, e) {
			width = Math.max(width, e.figure.getWidth());
		});
		return width;
	},
	/**
	 * @method Add a child figure to the figure. The hands over figure doesn't
	 *         support drag&drop operations. It's only a decorator for the
	 *         connection.<br>
	 *         Mainly for labels or other decorations
	 * 
	 * 
	 * var start = new draw2d.shape.node.Start({x:80, y:150}); start.add(new
	 * draw2d.shape.basic.Label({text:"Test Label"}), new
	 * draw2d.layout.locator.TopLocator());
	 * 
	 * canvas.add( start);
	 * 
	 * @param {draw2d.Figure}
	 *            figure the figure to add as decoration to the connection.
	 * @param {draw2d.layout.locator.Locator}
	 *            locator the locator for the child.
	 * @param {Number}
	 *            [index] optional index where to insert the figure
	 */
	add : function(child, locator, index) {
		if (typeof locator === "undefined" || locator === null) {
			throw "Second parameter 'locator' is required for method 'Figure#add'";
		}

		// the child is now a slave of the parent
		//
		child.setDraggable(false);
		child.setSelectable(false);
		child.setParent(this);
		child.on("resize", this.resizeListener);

		if ($.isNumeric(index)) {
			this.children.insertElementAt({
				figure : child,
				locator : locator
			}, index);
		} else {
			this.children.add({
				figure : child,
				locator : locator
			});
		}

		if (this.canvas !== null) {
			child.setCanvas(this.canvas);
		}

		this.repaint();

		return this;
	},

	/**
	 * @method called by the framework if the figure should show the
	 *         contextmenu.</br> The strategy to show the context menu depends
	 *         on the plattform. Either loooong press or right click with the
	 *         mouse.
	 * 
	 * @param {Number}
	 *            x the x-coordinate to show the menu
	 * @param {Number}
	 *            y the y-coordinate to show the menu
	 * @since 1.1.0
	 */
	onContextMenu : function(x, y) {
		var ctMenuFactory = new ContextMenuFactoryInCanvas();
		ctMenuFactory.createContextMenu(this, x, y);
	},

	getName : function() {
		return this.swimlaneLabel.getText();
	},
	setName : function(text) {
		this.swimlaneLabel.setText(text);
	},
	/**
	 * @method Clone the figure. <br>
	 *         You must override and implement the methods
	 *         <b>getPersistentAttributes</b> and <b>setPersistentAttributes</b>
	 *         for your custom figures if the have special attributes.
	 * 
	 * @since 4.1.0
	 * @experimental
	 */
	clone : function() {
		var clone = new Clone();
		return clone.clone(this);
	},
	/**
	 * @inheritdoc
	 */
	getPersistentAttributes : function() {
		var memento = this._super();

		$.extend(memento, {
			name : this.getName()
		});

		return memento;
	},

	/**
	 * @inheritdoc
	 */
	setPersistentAttributes : function(memento) {
		this._super(memento);

		this.setName(memento.name);
	},

	/**
	 * @method Called when a user dbl clicks on the element // Alternatively you
	 *         register for this event with: figure.on("dblclick",
	 *         function(emitter){ alert("user dbl click on the figure"); }); 더블
	 *         
	 * @template
	 */
	onDoubleClick : function(x, y) {
	}

});
