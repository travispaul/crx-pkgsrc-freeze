(function () {

    'use strict';

    var manifest = chrome.runtime.getManifest(),

        url = manifest.permissions[0],

        check = function (alarm, method) {

            var xhr = new XMLHttpRequest()

            method = method || 'HEAD';

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    var etag = xhr.getResponseHeader('etag'),
                        last_etag = localStorage.getItem('etag');

                    if (method === 'GET') {
                        localStorage.setItem('etag', etag);
                        checkStatus(xhr.responseText);
                    } else if (etag !== last_etag) {
                        check(null, 'GET');
                    }
                }
            }

            xhr.open(method, url);
            xhr.send();
        },
        checkStatus = function (responseText) {
            var doc = document.implementation.createHTMLDocument(),
                status;

            doc.documentElement.innerHTML = responseText;
            status = doc.querySelector('#content > h1').innerText;

            if (status.toLowerCase() === 'yes') {

                chrome.browserAction.setIcon({
                    path: manifest.browser_action.default_icon[19]
                });

                chrome.browserAction.setTitle({
                    title: chrome.i18n.getMessage('status_freeze')
                });

                return;
            }

            chrome.browserAction.setIcon({
                path: 'img/19-pkgsrc.png'
            });

            chrome.browserAction.setTitle({
                title: chrome.i18n.getMessage('status_ok')
            });

        };

    chrome.alarms.get('check-freeze', function (alarm) {
        if (!alarm) {
            chrome.alarms.create('check-freeze', {
                periodInMinutes: 60
            });
        }
    });

    chrome.alarms.onAlarm.addListener(check);

    chrome.runtime.onStartup.addListener(function () {
        window.localStorage.removeItem('etag');
    });

    chrome.runtime.onInstalled.addListener(function () {
        window.localStorage.removeItem('etag');
    });

    chrome.browserAction.onClicked.addListener(function () {
        chrome.tabs.create({url:url});
    });

    check();

}());
