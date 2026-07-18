import {BASE_URL} from "../utils/contstant"

export async function api<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            ...options,
        }
    );

    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error("Invalid server response");
    }

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Something went wrong"
        );
    }

    return data;
}