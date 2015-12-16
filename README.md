# crx-pkgsrc-freeze
Shows current status of a pkgsrc freeze.

![Screenshot](img/screenshot.png?raw=true "Screenshot")

* ![Freeze](img/19-freeze.png?raw=true "Freeze") means freeze
* ![PkgSrc](img/19-pkgsrc.png?raw=true "PkgSrc") means no freeze


## How it works

This extenstion uses the chrome alarm API to make a HEAD request to
http://www.pkgsrc.org/is-a-freeze-on/ to see if there is currently a pkgsrc
freeze. If the ETag changes (or on the first request) we make a full GET and
parse the document body to see if there is a freeze.
