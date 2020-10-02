import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import classNames from 'classnames';
import Moment from 'react-moment';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_date_local
      launch_year
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
     } 
    }
  }
`;

const Launch = (props) => {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);


  return (
    <React.Fragment>
      <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
        {({ loading, error, data }) => {
          if (loading) return <h4 className="text-center mt-5">Loading...</h4>
          if (error) console.log(error);
          const { flight_number, mission_name, launch_date_local, launch_year, launch_success, rocket: { rocket_id, rocket_name, rocket_type } } = data.launch;

          return (
            <React.Fragment>
              <Link to="/" className="btn btn-primary mt-4"><i className="fa fa-arrow-left fa-fw" /> Back</Link>
              <h2 className="my-4">Mission: <span className={classNames({
                'text-success': launch_success,
                'text-danger': !launch_success,
              })
              }>{mission_name}</span></h2>
              <p><i className="fa fa-clock-o fa-fw" /> <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment></p>
              <hr />
              <h5>Launch Details</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  Flight Number: {flight_number}
                </li>
                <li className="list-group-item">
                  Launch Year: {launch_year}
                </li>
                <li className="list-group-item">
                  Launch Success: <span className={classNames({
                  'text-success': launch_success,
                  'text-danger': !launch_success,
                })}>{launch_success ? 'Yes' : 'No'}</span>
                </li>
              </ul>
              <h5 className="mt-4">Rocket Details</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  Rocket Id: {rocket_id}
                </li>
                <li className="list-group-item">
                  Rocket Name: {rocket_name}
                </li>
                <li className="list-group-item">
                  Rocket Type: {rocket_type}
                </li>
              </ul>
            </React.Fragment>
          )
        }}
      </Query>
    </React.Fragment>
  )
}

export default Launch;
