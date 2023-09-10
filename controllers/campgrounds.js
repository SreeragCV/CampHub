const Campground = require('../models/campground');

module.exports.index = async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}


module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}


module.exports.createCampground = async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map( f => ({ url: f.path, filename: f.filename}));
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new Campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}


module.exports.showCampground = async(req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path : 'author'
        }
    }).populate('author');
    if(!campground){
        req.flash('error', 'Sorry! Cannot find the Campground!');
        return res.redirect('/campgrounds');
    }
        res.render('campgrounds/show', { campground });
}


module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error', 'Sorry! Cannot find the Campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}


module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = campground.images = req.files.map( f => ({ url: f.path, filename: f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    req.flash('success', 'Successfully edited the Campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}


module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const deletedproduct = await Campground.findByIdAndDelete( id );
    req.flash('success', 'Successfully deleted the Campground!');
    res.redirect('/campgrounds');
}