# NativeScript Tools
Convenience Tools for working with NativeScript

## Install
`npm install -g ns-tools`

````
  Usage: nst [options] <cmd> <subCmd> [param...]

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    --css              Create CSS file only
    --js               Create JS file only
    --xml              Create XML file only
    --force-overwrite  Force overwrite existing files. !!USE WITH CAUTION!!
````    

## Create new controller
`nst create controller test/newpage`

Results:

````
  Created: test/newpage.js
  Created: test/newpage.css
  Created: test/newpage.xml
````