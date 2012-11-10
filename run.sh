#!/bin/sh

DIR="$( cd "$( /usr/bin/dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Add debug command so we can pass break for debugging
ARGS="--debug"
if [ "$1" == "break" ]; then
  echo "Added breakpoint to the first line, make sure you have node-inspector running!"
  ARGS="--debug-brk"
  shift
fi

# Force kill for devs.
KILL_ALL_NODE=${KILL_ALL_NODE-0}
if [ $KILL_ALL_NODE == 1 ]; then
  /usr/bin/killall node
fi

# Start server
cd $DIR
npm update
node $ARGS $DIR/server/server.js $@
