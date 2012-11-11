GL.Views.Profile = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('Profile');
    this.model =  new GL.Models.User({id: 'me'});
    this.model.on('change', this.renderProfile, this);
    this.model.fetch();
  },

  render: function() {
    $(this.el).html('Loading ..');
    return this;
  },

  renderProfile: function() {
    $(this.el).html(this._template());

    var jsonModel = this.model.toJSON();
    console.log(jsonModel);


    var idModel = { id: jsonModel.id };
    if (jsonModel.facebook) {
      this.facebookView = new GL.Views.Facebook({model: idModel});
    }
    if (jsonModel.github) {
      this.facebookView = new GL.Views.Github({model: idModel});
    }
    if (jsonModel.facebook) {
      this.facebookView = new GL.Views.Facebook({model: idModel});
    }
    return this;
  }
});

