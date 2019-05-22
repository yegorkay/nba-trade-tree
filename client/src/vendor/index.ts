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
import { connect } from 'react-redux';
import thunk from 'redux-thunk';

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
  React,
  Select,
  thunk
};
