var linkify = require('html-linkify')

module.exports = {

  linkify: function(input) {
    return new Handlebars.SafeString(linkify(input))
  },

  twitterLink: function(input) {
    input = Handlebars.Utils.escapeExpression(input)

    var buildLink = function(username) {
      return new Handlebars.SafeString('<a href="http://twitter.com/'+username+'">@'+username+'</a>')
    }

    var username = input.match(/^https?:\/\/twitter\.com\/(\w+)/)
    if(username && username[1]) {
      return buildLink(username[1])
    }
    else if(input.indexOf('@') === 0) {
      return buildLink(input.slice(1))
    }
    return buildLink(input)
  }
}
