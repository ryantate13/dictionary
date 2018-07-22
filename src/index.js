const fs = require('fs'),
	app = require('express')(),
	dict = ['a','b','c','d','e','f','g','h','i','j','k','l','m','misc','n','o','p','q','r','s','t','u','v','w','x','y','z']
		.reduce((a,letter) => ({...a, [letter]: require(`../wordset-dictionary/data/${letter}.json`)}), {}),
	readme = {};

function format_req(req, _, next){
	const word = req.params.word.toLowerCase(),
		letter = word[0];

	if(!letter)
		return res.status(400).json({error: 'invalid input'});

	Object.assign(req.params, {word, letter});
	return next();
}

app.get('/', (_,res) => res.send(require('./markdown_to_html')(fs.readFileSync(__dirname + '/../README.md', 'utf8'))));

app.get('/:word', format_req, (req, res) => {
	const {letter, word} = req.params;
	if(!dict[letter] || !dict[letter][word])
		return res.status(404).json({error: 'not found'});

	res.json(dict[letter][word]);
});

app.get('/search/:word', format_req, (req, res) => {
	const {letter, word} = req.params;
	res.json(
		Object.keys(dict[letter])
			.filter(w => w.indexOf(word) === 0)
			.map(k => dict[letter][k])
	);
});

app.listen(3003, () => console.log('running'));