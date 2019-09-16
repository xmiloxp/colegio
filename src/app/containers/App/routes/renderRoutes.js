import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import cookie from 'react-cookies';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RouteWithProps = function RouteWithProps(_ref) {
  var path = _ref.path,
      exact = _ref.exact,
      strict = _ref.strict,
      _render = _ref.render,
      location = _ref.location,
      rest = _objectWithoutProperties(_ref, ["path", "exact", "strict", "render", "location"]);

  return <Route
    path = {path}
    exact = {exact}
    strict = {strict}
    location = {location}
    render = {(props) => {
      return _render(_objectSpread({}, props, rest));
    }}
    />
};

const renderRoutes = (routes, isAuthenticated = false, extraProps = {}, switchProps = {}) => routes ? (
<Switch {...switchProps}>
    {
      routes.map( (route, i) => {
        if(route.redirect){
            return <Redirect 
                    key={route.key || i}
                    from={route.path}
                    to={route.redirect}
                    exact={route.exact}
                    strict={route.strict}
                    />
        }
        const RouteRoute = RouteWithProps;
        return ( 
          <RouteRoute
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={ (props) => {
              const isPrivate = (isAuthenticated || route.private);
              const childRoutes= renderRoutes(route.routes, isPrivate, {}, { location: props.location });
              if(isPrivate){
                return cookie.load('token') ? (route.component ?
                      (<route.component {...props} {...extraProps} route={route}>
                        {childRoutes}
                          </route.component>) :
                          (childRoutes)    
                  ):(<Redirect                 
                    to="/user/login"
                    />);
              }

              if(route.component){
                return (
                  <route.component {...props} {...extraProps} route={route}>
                    {childRoutes}
                  </route.component>
                );
              }else{
                return childRoutes;
              }
            }}
          />
        );
    })}
</Switch>
) : null;

export default renderRoutes;