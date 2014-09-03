#!/bin/sh

echo "Building renderd..."

{
 cat _init.js

 echo ""
 echo "// Beginning of includes"
 echo ""

 cat _includes.conf | egrep -v '^(#|$)' | while read includefile
 do
  echo "// Include: $includefile"
  echo ""
  cat "$includefile" | sed "s/'textures\//'file:\/\/..\/..\/domelights\/textures\//g" | sed "s/'obj\//'file:\/\/..\/..\/domelights\/obj\//g"
  echo ""
 done

 echo ""
 echo "// End of includes"
 echo ""

 cat _server.js
} > renderd.tmp
echo "Copying renderd"
mv renderd.tmp renderd.js
