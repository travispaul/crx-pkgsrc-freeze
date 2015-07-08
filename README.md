# crx-pkgsrc-freeze
Shows current status of a PkgSrc freeze.

![Screenshot](screenshot.png?raw=true "Screenshot")

* ![Freeze](19-freeze.png?raw=true "Freeze") means freeze
* ![PkgSrc](19-pkgsrc.png?raw=true "PkgSrc") means no freeze


## How it works

This extenstion uses the chrome alarm API to make a HEAD request to http://www.pkgsrc.org/is-a-freeze-on/ to see if there is currently a PkgSrc freeze. If the ETag changes (or on the first request) we make a full GET and parse the document body to see if there is a freeze.
