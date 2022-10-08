function getInbox(req, res, next) {
  res.render('inbox', { title: 'Inbox' });
}

module.exports = { getInbox };
