// backend/controllers/profileController.js

import User from '../models/User.js';

// @desc    Get current user's profile
// @route   GET /api/profile/me
// @access  Private
export const getMyProfile = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update user's profile
// @route   PUT /api/profile/me
// @access  Private
export const updateMyProfile = async (req, res) => {
  // jo bhi jankari frontend se aae
  const { name, contactPhone, bio, resumeLink, companyName, companyDescription } = req.body;

  // ek profile objct banao
  const profileFields = {};
  if (name) profileFields.name = name;
  if (contactPhone) profileFields.contactPhone = contactPhone;
  if (bio) profileFields.bio = bio;
  if (resumeLink) profileFields.resumeLink = resumeLink;
  if (companyName) profileFields.companyName = companyName;
  if (companyDescription) profileFields.companyDescription = companyDescription;

  try {
    //  user ko search kare update kare
    let user = await User.findByIdAndUpdate(
      req.user.id, //  user id tokan se
      { $set: profileFields }, // jo jankari uodate karni hai
      { new: true, runValidators: true } // 'new: true' ka matlb hm uodate user ko upas bheja
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};