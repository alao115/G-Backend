"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const graphQL_1 = require("../graphQL");
const services_1 = require("../services");
exports.default = ({ app }) => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: graphQL_1.typeDefs,
        resolvers: graphQL_1.resolvers,
        context: ({ req, res }) => ({ req, res, userService: services_1.userService, accountService: services_1.accountService, appartmentService: services_1.appartmentService, appartmentDetailService: services_1.appartmentDetailService, appartmentTypeService: services_1.appartmentTypeService, publicationService: services_1.publicationService, reservationService: services_1.reservationService, visitService: services_1.visitService }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageDisabled)()],
    });
    yield server.start();
    app.use('/graphql', services_1.JWTService.verifyAccessToken);
    server.applyMiddleware({ app });
    return Promise.resolve();
});
