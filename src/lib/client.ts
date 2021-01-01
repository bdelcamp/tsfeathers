import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import { iff, discard } from 'feathers-hooks-common';
import feathersVuex from 'feathers-vuex';


const socket = io('http://localhost:3030', { transports: ['websocket'] });
const client = feathers()
.configure(socketio(socket))
.configure(auth({ storage: window.localStorage }))
.hooks({
  before: {
    all: [
      iff(
        context => [ 'create', 'update', 'patch' ].includes(context.method),
        discard('__id', '__isTmp')
      )
    ]
  }
})

export default client;

//Feathers-Vuex
const { makeServicePlugin, makeAuthPlugin, BaseModel, models, FeathersVuex } = feathersVuex(client, {
  serverAlias: 'api',
  idField: '_id',
  whitelist: ['$regex', '$options']
})

export { makeAuthPlugin, makeServicePlugin, BaseModel, models, FeathersVuex }