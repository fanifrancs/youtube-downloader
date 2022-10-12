const express = require('express'),
app = express(),
ytdl = require('ytdl-core');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/download', async(req, res, err) => {
	const v_id = req.query.url.split('v=')[1],
    info = await ytdl.getInfo(req.query.url);
	res.render('download', {
		url: 'https://www.youtube.com/embed/' + v_id,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        }),
	});
});

app.get('/faqs', (req, res) => {
	res.render('faqs');
});


app.listen(process.env.PORT || 3500, process.env.IP, () => {
    console.log('server started');
});