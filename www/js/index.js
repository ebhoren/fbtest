/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    rootEl: null,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        this.rootEl = document.getElementById(id);

        var listeningElement = this.rootEl.querySelector('.listening');
        var receivedElement = this.rootEl.querySelector('.received');
        var shareElement = this.rootEl.querySelector('.share');
        var appsElement = this.rootEl.querySelector('.apps');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        shareElement.setAttribute('style', 'display:block;');
        appsElement.setAttribute('style', 'display:block;');

        shareElement.addEventListener('click', app.onShareDialog, false);
        appsElement.addEventListener('click', app.onApps, false);

        console.log('Received Event: ' + id);
    },


    onShareDialog: function(e) {
        e.preventDefault();

        window.plugins.socialsharing.share('Message', 'Subject', null, 'http://www.google.com');
        return false;
    },
    onApps: function(e) {
        e.preventDefault();

        window.plugins.socialsharing.canShareVia(null, 'Hello World', null, null, null, app.shareCallback, app.shareCallback);
        return false;
    },
    shareCallback: function(e) {

        console.log(e);

        var container = document.getElementById('applications');
        var apps = e.toString().split(',').filter(function(application) { return application.indexOf('facebook') > -1; });
        var output = '';
        
        for(var i = 0, n = apps.length; i < n; i++) {
            output += '<a href="#" class="event btn" data-app="'+apps[i]+'">Share to '+apps[i]+'</a>'
        }

        container.addEventListener('click', app.share, false);
        container.innerHTML = output;
    },
    share: function(e) {

        e.preventDefault();

        var app = e.target.dataset.app;
        if( !app ) return false;
        
        window.plugins.socialsharing.shareVia(app, 'Hello World Message', 'Hello World Subject', null, 'http://www.google.com');
    }
};
