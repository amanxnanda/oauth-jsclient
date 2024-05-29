import csrf from 'csrf';

declare class AuthResponse {
    constructor(params: AuthResponse.AuthResponseParams);
    processResponse(response: Object): void;
    getToken(): Token;
    text(): string;
    status(): number;
    headers(): Object;
    valid(): boolean;
    getJson(): Object;
    get_intuit_tid(): string;
    isContentType(): boolean;
    getContentType(): string;
    isJson(): boolean;

}

declare namespace AuthResponse {
    export interface AuthResponseParams {
        token?: Token;
        response?: Response;
        body?: string;
        json?: Object;
        intuit_tid?: string;
    }
}

declare class Token implements Token.TokenData {
    latency: number;
    realmId: string;
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    x_refresh_token_expires_in: number;
    id_token: string;
    createdAt: string;
    accessToken(): string;
    refreshToken(): string;
    tokenType(): string;
    getToken(): Token.TokenData;
    setToken(tokenData: Token.TokenData): Token;
    clearToken(): Token;
    isAccessTokenValid(): boolean;
    isRefreshTokenValid(): boolean;
}

declare namespace Token {
    export interface TokenData {
        realmId?: string;
        token_type?: string;
        access_token?: string;
        refresh_token?: string;
        expires_in: number;
        x_refresh_token_expires_in: number;
        id_token?: string;
        latency: number;
        createdAt: string;
    }
}

declare class OAuthClient {
    constructor(config: OAuthClient.OAuthClientConfig);
    authHeader(): string;
    authorizeUri(params: OAuthClient.AuthorizeParams): string;
    createError(e: Error, authResponse?: AuthResponse): OAuthClient.OAuthClientError;
    createToken(uri: string): Promise<AuthResponse>;
    getKeyFromJWKsURI(id_token: string, kid: string, request: Request): Promise<object | string>;
    getTokenRequest(request: Request): Promise<AuthResponse>;
    getUserInfo(params?: OAuthClient.GetUserInfoParams): Promise<AuthResponse>;
    isAccessTokenValid(): boolean;
    loadResponse(request: Request): Promise<Response>;
    loadResponseFromJWKsURI(request: Request): Promise<Response>;
    log(level: string, message: string, messageData: any): void;
    makeApiCall(params?: OAuthClient.MakeApiCallParams): Promise<AuthResponse>;
    refresh(): Promise<AuthResponse>;
    refreshUsingToken(refresh_token: string): Promise<AuthResponse>;
    revoke(params?: OAuthClient.RevokeParams): Promise<AuthResponse>;
    setToken(params: Token.TokenData): Token;
    validateIdToken(params?: OAuthClient.ValidateIdTokenParams): Promise<Response>;
    validateToken(): boolean;
}

declare namespace OAuthClient {
    export interface OAuthClientConfig {
        clientId: string;
        clientSecret: string;
        redirectUri?: string;
        environment?: string;
        token?: Token;
        logging: boolean;
    }

    export enum environment {
        sandbox = 'https://sandbox-quickbooks.api.intuit.com/',
        production = 'https://quickbooks.api.intuit.com/'
    }

    export enum scopes {
        Accounting = 'com.intuit.quickbooks.accounting',
        Payment = 'com.intuit.quickbooks.payment',
        Payroll = 'com.intuit.quickbooks.payroll',
        TimeTracking = 'com.intuit.quickbooks.payroll.timetracking',
        Benefits = 'com.intuit.quickbooks.payroll.benefits',
        Profile = 'profile',
        Email = 'email',
        Phone = 'phone',
        Address = 'address',
        OpenId = 'openid',
        Intuit_name = 'intuit_name'
    }

    export interface AuthorizeParams {
        scope: scopes | scopes[] | string;
        state?: csrf | string;
    }

    export interface RevokeParams {
        access_token?: string;
        refresh_token?: string;
    }

    export interface GetUserInfoParams { }

    export interface MakeApiCallParams {
        url: string;
        method?: string;
        body?: Object;
    }

    export interface ValidateIdTokenParams {
        id_token?: string;
    }

    export interface OAuthClientError extends Error {
        intuit_tid: string;
        authResponse: AuthResponse;
        originalMessage: string;
        error_description: string;
    }
}

export = OAuthClient;
