// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
let plusValue = 100;
let mainWindow = null;

function startMove()  {

    // this setting causes decreised height each next call:
    mainWindow.resizable = false;

    setInterval( () => {
            
        let bounds = mainWindow.getBounds();
        console.log( 'Current bounds is (' + bounds.x + ', ' + bounds.y + ')-{' + bounds.width + ', ' + bounds.height +'}' );

        bounds.width += plusValue;
        bounds.height += plusValue;

        console.log( 'New bounds is (' + bounds.x + ', ' + bounds.y + ')-{' + bounds.width + ', ' + bounds.height +'}' );
        mainWindow.setBounds( bounds );

        plusValue *= -1;
    }, 1000 )
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.webContents.on( 'did-finish-load', () => { startMove(); } );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') 
    app.quit()
})
