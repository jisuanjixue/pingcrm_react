export function configure(config: any): {
    prefix: string;
    default_url_options: {};
    special_options_key: string;
    serializer: any;
};
export function config(): {
    prefix: string;
    default_url_options: {};
    special_options_key: string;
    serializer: any;
};
export function serialize(object: any): any;
export function contact(...args: any[]): string;
export namespace contact {
    function requiredParams(): any[];
    function toString(): any;
}
export function contacts(...args: any[]): string;
export namespace contacts { }
export function destroy_user_session(...args: any[]): string;
export namespace destroy_user_session { }
export function edit_contact(...args: any[]): string;
export namespace edit_contact { }
export function edit_organization(...args: any[]): string;
export namespace edit_organization { }
export function edit_user(...args: any[]): string;
export namespace edit_user { }
export function new_contact(...args: any[]): string;
export namespace new_contact { }
export function new_user(...args: any[]): string;
export namespace new_user { }
export function new_user_session(...args: any[]): string;
export namespace new_user_session { }
export function organization(...args: any[]): string;
export namespace organization { }
export function organizations(...args: any[]): string;
export namespace organizations { }
export function reports(...args: any[]): string;
export namespace reports { }
export function restore_contact(...args: any[]): string;
export namespace restore_contact { }
export function restore_organization(...args: any[]): string;
export namespace restore_organization { }
export function restore_user(...args: any[]): string;
export namespace restore_user { }
export function root(...args: any[]): string;
export namespace root { }
export function user(...args: any[]): string;
export namespace user { }
export function user_session(...args: any[]): string;
export namespace user_session { }
export function users(...args: any[]): string;
export namespace users { }
