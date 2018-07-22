const marked = require('marked'),
	hljs = require('highlight.js');

marked.setOptions({
  highlight: code => require('highlight.js').highlightAuto(code).value,
  gfm: true,
  xhtml: false
});

module.exports = md => `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Dictionary</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"/>
	<style>
		.markdown-body {
			max-width: 1100px;
			margin: 2rem auto;
		}
		.markdown-body pre{
			background: #1E1E1E;
			padding: 1rem;
			overflow: auto;
			font-size: 1rem;
		}
		.markdown-body pre code {
			display: block;
			overflow-x: auto;
			padding: 0;
			background: #1E1E1E;
			color: #DCDCDC;
		}
		.hljs{display:block;overflow-x:auto;padding:0.5em;background:#1E1E1E;color:#DCDCDC}.hljs-keyword,.hljs-literal,.hljs-symbol,.hljs-name{color:#569CD6}.hljs-link{color:#569CD6;text-decoration:underline}.hljs-built_in,.hljs-type{color:#4EC9B0}.hljs-number,.hljs-class{color:#B8D7A3}.hljs-string,.hljs-meta-string{color:#D69D85}.hljs-regexp,.hljs-template-tag{color:#9A5334}.hljs-subst,.hljs-function,.hljs-title,.hljs-params,.hljs-formula{color:#DCDCDC}.hljs-comment,.hljs-quote{color:#57A64A;font-style:italic}.hljs-doctag{color:#608B4E}.hljs-meta,.hljs-meta-keyword,.hljs-tag{color:#9B9B9B}.hljs-variable,.hljs-template-variable{color:#BD63C5}.hljs-attr,.hljs-attribute,.hljs-builtin-name{color:#9CDCFE}.hljs-section{color:gold}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:bold}.hljs-bullet,.hljs-selector-tag,.hljs-selector-id,.hljs-selector-class,.hljs-selector-attr,.hljs-selector-pseudo{color:#D7BA7D}.hljs-addition{background-color:#144212;display:inline-block;width:100%}.hljs-deletion{background-color:#600;display:inline-block;width:100%}
	</style>
</head>
<body class="markdown-body">
	${marked(md)}
</body>
</html>`;