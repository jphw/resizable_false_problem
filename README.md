# resizable_false_problem
Sample app that demonstrates getBounds() and setBounds() problem on Win, when resizable is set to false

# problem description
When "resiazble" property of BrowserWindow is set to "false" -
getBounds() and setBounds() methods start to produce unexpected results: 
getBounds() returns different value of what was passed to setBounds().

# how to run
1. npm i
2. npm run start
3. BrowserWindow starts to change it's width and height in cycle with 1hz frequency, adding or subtracting 100 pts
4. see command line output - actual bounds values get changed in an unexpected way (more than +-100 pts)

This does not happen if "resizable" is "true", and also does not happen on Mac.