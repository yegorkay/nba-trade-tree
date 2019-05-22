import * as React from 'react';
import * as _ from 'lodash';
import axios from 'axios';
import Select from 'react-select';
import produce from 'immer';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Dispatch
} from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps
} from 'react-router-dom';

export {
  _,
  applyMiddleware,
  axios,
  combineReducers,
  compose,
  connect,
  createStore,
  Dispatch,
  produce,
  Provider,
  React,
  ReactDOM,
  Route,
  RouteComponentProps,
  Router,
  Select,
  thunk
};
