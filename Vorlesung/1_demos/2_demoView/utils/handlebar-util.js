//  {{#if_eq state "OK"}}
export const handlebarHelpers = {
    'if_eq': function (a, b, opts) {
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    }
}
