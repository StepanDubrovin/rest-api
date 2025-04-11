export class ApiError extends Error {
    status: number;
    errors: string[];

    constructor(status: number, message: string, errors: string[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message: string, errors: string[] = []) {
        return new ApiError(400, message, errors)
    }

    static BadConnectToDB(errors: string[] = []) {
        return new ApiError(400, 'Ошибка связанная с базой данных', errors);
    }

    static NotFound(message: string, errors: string[] = []) {
        return new ApiError(404, message, errors);
    }
}