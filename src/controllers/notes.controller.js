const notesCtrl = {};
const Note = require('../models/Story');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
    const {title, site, description} = req.body;
    const newNote = new Note({title, site, description});
    await newNote.save();
    req.flash('success_msg', 'Historia agregada');
    res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find().lean();
    res.render('notes/all-notes', {notes});
};

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', { note });
};

notesCtrl.updateNote = async (req, res) => {
    const { title, site, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, site, description});
    req.flash('success_msg', 'Historia actualizada');
    res.redirect('/notes');
};
notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Historia eliminada')
    res.redirect('/notes');
};

module.exports = notesCtrl;