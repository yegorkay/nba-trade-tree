import * as React from 'react';
import { FunctionComponent, Component, useEffect } from 'react';
import * as _ from 'lodash';
import axios from 'axios';
import Select from 'react-select';
import produce from 'immer';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
  // TODO figure out dispatch types in actions
  // Dispatch
} from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as ReactDOM from 'react-dom';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps
} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import * as moment from 'moment';
import { BoxProps } from 'rebass';

export {
  _,
  applyMiddleware,
  axios,
  BoxProps,
  combineReducers,
  compose,
  Component,
  connect,
  createStore,
  // Dispatch,
  FunctionComponent,
  keyframes,
  LinkProps,
  moment,
  produce,
  Provider,
  React,
  ReactDOM,
  Route,
  RouteComponentProps,
  Router,
  RouterLink,
  Select,
  styled,
  thunk,
  useEffect
};
