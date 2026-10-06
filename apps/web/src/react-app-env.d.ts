/// <reference types="vite/client" />

interface YmFunction {
    (
        counterId: number,
        method: 'init',
        options?: YmInitOptions
    ): void;
    (
        counterId: number,
        method: 'hit',
        url: string,
        options?: YmHitOptions
    ): void;
    (
        counterId: number,
        method: 'reachGoal',
        goal: string,
        params?: Record<string, unknown>,
        callback?: () => void
    ): void;
    (
        counterId: number,
        method: 'params',
        params: Record<string, unknown>
    ): void;
    (
        counterId: number,
        method: string,
        ...args: unknown[]
    ): void;
}

interface YmInitOptions {
    clickmap?: boolean;
    trackLinks?: boolean;
    accurateTrackBounce?: boolean;
    webvisor?: boolean;
    trackHash?: boolean;
    defer?: boolean;
    ecommerce?: boolean | string;
    params?: Record<string, unknown>;
}

interface YmHitOptions {
    title?: string;
    referer?: string;
    params?: Record<string, unknown>;
    callback?: () => void;
}

declare global {
    interface Window {
        ym?: YmFunction;
    }
}

export { };