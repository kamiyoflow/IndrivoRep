
export const getUser = async (name: string) => {
    try {
        const response = await fetch(`https://localhost:7156/api/users/${name}`, { method: "GET" });
        if (!response.ok) {
            throw new Error("something went wrong");
        }
        return await response.json();
    } catch (error) {
        return [];
    }
}

export const getAllUsers = async (name: string) => {
    try {
        const response = await fetch(`https://localhost:7156/api/users`, { method: "GET" });
        if (!response.ok) {
            throw new Error("something went wrong");
        }
        return await response.json();
    } catch (error) {
        return [];
    }
}
