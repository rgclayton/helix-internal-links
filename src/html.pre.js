/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const LOCAL_HOSTNAME = 'localhost:3000';
const PRODUCTION_HOSTNAME = 'cmillar.helix-demo.xyz';

function isAdmin(path) {
  return path === '/admin.md';
}

function isDev(host) {
  return host.includes(LOCAL_HOSTNAME);
}

function getHostName(host) {
  return isDev(host) ? `http://${LOCAL_HOSTNAME}` : `https://${PRODUCTION_HOSTNAME}`;
}

/**
 * The 'pre' function that is executed before the HTML is rendered
 * @param payload The current payload of processing pipeline
 * @param payload.content The content
 */
function pre(payload, actions) {
    payload.content.isAdmin = isAdmin(payload.request.path);
    payload.content.hostName = getHostName(actions.request.headers.host);
    payload.content.time = `${new Date()}`;
}

module.exports.pre = pre;
