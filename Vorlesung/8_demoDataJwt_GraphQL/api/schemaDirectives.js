import apollo from 'apollo-server-express'

import graphql from "graphql";
const {defaultFieldResolver} = graphql;


const {ApolloServer, gql, SchemaDirectiveVisitor} = apollo;

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

                if (requiresAuth)
                {
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
