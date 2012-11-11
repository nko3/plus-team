GL.Views.Profile = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('Profile');
  },

  render: function() {
    $(this.el).html(this._template());

    var r = Raphael(10, 50, 640, 480);
    this.render = r.piechart(
    	0,
    	0,
    	70,
    	[22, 22, 44, 12],
    	{
    		colors:['#EC992E','#3C35D8','#D83535','#DAD100'],
	    	stroke:"#fff",
	    	strokeWidth:1,

    	}
    );

    return this;
  }
});

