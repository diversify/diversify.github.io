var linkify = require('html-linkify'),
    gravatar = require('gravatar')

module.exports = {

  repoFromUrl: function(url) {
    if(!url) return ''
    var res = url.match(/diversify\/.+/)
    return res ? res[0] : url
  },

  gravatar: function(email, opts) {
    opts.hash.d = 'blank'
    return gravatar.url(email, opts.hash || {})
  },

  githubUser: function(username) {
    return 'http://github.com/'+username
  },

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
