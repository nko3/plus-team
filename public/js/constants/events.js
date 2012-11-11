var Events = {
  SERVER_LISTENING_EVENT : 'SERVER_LISTENING',
  FIRE_NOTIFICATION_EVENT : 'FIRE_NOTIFICATION',
  USER_CONNECTED_EVENT : 'USER_CONNECTED',
  USER_DISCONNECTED_EVENT : 'USER_DISCONNECTED'
};

if (typeof module !== "undefined") {
  /* Expose to Node */
  module.exports = Events;
}