import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// This ({ alerts }) is the destructuring of props coming from the mapStateToProps
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

// Maps the reducer "Alert" from reducers/index.js
const mapStateToProps = state => ({
  alerts: state.alert
});

// Pass the state with mapStateToProps, and no acctions to call
export default connect(mapStateToProps)(Alert);
