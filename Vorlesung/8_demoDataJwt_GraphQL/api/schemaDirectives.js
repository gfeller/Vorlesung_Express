import apollo from 'apollo-server-express'

import graphql from "graphql";

const {defaultFieldResolver} = graphql;
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'

/*

const {ApolloServer, gql, SchemaDirectiveVisitor} = apollo;
//import * as tools from "@graphql-tools/schema";
//const { SchemaDirectiveVisitor} = tools; // TODO migrate to 3.0

export class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(type) {
        this.ensureFieldsWrapped(type);
        type._requiresAuth = true;
        type._requiresAdmin = this.args.isAdmin;
    }

    // Visitor methods for nested types like fields and arguments
    // also receive a details object that provides information about
    // the parent and grandparent types.
    visitFieldDefinition(field, details) {
        this.ensureFieldsWrapped(details.objectType);
        field._requiresAuth = true;
        field._requiresAdmin = this.args.isAdmin;
    }

    ensureFieldsWrapped(objectType) {
        // Mark the GraphQLObjectType object to avoid re-wrapping:
        if (objectType._authFieldsWrapped) return;
        objectType._authFieldsWrapped = true;

        const fields = objectType.getFields();

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const {resolve = defaultFieldResolver} = field;
            field.resolve = async function (...args) {
                // Get the required Role from the field first, falling back
                // to the objectType if no Role is required by the field:

                const requiresAuth = field._requiresAuth || objectType._requiresAuth;
                const requiredAdmin = field._requiresAdmin || objectType._requiresAdmin;

                const user = args[2].user;

                if (requiresAuth) {
                    if (!user) {
                        throw new Error("not authorized");
                    }

                    if (requiredAdmin) {
                        if (!user.isAdmin) {
                            throw new Error("not authorized");
                        }
                    }
                }
                return resolve.apply(this, args);
            };
        });
    }
}

*/
function authDirective(directiveName, getUserFn) {
    const typeDirectiveArgumentMaps = {}
    return {
        authDirectiveTypeDefs: `directive @${directiveName}(requires: Role = ADMIN,
    ) on OBJECT | FIELD_DEFINITION

    enum Role {
      ADMIN
      REVIEWER
      USER
      UNKNOWN
    }`,
        authDirectiveTransformer: (schema) =>
            mapSchema(schema, {
                [MapperKind.TYPE]: type => {
                    const authDirective = getDirective(schema, type, directiveName)?.[0]
                    if (authDirective) {
                        typeDirectiveArgumentMaps[type.name] = authDirective
                    }
                    return undefined
                },
                [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
                    const authDirective =
                        getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName]
                    if (authDirective) {
                        const { requires } = authDirective
                        if (requires) {
                            const { resolve = defaultFieldResolver } = fieldConfig
                            fieldConfig.resolve = function (source, args, context, info) {
                                const user = getUserFn(context.user)
                                if (!user.hasRole(requires)) {
                                    throw new Error('not authorized')
                                }
                                return resolve(source, args, context, info)
                            }
                            return fieldConfig
                        }
                    }
                }
            })
    }
}

function getUser(user) {
    const token = !user ? 'UNKNOWN' : user.isAdmin ? 'ADMIN' : 'USER'

    const roles = ['UNKNOWN', 'USER', 'REVIEWER', 'ADMIN']
    return {
        hasRole: (role) => {
            const tokenIndex = roles.indexOf(token)
            const roleIndex = roles.indexOf(role)
            return roleIndex >= 0 && tokenIndex >= roleIndex
        }
    }
}

export const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective('auth', getUser)

