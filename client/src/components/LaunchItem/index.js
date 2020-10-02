import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const LaunchItem = (props) => {
  const { launch } = props;
  const { mission_name, launch_date_local, launch_success, flight_number } = launch;
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>Mission: <span className={classNames({
            'text-success': launch_success,
            'text-danger': !launch_success,
          })
          }>{mission_name}</span></h4>
          <p><i className="fa fa-clock-o fa-fw" /> <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment></p>
        </div>
        <div className="col-md-3">
          <Link to={`/launch/${flight_number}`} className="btn btn-primary">Launch Details <i className="fa fa-chevron-right fa-fw" /></Link>
        </div>
      </div>
    </div>
  )
}

export default LaunchItem;