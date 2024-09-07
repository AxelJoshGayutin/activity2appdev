const express = require('express');
const router = express.Router();


let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];


router.get('/', (req, res) => {
  res.render('index', { items });
});


router.get('/create', (req, res) => {
  res.render('create');
});


router.post('/create', (req, res) => {
  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name: req.body.name
  };
  items.push(newItem);
  res.redirect('/');
});


router.get('/edit/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.render('edit', { item });
  } else {
    res.redirect('/');
  }
});


router.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) {
    item.name = req.body.name;
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});


router.post('/delete/:id', (req, res) => {
  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.redirect('/');
});

module.exports = router;
