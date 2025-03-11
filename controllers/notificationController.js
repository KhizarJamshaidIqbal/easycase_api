const Notification = require('../models/Notification');
const { createError } = require('../utils/error');

exports.getNotifications = async (req, res) => {
  if (!req.user) {
    return res.status(403).json(createError('User not authenticated'));
  }

  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort('-createdAt')
      .limit(50);

    res.json(notifications);
  } catch (error) {
    res.status(500).json(createError('Error fetching notifications'));
  }
};

exports.markAsRead = async (req, res) => {
  if (!req.user) {
    return res.status(403).json(createError('User not authenticated'));
  }

  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json(createError('Notification not found'));
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json(createError('Error marking notification as read'));
  }
};

exports.markAllAsRead = async (req, res) => {
  if (!req.user) {
    return res.status(403).json(createError('User not authenticated'));
  }

  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json(createError('Error marking all notifications as read'));
  }
};

exports.deleteNotification = async (req, res) => {
  if (!req.user) {
    return res.status(403).json(createError('User not authenticated'));
  }

  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!notification) {
      return res.status(404).json(createError('Notification not found'));
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json(createError('Error deleting notification'));
  }
};