/**
 * Created by kim on 2015-10-07.
 */
HalfArrowDecorator = draw2d.decoration.connection.Decorator.extend({

	NAME : "HalfArrowDecorator",

	init : function(width, height) {
		this._super(width, height);
	},

	paint : function(paper) {

		var st = paper.set();

		st.push(paper.path([ "M0 0", "L", this.width, " ", 0, "L", 0, " ", 0, "L", this.width, " ", this.height / 2,
				"L", 0, " ", 0, "L", this.width, " ", -this.height / 2 ].join("")));

		st.attr({
			fill : this.backgroundColor.hash(),
			stroke : this.color.hash()
		});
		return st;
	}
});
