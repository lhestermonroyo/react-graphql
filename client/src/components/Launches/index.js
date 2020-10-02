import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from '../LaunchItem';
import Indicators from '../Indicators';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  return (
    <React.Fragment>
      <h2 className="my-4">Launches</h2>
      <Indicators />
      <Query query={LAUNCHES_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <h4 className="text-center mt-5">Loading...</h4>
            if (error) console.log(error);
            return <React.Fragment>
              {
                data.launches.map((launch) => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                ))
              }
            </React.Fragment>
          }
        }
      </Query>
    </React.Fragment>
  )
}

export default Launches;