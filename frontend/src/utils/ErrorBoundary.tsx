import { Navigate, useRouteError } from "react-router";

type RouteError = {
    status?: number;
    message?: string;
    [key: string]: unknown;
};

export function ErrorBoundary() {
    const error = useRouteError() as RouteError;

    if (error.status === 401) {
        return <Navigate to="/Login" replace />;
    }

    return (
        <div>
            Erreur inconnue :{" "}
            {error.message
                ? error.message
                : String(error)}
        </div>
    );
}