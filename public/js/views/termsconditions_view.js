GL.Views.TermsConditions = GL.Framework.View.extend({

  initialize: function () {
    this._template = GL.Framework.template('TermsConditions');
  },

  render: function() {
    $(this.el).html(this._template());
    return this;
  }
});