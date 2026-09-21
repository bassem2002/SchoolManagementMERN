const Group = require("../models/group");

// Create group
const createGroup = async (data) => {
  const group = new Group(data);
  return await group.save();
};

// Get all groups
const getAllGroups = async () => {
  return await Group.find().populate("eleves");
};

// Get group by ID
const getGroupById = async (id) => {
  return await Group.findById(id).populate("eleves");
};

// Update group
const updateGroup = async (id, data) => {
  return await Group.findByIdAndUpdate(id, data, { new: true }).populate(
    "eleves"
  );
};

// Delete group
const deleteGroup = async (id) => {
  return await Group.findByIdAndDelete(id);
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
