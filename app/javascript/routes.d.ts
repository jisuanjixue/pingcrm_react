/**
 * File generated by js-routes RubyVariables.GEM_VERSION
 * Based on Rails RubyVariables.RAILS_VERSION routes of RubyVariables.APP_CLASS
 */
declare type Optional<T> = {
    [P in keyof T]?: T[P] | null;
};
declare type BaseRouteParameter = string | boolean | Date | number;
declare type MethodRouteParameter = BaseRouteParameter | (() => BaseRouteParameter);
declare type ModelRouteParameter = {
    id: MethodRouteParameter;
} | {
    to_param: MethodRouteParameter;
} | {
    toParam: MethodRouteParameter;
};
declare type RequiredRouteParameter = BaseRouteParameter | ModelRouteParameter;
declare type OptionalRouteParameter = undefined | null | RequiredRouteParameter;
declare type QueryRouteParameter = OptionalRouteParameter | QueryRouteParameter[] | {
    [k: string]: QueryRouteParameter;
};
declare type RouteParameters = Record<string, QueryRouteParameter>;
declare type Serializable = Record<string, unknown>;
declare type Serializer = (value: Serializable) => string;
declare type RouteHelperExtras = {
    requiredParams(): string[];
    toString(): string;
};
declare type RequiredParameters<T extends number> = T extends 1 ? [RequiredRouteParameter] : T extends 2 ? [RequiredRouteParameter, RequiredRouteParameter] : T extends 3 ? [RequiredRouteParameter, RequiredRouteParameter, RequiredRouteParameter] : T extends 4 ? [
    RequiredRouteParameter,
    RequiredRouteParameter,
    RequiredRouteParameter,
    RequiredRouteParameter
] : RequiredRouteParameter[];
declare type RouteHelperOptions = RouteOptions & Record<string, OptionalRouteParameter>;
declare type RouteHelper<T extends number = number> = ((...args: [...RequiredParameters<T>, RouteHelperOptions]) => string) & RouteHelperExtras;
declare type RouteHelpers = Record<string, RouteHelper>;
declare type Configuration = {
    prefix: string;
    default_url_options: RouteParameters;
    special_options_key: string;
    serializer: Serializer;
};
interface RouterExposedMethods {
    config(): Configuration;
    configure(arg: Partial<Configuration>): Configuration;
    serialize: Serializer;
}
declare type KeywordUrlOptions = Optional<{
    host: string;
    protocol: string;
    subdomain: string;
    port: string | number;
    anchor: string;
    trailing_slash: boolean;
    params: RouteParameters;
}>;
declare type RouteOptions = KeywordUrlOptions & RouteParameters;
declare type PartsTable = Record<string, {
    r?: boolean;
    d?: OptionalRouteParameter;
}>;
declare type ModuleType = "CJS" | "AMD" | "UMD" | "ESM" | "DTS" | "NIL";
declare const RubyVariables: {
    PREFIX: string;
    DEPRECATED_GLOBBING_BEHAVIOR: boolean;
    DEPRECATED_FALSE_PARAMETER_BEHAVIOR: boolean;
    SPECIAL_OPTIONS_KEY: string;
    DEFAULT_URL_OPTIONS: RouteParameters;
    SERIALIZER: Serializer;
    ROUTES_OBJECT: RouteHelpers;
    MODULE_TYPE: ModuleType;
    WRAPPER: <T>(callback: T) => T;
};
declare const define: undefined | (((arg: unknown[], callback: () => unknown) => void) & {
    amd?: unknown;
});
declare const module: {
    exports: any;
} | undefined;
export const configure: RouterExposedMethods['configure'];

export const config: RouterExposedMethods['config'];

export const serialize: RouterExposedMethods['serialize'];

/**
 * Generates rails route to
 * /contacts/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const contact_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /contacts(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const contacts_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /logout(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const destroy_user_session_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /contacts/:id/edit(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const edit_contact_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /organizations/:id/edit(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const edit_organization_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/:id/edit(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const edit_user_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /contacts/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const new_contact_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /organizations/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const new_organization_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const new_user_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /login(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const new_user_session_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /organizations/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const organization_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /organizations(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const organizations_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/representations/redirect/:signed_blob_id/:variation_key/*filename(.:format)
 * @param {any} signed_blob_id
 * @param {any} variation_key
 * @param {any} filename
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_blob_representation_path: ((
  signed_blob_id: RequiredRouteParameter,
  variation_key: RequiredRouteParameter,
  filename: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/representations/proxy/:signed_blob_id/:variation_key/*filename(.:format)
 * @param {any} signed_blob_id
 * @param {any} variation_key
 * @param {any} filename
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_blob_representation_proxy_path: ((
  signed_blob_id: RequiredRouteParameter,
  variation_key: RequiredRouteParameter,
  filename: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/direct_uploads(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_direct_uploads_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/disk/:encoded_key/*filename(.:format)
 * @param {any} encoded_key
 * @param {any} filename
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_disk_service_path: ((
  encoded_key: RequiredRouteParameter,
  filename: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/info(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_info_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/info/properties(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_info_properties_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/info/routes(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_info_routes_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/mailers(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_mailers_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/blobs/redirect/:signed_id/*filename(.:format)
 * @param {any} signed_id
 * @param {any} filename
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_service_blob_path: ((
  signed_id: RequiredRouteParameter,
  filename: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/blobs/proxy/:signed_id/*filename(.:format)
 * @param {any} signed_id
 * @param {any} filename
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const rails_service_blob_proxy_path: ((
  signed_id: RequiredRouteParameter,
  filename: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /reports(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const reports_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /contacts/:id/restore(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const restore_contact_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /organizations/:id/restore(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const restore_organization_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/:id/restore(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const restore_user_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const root_path: ((
  options?: {} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/disk/:encoded_token(.:format)
 * @param {any} encoded_token
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const update_rails_disk_service_path: ((
  encoded_token: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const user_path: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /login(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const user_session_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const users_path: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

// By some reason this line prevents all types in a file
// from being automatically exported
export {};
