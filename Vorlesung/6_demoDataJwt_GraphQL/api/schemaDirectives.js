import apollo from 'apollo-server-express'

import graphql from "graphql";

const {defaultFieldResolver} = graphql;
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'

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

