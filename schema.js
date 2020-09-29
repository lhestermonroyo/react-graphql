require('dotenv').config();
const axios = require('axios');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');

const { LAUNCHES_ENDPOINT, ROCKETS_ENDPOINT } = process.env;

// Launch Type
const LaunchType = new GraphQLObjectType({
	name: 'Launch',
	fields: () => ({
		flight_number: { type: GraphQLInt },
		mission_name: { type: GraphQLString },
		launch_year: { type: GraphQLString },
		launch_date_local: { type: GraphQLString },
		launch_success: { type: GraphQLBoolean },
		rocket: { type: RocketType },
	})
});

// Rocket Type
const RocketType = new GraphQLObjectType({
	name: 'Rocket',
	fields: () => ({
		rocket_id: { type: GraphQLString },
		rocket_name: { type: GraphQLString },
		rocket_type: { type: GraphQLString },
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: () => ({
		launches: {
			type: new GraphQLList(LaunchType),
			resolve(parent, args) {
				return axios
					.get(LAUNCHES_ENDPOINT)
					.then(res => res.data);
			}
		},
		launch: {
			type: LaunchType,
			args: {
				flight_number: { type: GraphQLInt },
			},
			resolve(parents, args) {
				return axios
					.get(`${LAUNCHES_ENDPOINT}/${args.flight_number}`)
					.then(res => res.data);
			}
		},
		rockets: {
			type: new GraphQLList(RocketType),
			resolve(parent, args) {
				return axios
					.get(ROCKETS_ENDPOINT)
					.then(res => res.data);
			}
		},
		rocket: {
			type: RocketType,
			args: {
				id: { type: GraphQLInt },
			},
			resolve(parents, args) {
				return axios
					.get(`${ROCKETS_ENDPOINT}/${args.id}`)
					.then(res => res.data);
			}
		}
	})
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})